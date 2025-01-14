package router

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"

	zlog "rgpiserver/pkg/logger"
	mw "rgpiserver/pkg/middlewares"
)

var Router *gin.Engine

func Init() {
	Router = gin.New()

	Router.Use(mw.Logger(zlog.Logger), mw.ErrorHandle(), mw.CorsHandler(), mw.JwtHandler(), mw.StatesCahceHandler())

	InitUserRoutes(Router)
	InitMenuRoutes(Router)

	zlog.Logger.Info("Server started")
	fmt.Println("🌈🌈🌈 Server started")
	Router.Run(viper.GetString("server.port"))
}
