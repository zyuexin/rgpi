package repositories

import (
	"github.com/redis/go-redis/v9"
	"gorm.io/gorm"
)

type TodosRepository interface {
}

type TodosRepositoryImpl struct {
	DB  *gorm.DB
	RDB *redis.Client
}

func NewTodosRepository(db *gorm.DB, rdb *redis.Client) *TodosRepositoryImpl {
	return &TodosRepositoryImpl{
		DB:  db,
		RDB: rdb,
	}
}
