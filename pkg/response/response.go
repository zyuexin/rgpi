package response

import (
	"encoding/json"
	"fmt"

	"github.com/gin-gonic/gin"
)

const (
	FailCode = iota
	SuccessCode
	WarningCode
)

var (
	codeStatusTextMap = map[int]string{
		FailCode:    "Fail",
		SuccessCode: "Success",
		WarningCode: "Warning",
	}
)

type Response struct {
	HttpCode int         `json:"-"`              // HTTP状态码
	Code     int         `json:"code"`           // 状态码，非http状态码
	Status   string      `json:"status"`         // 状态，状态码对应的文本，用于前台的消息框的标题
	Message  string      `json:"message"`        // 消息，前台展示的提示信息
	Data     interface{} `json:"data,omitempty"` // 数据，omitempty表示如果为空则不序列化
}

// SuccessResponse 成功响应（http状态码为200时使用）
func Success(c *gin.Context, code int, data interface{}, message string) {
	if message == "" {
		message = "success"
	}
	res := Response{
		HttpCode: 200,
		Code:     code,
		Message:  message,
		Status:   codeStatusTextMap[code],
		Data:     data,
	}
	c.JSON(200, res)
}

// ErrorResponse 错误响应 （http状态码不是200时使用）
func Error(c *gin.Context, httpCode, code int, message any) {
	switch message.(type) {
	case int:
		message = fmt.Sprintf("%d", message)
	case float64:
	case float32:
		message = fmt.Sprintf("%f", message)
	}
	res := Response{
		HttpCode: httpCode,
		Code:     code,
		Status:   codeStatusTextMap[code],
		Message:  message.(string),
	}
	c.JSON(code, res)
}

// MarshalJSON 自定义JSON序列化，可以根据需要修改
func (r Response) MarshalJSON() ([]byte, error) {
	type Alias Response
	return json.Marshal(&struct {
		*Alias
	}{
		Alias: (*Alias)(&r),
	})
}
