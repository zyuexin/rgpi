package config

import (
	"fmt"

	"github.com/spf13/viper"
)

var (
	configType = "yaml"
	configFile = "config/config.yaml"

	errorIntlConfigType = "yaml"
	errorIntlConfigFile = "config/error_intl.yaml"

	successIntlConfigType = "yaml"
	successIntlConfigFile = "config/success_intl.yaml"
)

type Intl map[string]map[string]string

func (i Intl) Get(key, lang string) (s string, ok bool) {
	s, ok = i[key][lang]
	return
}

func InitConfig() {
	viper.SetConfigType(configType)
	viper.SetConfigFile(configFile)

	if err := viper.ReadInConfig(); err != nil {
		fmt.Printf("读取系统配置文件失败：%s\n", err.Error())
		return
	}
	errorIntl, err := initIntlConfig(errorIntlConfigType, errorIntlConfigFile)
	if err != nil {
		fmt.Printf("读取失败提示国际化配置文件失败：%s\n", err.Error())
		return
	}

	viper.Set("error_intl", errorIntl)

	successIntl, err := initIntlConfig(successIntlConfigType, successIntlConfigFile)
	if err != nil {
		fmt.Printf("读取成功提示国际化配置文件失败：%s\n", err.Error())
		return
	}
	viper.Set("success_intl", successIntl)
}

func initIntlConfig(configType, configFile string) (Intl, error) {
	intlViper := viper.New()
	intlViper.SetConfigType(configType)
	intlViper.SetConfigFile(configFile)
	if err := intlViper.ReadInConfig(); err != nil {
		return nil, err
	}
	allKeys := intlViper.AllKeys()
	intlMap := make(Intl, len(allKeys))

	for _, key := range allKeys {
		if m, ok := intlViper.Get(key).(map[string]string); ok {
			intlMap[key] = m
		}
	}
	return intlMap, nil
}
