package models

type Menu struct {
	ID          string `gorm:"primarykey" json:"id"`
	Name        string `gorm:"size:255;not null" json:"name"`
	ParentID    string `gorm:"size:255" json:"parentId"`         // 父菜单ID，顶级菜单为0`
	Path        string `gorm:"size:255;uniqueIndex" json:"path"` // 菜单路径或URL
	Level       int    `gorm:"default:0" json:"level"`           // 菜单层级
	Icon        string `gorm:"size:255" json:"icon"`             // 菜单图标
	SortOrder   int    `gorm:"default:0" json:"sortOrder"`       // 菜单排序(同级菜单排序顺序，数值越小越靠前，默认为0)
	Description string `gorm:"size:500" json:"description"`      // 菜单描述
}

type TreeMenu struct {
	Menu
	Children []*TreeMenu `json:"children"`
}
