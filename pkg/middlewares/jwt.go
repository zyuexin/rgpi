package middlewares

import (
	"errors"
	"fmt"
	"net/http"
	"strings"
	"time"

	"rgpiserver/pkg/utils"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/spf13/viper"
)

const (
	EMAIL         = "Email"
	AUTHORIZATION = "Authorization"
	BEARER        = "Bearer"
	PREFER_MENU   = "PreferMenus"
)

var (
	ErrTokenExpired     = errors.New("token is expired")        // 令牌过期
	ErrTokenNotValidYet = errors.New("token not active yet")    // 令牌未生效
	ErrTokenMalformed   = errors.New("that's not even a token") // 令牌不完整
	ErrTokenInvalid     = errors.New("token is invalid")        // 无效令牌
)

type CustomClaims struct {
	Email    string `json:"email"`
	Nickname string `json:"nickname"`
	jwt.RegisteredClaims
}

type Jwt struct {
	SignKey    []byte
	Expiration time.Duration
}

func NewDfalutClaims(email, nickname string, expiration time.Duration) CustomClaims {
	beforeTime := jwt.NewNumericDate(time.Now())
	expiresTime := jwt.NewNumericDate(beforeTime.Add(expiration))
	return CustomClaims{
		Email:    email,
		Nickname: nickname,
		RegisteredClaims: jwt.RegisteredClaims{
			NotBefore: beforeTime,
			ExpiresAt: expiresTime,
			IssuedAt:  beforeTime,
		},
	}
}

func NewJwt() *Jwt {
	secret := viper.GetString("jwt.secret")
	expiration := time.Duration(viper.GetInt64("jwt.expiration"))
	return &Jwt{
		SignKey:    []byte(secret),
		Expiration: expiration,
	}
}

// CreateToken 创建新的 Token
func (j *Jwt) CreateToken(claims CustomClaims) (token string, err error) {
	withClaims := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	token, err = withClaims.SignedString(j.SignKey)
	return fmt.Sprintf("%s %s", BEARER, token), err
}

// ParseToken 解析 Token
func (j *Jwt) ParseToken(token string) (*CustomClaims, error) {
	withClaims, err := jwt.ParseWithClaims(token, &CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(j.SignKey), nil
	})
	if !withClaims.Valid || err != nil {
		return nil, ErrTokenInvalid
	}
	claims, ok := withClaims.Claims.(*CustomClaims)

	if claims.ExpiresAt != nil && float64(claims.ExpiresAt.Unix()) < float64(time.Now().Unix()) {
		return nil, ErrTokenExpired
	}
	if !ok {
		return nil, err
	}
	return claims, err
}

func JwtHandler() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		jwtIgnores := viper.GetStringSlice("jwt.ignores")
		path := ctx.Request.URL.Path

		if utils.Contains(path, jwtIgnores) {
			ctx.Next()
			return
		}

		tokenStr, _ := ctx.Cookie(AUTHORIZATION)
		if tokenStr == "" {
			ctx.Abort()
			ctx.JSON(http.StatusUnauthorized, gin.H{"code": http.StatusUnauthorized, "message": "Not Authorized"})
			return
		}
		parts := strings.Split(tokenStr, " ")

		if len(parts) != 2 || parts[0] != BEARER {
			ctx.Abort()
			ctx.JSON(http.StatusUnauthorized, gin.H{"code": http.StatusUnauthorized, "message": "Not Authorized"})
			return
		}

		token := parts[1]
		j := NewJwt()
		claims, err := j.ParseToken(token)

		if err != nil || claims == nil {
			ctx.Abort()
			ctx.JSON(http.StatusUnauthorized, gin.H{"code": http.StatusUnauthorized, "message": "Not Authorized"})
			return
		}

		// 将 claims 存储在 gin.Context 中，以便后续使用
		ctx.Set("claims", claims)

		ctx.Next()
	}
}
