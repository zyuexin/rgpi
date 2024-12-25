package response

import (
	"rgpiserver/config"

	"github.com/spf13/viper"
)

var (
	DEFAULT_LANG = "en_US"
	UNKNOW       = "unknow error"
	ERROR_INTL   = "error_intl"
	SUCCESS_INTL = "success_intl"
)

// GetErrorMessage 根据错误代码和语言代码获取错误文本
func GetMessage(code, lang, tp string) string {
	if lang == "" {
		lang = DEFAULT_LANG
	}
	if ErrorMessages, ok := viper.Get(tp).(config.Intl); ok {
		msg, ok := ErrorMessages.Get(code, lang)
		if ok {
			return msg
		}
		return UNKNOW + ": " + code
	}
	return UNKNOW
}
