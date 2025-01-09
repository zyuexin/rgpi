package router

import (
	"github.com/gin-gonic/gin"

	"rgpiserver/internal/controllers"
	"rgpiserver/internal/repositories"
	"rgpiserver/internal/services"
	"rgpiserver/pkg/mysql"
	"rgpiserver/pkg/redis"
)

func InitMenuRoutes(r *gin.Engine) {
	menusRepositoryImpl := repositories.NewMenusRepository(mysql.DB, redis.RDB)
	menusService := services.NewMenusService(menusRepositoryImpl)
	menuController := controllers.NewMenusController(menusService)
	r.GET("/menus", menuController.GetMenus)
	r.GET("/treemenus", menuController.GetTreeMenus)
}
