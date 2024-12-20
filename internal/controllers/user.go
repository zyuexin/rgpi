package controllers

import (
	"net/http"
	"rgpiserver/internal/services"
	"time"

	"rgpiserver/pkg/response"

	"github.com/gin-gonic/gin"
)

const (
	SendCaptchaSuccessMessage   = "Send captcha success!"
	EmailParamIsRequiredMessage = "Email param is required!"
)

type UserController struct {
	Svr *services.UserService
}

// 用户请求验证码时返回的验证码信息
type UserCaptchaResponse struct {
	SendAt     int64         `json:"sendAt"`
	Expiration time.Duration `json:"expiration"`
}

func NewUserController(userService *services.UserService) *UserController {
	return &UserController{
		Svr: userService,
	}
}

// @Summary 发送验证码
// @Description 发送验证码到指定邮箱
// @Tags User
// @Accept  string
// @Produce  json
// @Param   user body models.User true "Create user"
// @Success 200 {object} response.Response
// @Router /user/captcha [get]
func (uc *UserController) SendCaptcha(c *gin.Context) {
	email := c.Query("email")
	// 验证邮箱是否为空
	if email == "" {
		response.Error(c, http.StatusBadRequest, http.StatusBadRequest, EmailParamIsRequiredMessage)
		return
	}
	// 验证是否发送过验证码
	ttl, err := uc.Svr.GetEmailCaptchaExpiration(c, email)
	if err != nil {
		response.Error(c, http.StatusBadRequest, http.StatusBadRequest, err.Error())
		return
	}
	// 判断发送过的验证码是否在有效期内
	if ttl > 0 {
		response.Error(c, http.StatusBadRequest, http.StatusBadRequest, ttl)
		return
	}
	// 发送验证码
	expiration, err := uc.Svr.SendCaptcha(c, email)
	if err != nil {
		response.Error(c, http.StatusBadRequest, http.StatusBadRequest, err.Error())
		return
	}
	response.Success(c, response.SuccessCode, UserCaptchaResponse{
		SendAt:     time.Now().Unix(),
		Expiration: expiration,
	}, SendCaptchaSuccessMessage)
}

func (uc *UserController) RegisterHandler(c *gin.Context) {

}

func (uc *UserController) LoginHandler(c *gin.Context) {

}

func (uc *UserController) UpdateHandler(c *gin.Context) {
}

func (uc *UserController) LogoutHandler(c *gin.Context) {

}
