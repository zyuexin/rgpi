package middlewares

import (
	"net/http"
	zlog "rgpiserver/pkg/logger"
	"runtime/debug"

	"github.com/gin-gonic/gin"
)

func ErrorHandle() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				// log error
				zlog.Logger.Error(err.(string))
				// print stack trace
				debug.PrintStack()
				// return 500 error to client
				c.JSON(http.StatusInternalServerError, gin.H{
					"code":    http.StatusInternalServerError,
					"message": "Internal Server Error",
				})
			}
		}()
		c.Next()
	}
}
