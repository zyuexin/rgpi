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
	FindByEmail(ctx *gin.Context, email string) (bool, *models.User)
	ClearCaptcha(ctx *gin.Context, email string) (string, error)
	Create(user *models.User) error
	CreateStatesCache(user *models.User) error
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
func (repo *UserRepositoryImpl) FindByEmail(c *gin.Context, email string) (bool, *models.User) {
	var user models.User
	result := repo.DB.First(&user, "email = ?", email)
	isRegistered := result.Error != gorm.ErrRecordNotFound
	if !isRegistered {
		// 获取所有已经存在的Cookie的名字
		for _, cookie := range c.Request.Cookies() {
			// 创建一个新的Cookie，并将过期时间设置为一个过去的日期
			cookie.Expires = time.Unix(0, 0)
			cookie.MaxAge = -1
			cookie.Path = "/" // 设置Path以确保能匹配到原来的Cookie

			// 设置Cookie到响应中，实际上是将这个Cookie删除
			c.SetCookie(cookie.Name, cookie.Value, cookie.MaxAge, cookie.Path, cookie.Domain, false, false)
		}
	}
	return isRegistered, &user
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
	user.UpdatedAt = time.Now().Unix()
	tx := repo.DB.Save(user)
	// tx := repo.DB.Model(user).Where("email = ?", user.Email).Update("updated_at", time.Now().Unix())
	if tx.Error != nil {
		return tx.Error
	}
	if tx.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return nil
}

func (repo *UserRepositoryImpl) CreateStatesCache(user *models.User) error {
	userStatesCache := models.UserStatesCache{
		Email:      user.Email,
		PreferMenu: "[]",
	}
	// 检查是否存在该邮箱的记录
	var existingUser models.UserStatesCache
	result := repo.DB.Where("email = ?", user.Email).First(&existingUser)
	if result.Error == nil {
		return nil
	} else if result = repo.DB.Create(&userStatesCache); result.Error != nil {
		return result.Error
	}
	return nil
}

func (repo *UserRepositoryImpl) Logout() error {
	return nil
}
