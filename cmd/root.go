package cmd

import (
	"os"

	"rgpiserver/config"

	"github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
)

var (
	Version = "1.0.0"
	rootCmd = &cobra.Command{
		Use:     "startrgpi",
		Short:   "startrgpi is a tool to start rgpi",
		Version: Version,
		Run:     rootCmdRun,
	}
)

func rootCmdRun(cmd *cobra.Command, args []string) {
	httpCmd.Run(cmd, args)
}

// execute root command
func Execute() {
	if err := rootCmd.Execute(); err != nil {
		logrus.Error(err)
		os.Exit(1)
	}
}

func init() {
	cobra.OnInitialize(config.InitConfig)
	// rootCmd.AddCommand(httpCmd)
}
