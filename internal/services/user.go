package services

import (
	"math"
	"rgpiserver/internal/repositories"
	"rgpiserver/pkg/utils"
	"time"

	"github.com/gin-gonic/gin"
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

func (us *UserService) SendCaptcha(c *gin.Context, email string) (time.Duration, error) {
	code := utils.GetVerificationCode_len6()

	err := utils.SendCaptchaMail(email, code)
	if err != nil {
		return 0, err
	}

	expiration, err := us.Repo.SaveCaptcha(c, email, code)
	if err != nil {
		return 0, err
	}

	return expiration, nil
}

func (us *UserService) Register(username string, password string) {

}

func (us *UserService) Login() {

}

func (us *UserService) Update(username string, password string) {

}

func (us *UserService) Logout(username string, password string) {

}
