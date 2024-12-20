package repositories

import (
	"rgpiserver/internal/models"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
	"github.com/spf13/viper"
	"gorm.io/gorm"
)

type UserRepository interface {
	GetEmailCaptchaExpiration(ctx *gin.Context, email string) (time.Duration, error)
	SaveCaptcha(ctx *gin.Context, email, captcha string) (time.Duration, error)
	Create(user *models.User) error
	Login() error
	Update() error
	Logout() error
}

type UserRepositoryImpl struct {
	DB  *gorm.DB
	RDB *redis.Client
}

func NewUserRepository(db *gorm.DB, rdb *redis.Client) *UserRepositoryImpl {
	return &UserRepositoryImpl{
		DB:  db,
		RDB: rdb,
	}
}

func (repo *UserRepositoryImpl) GetEmailCaptchaExpiration(ctx *gin.Context, email string) (time.Duration, error) {
	// 获取键的过期时间（TTL）
	ttl, err := repo.RDB.TTL(ctx, email).Result()
	if err != nil {
		panic(err)
	}
	return ttl, nil
}

func (repo *UserRepositoryImpl) SaveCaptcha(ctx *gin.Context, email, captcha string) (time.Duration, error) {
	expiration, ok := viper.Get("captcha.expiration").(time.Duration)
	if !ok {
		expiration = 180
	}
	return expiration, repo.RDB.Set(ctx, email, captcha, expiration*time.Second).Err()
}

func (repo *UserRepositoryImpl) Create(user *models.User) error {
	return nil
}

func (repo *UserRepositoryImpl) Login() error {
	return nil
}

func (repo *UserRepositoryImpl) Update() error {
	return nil
}

func (repo *UserRepositoryImpl) Logout() error {
	return nil
}
