package repositories

import (
	"github.com/redis/go-redis/v9"
	"gorm.io/gorm"

	"rgpiserver/internal/models"
)

type MenusRepository interface {
	GetMenusByLevel(level int) (menus []models.Menu, err error)
	GetMenusByParentId(parentId string) (menus []models.Menu, err error)
	GetAllMenus() (menus []models.Menu, err error)
}

type MenusRepositoryImpl struct {
	DB  *gorm.DB
	RDB *redis.Client
}

func NewMenusRepository(db *gorm.DB, rdb *redis.Client) *MenusRepositoryImpl {
	return &MenusRepositoryImpl{
		DB:  db,
		RDB: rdb,
	}
}

func (r *MenusRepositoryImpl) GetMenusByLevel(level int) (menus []models.Menu, err error) {
	menus = []models.Menu{}
	r.DB.Where("level = ?", level).Find(&menus)
	return menus, err
}

func (r *MenusRepositoryImpl) GetMenusByParentId(parentId string) (menus []models.Menu, err error) {
	menus = []models.Menu{}
	r.DB.Where("parent_id = ?", parentId).Find(&menus)
	return menus, err
}

func (r *MenusRepositoryImpl) GetAllMenus() (menus []models.Menu, err error) {
	menus = []models.Menu{}
	r.DB.Find(&menus)
	return menus, err
}
