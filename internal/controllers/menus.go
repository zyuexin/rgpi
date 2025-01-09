package controllers

import (
	"strconv"

	"github.com/gin-gonic/gin"

	"rgpiserver/internal/models"
	"rgpiserver/internal/services"
	"rgpiserver/pkg/response"
)

func NewMenusController(menusService *services.MenusService) *MenusController {
	return &MenusController{
		Svr: menusService,
	}
}

type MenusController struct {
	Svr *services.MenusService
}

func (mc *MenusController) GetMenus(c *gin.Context) {
	levelStr := c.Query("level")
	parentId := c.Query("parentId")
	var menus []models.Menu
	var err error
	if levelStr != "" {
		level, er := strconv.Atoi(levelStr)
		if er == nil {
			menus, err = mc.Svr.GetMenusByLevel(level)
		}
	} else if parentId != "" {
		menus, err = mc.Svr.GetMenusByParentId(parentId)
	}
	if err != nil {
		response.Error(c, response.FailCode, response.FailCode, "menu_query_failed")
		return
	}
	response.Success(c, response.SuccessCode, menus, "menu_query_success")
}

func (mc *MenusController) GetTreeMenus(c *gin.Context) {
	menu, err := mc.Svr.GetTreeMenus(c)
	if err != nil {
		response.Error(c, response.FailCode, response.FailCode, "menu_query_failed")
		return
	}
	response.Success(c, response.SuccessCode, menu, "menu_query_success")
}
