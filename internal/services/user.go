package services

import (
	"errors"
	"math"
	"time"

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

// 获取验证码过期时间（秒）
func (us *UserService) GetEmailCaptchaExpiration(c *gin.Context, email string) (int, error) {
	ttl, err := us.Repo.GetEmailCaptchaExpiration(c, email)
	return int(math.Ceil(ttl.Seconds())), err
}

// 发送验证码邮件
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

// 注册用户
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
	if us.Repo.IsRegister(c, params.Email) {
		return errors.New("email_is_registered")
	}

	user := &models.User{
		Email:     params.Email,
		Password:  params.Password,
		Nickname:  params.Nickname,
		LastLogin: 0,
		Avatar:    "",
		Theme:     "system",
		Lang:      "en_US",
		CreatedAt: time.Now().Unix(),
		UpdatedAt: time.Now().Unix(),
		DeletedAt: 0,
	}
	if err = us.Repo.Create(user); err != nil {
		return err
	}

	if _, err = us.Repo.ClearCaptcha(c, params.Email); err != nil {
		return err
	}
	return nil
}

func (us *UserService) Login() {

}

func (us *UserService) Update(username string, password string) {

}

func (us *UserService) Logout(username string, password string) {

}
