package cmd

import (
	"rgpiserver/internal/router"
	zlog "rgpiserver/pkg/logger"
	"rgpiserver/pkg/mysql"
	"rgpiserver/pkg/redis"

	"github.com/spf13/cobra"
)

var (
	serverCmd = &cobra.Command{
		Use:   "start",
		Short: "Start REST API Server",
		Run:   initServer,
	}
)

func initServer(cmd *cobra.Command, args []string) {
	zlog.InitZapLogger()
	mysql.Connect()
	redis.Connect()
	router.Init()
}
