package config

import (
	"fmt"

	"github.com/spf13/viper"
)

var (
	configType = "yaml"
	configFile = "config/config.yaml"
)

func InitConfig() {
	viper.SetConfigType(configType)
	viper.SetConfigFile(configFile)

	if err := viper.ReadInConfig(); err != nil {
		fmt.Println(err.Error())
	}
}
