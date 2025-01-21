package services

import (
	"sort"

	"github.com/gin-gonic/gin"

	"rgpiserver/internal/models"
	"rgpiserver/internal/repositories"
)

func NewMenusService(repo repositories.MenusRepository) *MenusService {
	return &MenusService{
		Repo: repo,
	}
}

type MenusService struct {
	Repo repositories.MenusRepository
}

func (ms *MenusService) GetMenusByLevel(level int) (menus []models.Menu, err error) {
	menus, err = ms.Repo.GetMenusByLevel(level)
	sort.Slice(menus, func(i, j int) bool {
		return menus[i].SortOrder < menus[j].SortOrder
	})
	return
}

func (ms *MenusService) GetMenusByParentId(parentId string) (menus []models.Menu, err error) {
	menus, err = ms.Repo.GetMenusByParentId(parentId)
	sort.Slice(menus, func(i, j int) bool {
		return menus[i].SortOrder < menus[j].SortOrder
	})
	return
}

func (ms *MenusService) GetTreeMenus(c *gin.Context) (menus []*models.Menu, err error) {
	allMenus, err := ms.Repo.GetAllMenus()
	if err != nil {
		return
	}
	return buildTreeMenu(allMenus)
}

func buildTreeMenu(menus []models.Menu) ([]*models.Menu, error) {
	menuMap := make(map[string]*models.Menu)
	var treeMenus []*models.Menu
	for _, menu := range menus {
		menuMap[menu.ID] = &menu
	}

	for _, parentMenu := range menus {
		if (parentMenu.Level == 0) && (parentMenu.ParentID == "") {
			treeMenus = append(treeMenus, menuMap[parentMenu.ID])
		}
		for _, childMenu := range menus {
			if parentMenu.ID == childMenu.ParentID {
				pMenu := menuMap[parentMenu.ID]
				pMenu.Children = append(pMenu.Children, menuMap[childMenu.ID])
			}
		}
	}
	return treeMenus, nil
}
