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
	r.GET("/todos", todoController.GetAllTodos)
	// r.GET("/todos/:id", todoController.GetTodoById)
	// r.POST("/todos", todoController.CreateTodo)
	// r.PUT("/todos/:id", todoController.UpdateTodo)
	// r.DELETE("/todos/:id", todoController.DeleteTodo)
}
