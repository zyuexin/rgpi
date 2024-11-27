package config

import (
	"fmt"

	"github.com/spf13/viper"
)

var (
	configType = "yaml"
	configFile = "config/config.yaml"
)

type (
	Config struct {
		Debug          bool     `mapstructure:"debug"`
		ContextTimeout int      `mapstructure:"contextTimeout"`
		Server         Server   `mapstructure:"server"`
		Database       Database `mapstructure:"database"`
		Nsq            Nsq      `mapstructure:"nsq"`
	}

	Server struct {
		Port string `mapstructure:"port"`
	}

	Database struct {
		Driver   string `mapstructure:"driver"`
		Host     string `mapstructure:"host"`
		Port     int    `mapstructure:"port"`
		Username string `mapstructure:"username"`
		Password string `mapstructure:"password"`
		Name     string `mapstructure:"name"`
	}

	Nsq struct {
		Host string `mapstructure:"host"`
		Port int    `mapstructure:"port"`
	}
)

func NewConfig() Config {
	conf := &Config{}
	if err := viper.Unmarshal(conf); err != nil {
		fmt.Printf("unable to decode into config struct, %v", err)
	}
	return *conf
}

func InitConfig() {
	viper.SetConfigType(configType)
	viper.SetConfigFile(configFile)

	if err := viper.ReadInConfig(); err != nil {
		fmt.Println(err.Error())
	}
}
