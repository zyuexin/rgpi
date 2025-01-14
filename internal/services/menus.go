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
	menuMap := make(map[string]*models.Menu)
	for _, menu := range menus {
		menuMap[menu.ID] = &menu
	}

	var treeMenus []*models.TreeMenu

	for _, menu := range menuMap {
		if menu.Level == 0 { // 顶级菜单
			treeMenu := &models.TreeMenu{Menu: *menu, Children: nil}
			treeMenus = append(treeMenus, treeMenu)
			sort.Slice(treeMenus, func(i, j int) bool {
				return treeMenus[i].SortOrder < treeMenus[j].SortOrder
			})
			addChildMenus(menuMap, treeMenu)
		}
	}
	return treeMenus, nil
}

// addChildMenus 递归地为菜单项添加子菜单，并在添加前按SortOrder排序
func addChildMenus(menuMap map[string]*models.Menu, treeMenu *models.TreeMenu) {
	var sortedMenus []*models.Menu
	for _, menu := range menuMap {
		if menu.ParentID == treeMenu.ID {
			sortedMenus = append(sortedMenus, menu)
		}
	}
	sort.Slice(sortedMenus, func(i, j int) bool {
		return sortedMenus[i].SortOrder < sortedMenus[j].SortOrder
	})

	for _, menu := range sortedMenus {
		childTreeMenu := &models.TreeMenu{Menu: *menu, Children: nil}
		treeMenu.Children = append(treeMenu.Children, childTreeMenu)
		addChildMenus(menuMap, childTreeMenu)
	}
}
