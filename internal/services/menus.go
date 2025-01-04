package services

import (
	"rgpiserver/internal/models"
	"rgpiserver/internal/repositories"

	"github.com/gin-gonic/gin"
)

func NewMenusService(repo repositories.MenusRepository) *MenusService {
	return &MenusService{
		Repo: repo,
	}
}

type MenusService struct {
	Repo repositories.MenusRepository
}

func (ms *MenusService) GetMenusByLevel(c *gin.Context, level int) ([]models.Menu, error) {
	return ms.Repo.GetMenusByLevel(c, level)
}

func (ms *MenusService) GetMenusByParentId(c *gin.Context, parentId string) ([]models.Menu, error) {
	return []models.Menu{}, nil
}
