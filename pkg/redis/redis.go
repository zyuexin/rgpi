package redis

import (
	"fmt"

	zlog "rgpiserver/pkg/logger"

	"github.com/redis/go-redis/v9"
	"github.com/spf13/viper"
)

var RDB *redis.Client

func Connect() {
	if RDB != nil {
		return
	}
	host := viper.GetString("redis.host")
	port := viper.GetInt("redis.port")
	addr := fmt.Sprintf("%s:%d", host, port)

	userName := viper.GetString("redis.username")
	password := viper.GetString("redis.password")

	db := viper.Get("redis.db").(int)
	rdb := redis.NewClient(&redis.Options{
		Addr:     addr,
		Username: userName,
		Password: password,
		DB:       db,
	})
	zlog.Logger.Info(`🍟: Successfully connected to Redis at ` + addr)
	RDB = rdb
}
