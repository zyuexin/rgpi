package mysql

import (
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/spf13/viper"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"rgpiserver/internal/models"
	zlog "rgpiserver/pkg/logger"
)

var DB *gorm.DB

func Connect() {
	if DB != nil {
		return
	}
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

	migrateErr := db.AutoMigrate(&models.User{}, &models.Menu{})

	if migrateErr != nil {
		panic(migrateErr)
	}
	err = initMenuTableData(db)
	if err != nil {
		log.Fatal(err)
	}
	DB = db
	zlog.Logger.Info(`🍟🍟🍟: Successfully connected to Mysql at ` + args)
}

func initMenuTableData(db *gorm.DB) (e error) {
	files, err := os.ReadDir("automigrate")
	if err != nil {
		return err
	}
	for _, file := range files {
		data, err := os.ReadFile(fmt.Sprintf("automigrate/%s", file.Name()))
		if err != nil {
			zlog.Logger.Error(err.Error())
		}
		sqlString := string(data)
		if sqlString == "" {
			zlog.Logger.Error(fmt.Sprintf("automigrate/%s is empty", file.Name()))
			continue
		}
		sqlArr := strings.Split(sqlString, ";")

		for _, sql := range sqlArr {
			sql = strings.TrimSpace(sql)
			if sql == "" {
				continue
			}
			err := db.Exec(sql).Error
			if err != nil {
				zlog.Logger.Error(err.Error())
			} else {
				zlog.Logger.Info(fmt.Sprintf("execute success/%s: %s", file.Name(), sql))
			}
		}
	}
	return e
}
