package router

import (
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"

	zlog "rgpiserver/pkg/logger"
	mw "rgpiserver/pkg/middlewares"
)

var Router *gin.Engine

func Init() {
	Router = gin.New()

	Router.Use(mw.Logger(zlog.Logger), mw.ErrorHandle(), mw.CorsHandler(), mw.JwtHandler())

	InitUserRoutes(Router)

	Router.Run(viper.GetString("server.port"))
}
