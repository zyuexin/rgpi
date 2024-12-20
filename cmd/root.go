package cmd

import (
	"fmt"
	"os"

	"rgpiserver/config"

	"github.com/spf13/cobra"
)

var (
	Version = "1.0.0"
	rootCmd = &cobra.Command{
		Use:     "rgpi",
		Short:   "startrgpi is a tool to start rgpi",
		Version: Version,
		Run: func(cmd *cobra.Command, args []string) {
			fmt.Printf("%s\n", "Welcome to Rgpi.")
		},
	}
)

// execute root command
func Execute() {
	if err := rootCmd.Execute(); err != nil {
		os.Exit(1)
	}
}

func init() {
	cobra.OnInitialize(config.InitConfig)
	rootCmd.AddCommand(serverCmd)
}
