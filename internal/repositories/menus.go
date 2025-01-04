package repositories

import (
	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
	"gorm.io/gorm"

	"rgpiserver/internal/models"
)

type MenusRepository interface {
	GetMenusByLevel(c *gin.Context, level int) (menus []models.Menu, err error)
	GetMenusByParentId(c *gin.Context, parentId string) (menus []models.Menu, err error)
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

func (r *MenusRepositoryImpl) GetMenusByLevel(c *gin.Context, level int) (menus []models.Menu, err error) {
	menus = []models.Menu{}
	r.DB.Where("level = ?", level).Find(&menus)
	return menus, err
}

func (r *MenusRepositoryImpl) GetMenusByParentId(c *gin.Context, parentId string) (menus []models.Menu, err error) {
	menus = []models.Menu{}
	r.DB.Where("parent_id = ?", parentId).Find(&menus)
	return menus, err
}
