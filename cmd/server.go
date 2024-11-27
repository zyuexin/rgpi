package cmd

import (
	"github.com/spf13/cobra"
)

var (
	httpCmd = &cobra.Command{
		Use:   "http",
		Short: "start HTTP REST API server",
		Run:   initHTTP,
	}
)

func initHTTP(cmd *cobra.Command, args []string) {

}
