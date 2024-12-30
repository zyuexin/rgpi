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
	IsRegister(ctx *gin.Context, email string) (bool, *models.User)
	ClearCaptcha(ctx *gin.Context, email string) (string, error)
	Create(user *models.User) error
	Update(user *models.User) error
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

// 获取验证码过期时间
func (repo *UserRepositoryImpl) GetEmailCaptchaExpiration(ctx *gin.Context, email string) (time.Duration, error) {
	// 获取键的过期时间（TTL）
	ttl, err := repo.RDB.TTL(ctx, email).Result()
	if err != nil {
		panic(err)
	}
	return ttl, nil
}

// 保存验证码到Redis，并设置过期时间
func (repo *UserRepositoryImpl) SaveCaptcha(ctx *gin.Context, email, captcha string) (time.Duration, error) {
	expiration, ok := viper.Get("captcha.expiration").(time.Duration)
	if !ok {
		expiration = 180
	}
	return expiration, repo.RDB.Set(ctx, email, captcha, expiration*time.Second).Err()
}

func (repo *UserRepositoryImpl) ClearCaptcha(ctx *gin.Context, email string) (string, error) {
	_, err := repo.RDB.Del(ctx, email).Result()
	return email, err
}

// 检查邮箱是否已经注册
func (repo *UserRepositoryImpl) IsRegister(ctx *gin.Context, email string) (bool, *models.User) {
	var user *models.User
	result := repo.DB.First(user, "email = ?", email)
	return result.Error != gorm.ErrRecordNotFound, user
}

func (repo *UserRepositoryImpl) Create(user *models.User) error {
	result := repo.DB.Create(user)
	// 检查是否创建成功
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (repo *UserRepositoryImpl) Update(user *models.User) error {
	tx := repo.DB.Model(user).Where("email = ?", user.Email).Update("updated_at", time.Now().Unix())
	if tx.Error != nil {
		return tx.Error
	}
	if tx.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
}

func (repo *UserRepositoryImpl) Logout() error {
	return nil
}
