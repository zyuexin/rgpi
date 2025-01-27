package utils

import (
	"crypto/tls"
	"fmt"
	"math/rand"
	"regexp"
	"strconv"

	"github.com/spf13/viper"

	zlog "rgpiserver/pkg/logger"

	gomail "gopkg.in/gomail.v2"
)

// Contains checks if a string is in a slice of strings
func Contains(str string, slice []string) bool {
	for _, s := range slice {
		if str == s {
			return true
		}
	}
	return false
}

// GetVerificationCode 获取验证码
func GetVerificationCode_len6() string {
	return strconv.Itoa(rand.Intn(900000) + 100000)
}

// SendCaptchaMail 发送验证码
func SendCaptchaMail(to string, captcha string) error {

	subject := "Rgpi注册验证码"

	smtpHost := viper.GetString("email.smtp")
	smtpPort := viper.GetInt("email.port")
	from := viper.GetString("email.from")
	paasword := viper.GetString("email.password")

	m := gomail.NewMessage()
	m.SetHeader("From", from)
	m.SetHeader("To", to)
	m.SetHeader("Subject", subject)
	m.SetBody("text/html", fmt.Sprintf("验证码： %s，（3分钟有效时间）", captcha))

	d := gomail.NewDialer(smtpHost, smtpPort, from, paasword)
	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	if err := d.DialAndSend(m); err != nil {
		zlog.Logger.Error(err.Error())
		return err
	}
	zlog.Logger.Info("验证码已发送!!")
	return nil
}

// IsValidEmail 判断是否是邮箱格式
func IsValidEmail(email string) bool {
	var emailRegex = `^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`
	re := regexp.MustCompile(emailRegex)
	return re.MatchString(email)
}
