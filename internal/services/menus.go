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

func (ms *MenusService) GetTreeMenus(c *gin.Context) (menus []*models.TreeMenu, err error) {
	allMenus, err := ms.Repo.GetAllMenus()
	if err != nil {
		return
	}
	return buildTreeMenu(allMenus)
}

func buildTreeMenu(menus []models.Menu) ([]*models.TreeMenu, error) {
	// 创建一个映射，用于快速查找菜单项
	menuMap := make(map[string]*models.Menu)
	for _, menu := range menus {
		menuMap[menu.ID] = &menu
	}

	// 创建一个列表，用于存储最终的树状菜单
	var treeMenus []*models.TreeMenu

	// 遍历菜单映射，构建树状结构
	for _, menu := range menuMap {
		if menu.ParentID == "0" { // 顶级菜单
			treeMenu := &models.TreeMenu{Menu: *menu, Children: nil}
			treeMenus = append(treeMenus, treeMenu)
			addChildMenus(menuMap, treeMenu)
		}
	}
	return treeMenus, nil
}

// addChildMenus 递归地为菜单项添加子菜单
func addChildMenus(menuMap map[string]*models.Menu, treeMenu *models.TreeMenu) {
	for _, menu := range menuMap {
		if menu.ParentID == treeMenu.ID {
			childTreeMenu := &models.TreeMenu{Menu: *menu, Children: nil}
			treeMenu.Children = append(treeMenu.Children, childTreeMenu)
			addChildMenus(menuMap, childTreeMenu)
		}
	}
}
