package response

import (
	"rgpiserver/config"

	"github.com/spf13/viper"
)

const (
	FailCode = iota
	SuccessCode
	WarningCode

	FailTitleKey    = "fail"
	SuccessTitleKey = "success"
	WarningTitleKey = "warning"
)

var (
	DEFAULT_LANG = "en_US"
	UNKNOW       = "unknow"
	INFO         = "Info"
	ERROR_INTL   = "error_intl"
	SUCCESS_INTL = "success_intl"
)

// GetErrorMessage 根据错误代码和语言代码获取错误文本
func GetMessage(code, lang, tp string) string {
	if lang == "" {
		lang = DEFAULT_LANG
	}
	if intl, ok := viper.Get(tp).(config.Intl); ok {
		msg, ok := intl.Get(code, lang)
		if ok {
			return msg
		}
		if tp == SUCCESS_INTL {
			return code
		}
		return UNKNOW + ": " + code
	}
	return UNKNOW + ": " + code
}

func GetStatusText(code int, lang string) string {
	tp := ERROR_INTL
	key := FailTitleKey
	if code == SuccessCode {
		tp = SUCCESS_INTL
		key = SuccessTitleKey
	}
	if lang == "" {
		lang = DEFAULT_LANG
	}
	if intl, ok := viper.Get(tp).(config.Intl); ok {
		title, ok := intl.Get(key, lang)
		if ok {
			return title
		}
	}
	return INFO
}
