package router

import (
	"github.com/gin-gonic/gin"

	"rgpiserver/internal/controllers"
	"rgpiserver/internal/repositories"
	"rgpiserver/internal/services"
	"rgpiserver/pkg/mysql"
	"rgpiserver/pkg/redis"
)

func InitTodoRoutes(r *gin.Engine) {
	todosRepositoryImpl := repositories.NewTodosRepository(mysql.DB, redis.RDB)
	todosService := services.NewTodosService(todosRepositoryImpl)
	todoController := controllers.NewTodosController(todosService)
	r.Group("/todos")
	{
		r.POST("/group", todoController.CreateTodoGroup)
		r.GET("/group/:id", todoController.GetTodoGroup)
		r.DELETE("/group/:id", todoController.DeleteTodoGroup)
		r.PUT("/group/:id", todoController.UpdateTodoGroup)
	}
}
