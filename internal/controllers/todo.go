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

func (mc *TodosController) CreateTodoGroup(c *gin.Context) {

}

func (mc *TodosController) GetTodoGroup(c *gin.Context) {
}

func (mc *TodosController) DeleteTodoGroup(c *gin.Context) {
}

func (mc *TodosController) UpdateTodoGroup(c *gin.Context) {
}
