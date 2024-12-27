package mysql

import (
	"fmt"

	"github.com/spf13/viper"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"rgpiserver/internal/models"
	zlog "rgpiserver/pkg/logger"
)

var DB *gorm.DB

func Connect() {
	host := viper.GetString("database.host")
	port := viper.GetString("database.port")
	username := viper.GetString("database.username")
	password := viper.GetString("database.password")
	charset := viper.GetString("database.charset")
	base := viper.GetString("database.base")

	args := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=%s&parseTime=true",
		username,
		password,
		host,
		port,
		base,
		charset)
	db, err := gorm.Open(mysql.Dialector{Config: &mysql.Config{DSN: args}}, &gorm.Config{})
	if err != nil {
		zlog.Logger.Error(`😫: Connected failed, check your Mysql with ` + args)
	}

	migrateErr := db.AutoMigrate(&models.User{})

	if migrateErr != nil {
		panic(migrateErr)
	}
	DB = db
	zlog.Logger.Info(`🍟: Successfully connected to Mysql at ` + args)
}
