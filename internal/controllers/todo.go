package controllers

import (
	"github.com/gin-gonic/gin"

	"rgpiserver/internal/services"
)

func NewTodosController(todoService *services.TodosService) *TodosController {
	return &TodosController{
		Svr: todoService,
	}
}

type TodosController struct {
	Svr *services.TodosService
}

func (mc *TodosController) GetAllTodos(c *gin.Context) {
}

func (mc *TodosController) GetTodoById(c *gin.Context) {
}
