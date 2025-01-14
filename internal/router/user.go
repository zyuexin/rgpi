package router

import (
	"rgpiserver/internal/controllers"
	"rgpiserver/internal/repositories"
	"rgpiserver/internal/services"
	"rgpiserver/pkg/mysql"
	"rgpiserver/pkg/redis"

	"github.com/gin-gonic/gin"
)

func InitUserRoutes(r *gin.Engine) {
	userRepositoryImpl := repositories.NewUserRepository(mysql.DB, redis.RDB)
	userService := services.NewUserService(userRepositoryImpl)
	userController := controllers.NewUserController(userService)
	user := r.Group("/user")
	{
		user.GET("/info", userController.GetUserInfoHandler)
		user.GET("/captcha", userController.SendCaptchaHandler)
		user.POST("/register", userController.RegisterHandler)
		user.POST("/login", userController.LoginHandler)
		user.POST("/info", userController.UpdateHandler)
		// user.DELETE("/logout", userController.LogoutHandler)
	}
}
