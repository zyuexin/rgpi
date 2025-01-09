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

// @Summary 用户注册
// @Description 用户注册
// @Tags User
// @Accept  json
// @Produce  json
// @Param   user body models.RequestParamsOfRegister true "Create user"
// @Success 200 {object} response.Response
// @Router /user/register [post]
func (uc *UserController) RegisterHandler(c *gin.Context) {
	var params models.RequestParamsOfRegister
	if err := c.ShouldBindJSON(&params); err != nil {
		response.Error(c, http.StatusBadRequest, response.FailCode, "invalid_params")
		return
	}
	if err := uc.Svr.Register(c, params); err != nil {
		response.Error(c, http.StatusBadRequest, response.FailCode, "register_fail")
	} else {
		response.Success(c, response.SuccessCode, nil, "register_success")
	}
}

// @Summary 用户登录
// @Description 用户登录
// @Tags User
// @Accept  json
// @Produce  json
// @Param   user body models.RequestParamsOfLogin true "Create user"
// @Success 200 {object} response.Response
// @Router /user/login [post]
func (uc *UserController) LoginHandler(c *gin.Context) {
	var params models.RequestParamsOfLogin
	if err := c.ShouldBindJSON(&params); err != nil {
		response.Error(c, http.StatusBadRequest, response.FailCode, "invalid_params")
		return
	}
	var user *models.User
	user, err := uc.Svr.Login(c, params)
	if err != nil {
		response.Error(c, http.StatusBadRequest, response.FailCode, err.Error())
	} else {
		response.Success(c, response.SuccessCode, user, "login_success")
	}
}

func (uc *UserController) UpdateHandler(c *gin.Context) {
	var (
		user models.User
		err  error
	)
	if err = c.ShouldBindJSON(&user); err != nil {
		response.Error(c, http.StatusBadRequest, response.FailCode, "invalid_params")
		return
	}
	_, err = uc.Svr.Update(c, &user)
	if err != nil {
		response.Error(c, http.StatusBadRequest, response.FailCode, "update_fail")
	} else {
		response.Success(c, response.SuccessCode, user, "update_success")
	}
}

func (uc *UserController) GetUserInfoHandler(c *gin.Context) {
	email := c.Query("email")
	user, err := uc.Svr.GetUserInfoByEmail(c, email)
	if err != nil {
		response.Error(c, http.StatusBadRequest, response.FailCode, "get_user_info_fail")
	} else {
		response.Success(c, response.SuccessCode, user, "get_user_info_success")
	}
}

func (uc *UserController) LogoutHandler(c *gin.Context) {

}
