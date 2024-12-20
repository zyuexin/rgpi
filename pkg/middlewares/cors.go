package middlewares

import (
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
)

func CorsHandler() gin.HandlerFunc {
	corsConf := viper.Get("cors").(map[string]interface{})
	return cors.New(cors.Config{
		AllowOrigins:     assertedCorsConf(corsConf["alloworigins"]),
		AllowMethods:     assertedCorsConf(corsConf["allowmethods"]),
		AllowHeaders:     assertedCorsConf(corsConf["allowheaders"]),
		ExposeHeaders:    assertedCorsConf(corsConf["exposeheaders"]),
		AllowCredentials: corsConf["allowcredentials"].(bool),
	})
}

// 将[]interface{} 转换为 []string
func assertedCorsConf(conf interface{}) (res []string) {
	res = make([]string, 0)
	if confSlice, ok := conf.([]interface{}); ok {
		for _, v := range confSlice {
			// 使用类型断言将每个元素转换为 string
			if str, ok := v.(string); ok {
				// 如果断言成功，将字符串添加到 []string 切片中
				res = append(res, str)
			} else {
				// 如果断言失败，这里可以处理错误情况
				// 例如，打印错误信息或返回错误（在这个例子中，我们简单地忽略它）
				// 注意：在实际应用中，你应该根据需求来处理这种情况
				fmt.Println("Expected string, but got:", v)
			}
		}
	}
	return
}
