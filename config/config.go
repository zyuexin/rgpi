package config

import (
	"fmt"
	"github.com/spf13/viper"
	"strings"
)

var (
	configType = "yaml"
	configFile = "config/config.yaml"

	errorIntlConfigType = "yaml"
	errorIntlConfigFile = "config/error_intl.yaml"

	successIntlConfigType = "yaml"
	successIntlConfigFile = "config/success_intl.yaml"
)

type Intl map[string]map[string]any

func (i Intl) Get(key, lang string) (s string, ok bool) {
	key = strings.ToLower(key)
	lang = strings.ToLower(lang)
	s, ok = i[key][lang].(string)
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
	allSettings := intlViper.AllSettings()
	intlMap := make(Intl, len(allSettings))

	for key, val := range allSettings {
		v, ok := val.(map[string]interface{})
		if ok {
			intlMap[key] = v
		}
	}
	return intlMap, nil
}
