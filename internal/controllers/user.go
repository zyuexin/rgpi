package controllers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	"rgpiserver/internal/models"
	"rgpiserver/internal/services"
	"rgpiserver/pkg/response"
)

type UserController struct {
	Svr *services.UserService
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
func (uc *UserController) SendCaptchaHandler(c *gin.Context) {
	email := c.Query("email")
	// 验证邮箱是否为空
	if email == "" {
		response.Error(c, http.StatusBadRequest, response.FailCode, "email_is_required")
		return
	}
	// 发送验证码
	expiration, err := uc.Svr.SendCaptcha(c, email)
	if err != nil {
		response.Error(c, http.StatusBadRequest, response.FailCode, err.Error())
		return
	}
	response.Success(c, response.SuccessCode, models.ResponseParamsOfSendCaptcha{
		SendAt:     time.Now().Unix(),
		Expiration: expiration,
	}, "send_captcha_success")
}

func (uc *UserController) RegisterHandler(c *gin.Context) {
	var params models.RequestParamsOfRegister
	if err := c.ShouldBindJSON(&params); err != nil {
		response.Error(c, http.StatusBadRequest, response.FailCode, "invalid_params")
		return
	}
	if err := uc.Svr.Register(c, params); err != nil {
		response.Error(c, http.StatusBadRequest, response.FailCode, err.Error())
	} else {
		response.Success(c, response.SuccessCode, nil, "注册成功")
	}
}

func (uc *UserController) LoginHandler(c *gin.Context) {

}

func (uc *UserController) UpdateHandler(c *gin.Context) {
}

func (uc *UserController) LogoutHandler(c *gin.Context) {

}
