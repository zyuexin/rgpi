package middlewares

import (
	"net/http"
	"runtime/debug"

	"github.com/gin-gonic/gin"

	zlog "rgpiserver/pkg/logger"
	"rgpiserver/pkg/response"
)

func ErrorHandle() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			c.Next()
			if err := recover(); err != nil {
				// log error
				zlog.Logger.Error(err.(string))
				// print stack trace
				debug.PrintStack()
				// return 500 error to client
				response.Success(c, http.StatusInternalServerError, nil, "server_error")
			}
		}()
	}
}
