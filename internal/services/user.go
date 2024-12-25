package services

import (
	"errors"
	"math"

	"github.com/gin-gonic/gin"

	"rgpiserver/internal/models"
	"rgpiserver/internal/repositories"
	"rgpiserver/pkg/utils"
)

type UserService struct {
	Repo repositories.UserRepository
}

func NewUserService(repo repositories.UserRepository) *UserService {
	return &UserService{
		Repo: repo,
	}
}

func (us *UserService) GetEmailCaptchaExpiration(c *gin.Context, email string) (int, error) {
	ttl, err := us.Repo.GetEmailCaptchaExpiration(c, email)
	return int(math.Ceil(ttl.Seconds())), err
}

func (us *UserService) SendCaptcha(c *gin.Context, email string) (int, error) {

	if !utils.IsValidEmail(email) {
		return 0, errors.New("email_invalid")
	}
	// 验证是否发送过验证码
	ttl, err := us.GetEmailCaptchaExpiration(c, email)
	if err != nil {
		return 0, err
	}
	// 判断发送过的验证码是否在有效期内
	if ttl > 0 {
		return ttl, errors.New("captcha_has_been_sent")
	}

	code := utils.GetVerificationCode_len6()

	err = utils.SendCaptchaMail(email, code)
	if err != nil {
		return 0, err
	}

	expiration, err := us.Repo.SaveCaptcha(c, email, code)
	if err != nil {
		return 0, err
	}

	return int(expiration), nil
}

func (us *UserService) Register(c *gin.Context, params models.RequestParamsOfRegister) error {
	if !utils.IsValidEmail(params.Email) {
		return errors.New("email_invalid")
	}
	// 验证是否发送过验证码
	ttl, err := us.GetEmailCaptchaExpiration(c, params.Email)
	if err != nil {
		return err
	}
	if ttl < 1 {
		return errors.New("captcha_is_expired")
	}
	return nil
}

func (us *UserService) Login() {

}

func (us *UserService) Update(username string, password string) {

}

func (us *UserService) Logout(username string, password string) {

}
