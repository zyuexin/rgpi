package logger

import (
	"fmt"
	"os"
	"time"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"gopkg.in/natefinch/lumberjack.v2"
)

var Logger *zap.Logger

func InitZapLogger() {

	encoder := getEncoder()

	// First, define our level-handling logic.

	// level: debug,info,warning
	infoLevel := zap.LevelEnablerFunc(func(lvl zapcore.Level) bool {
		return lvl < zapcore.ErrorLevel
	})
	// level: error, dpanic, panic, fatal
	errorLevel := zap.LevelEnablerFunc(func(lvl zapcore.Level) bool {
		return lvl >= zapcore.ErrorLevel
	})

	infoLevel_writerSyncer := getWriterSyncer("info")
	errorLevel_writerSyncer := getWriterSyncer("error")

	info_multiWriteSyncer := zapcore.NewMultiWriteSyncer(infoLevel_writerSyncer, os.Stdout)
	error_multiWriteSyncer := zapcore.NewMultiWriteSyncer(errorLevel_writerSyncer, os.Stdout)

	core := zapcore.NewCore(encoder, info_multiWriteSyncer, infoLevel)
	errorCore := zapcore.NewCore(encoder, error_multiWriteSyncer, errorLevel)

	coreArr := []zapcore.Core{core, errorCore}

	// export
	zapLogger := zap.New(zapcore.NewTee(coreArr...), zap.AddCaller()) // zap.AddCaller() will add line number and file name
	Logger = zapLogger

}

func getEncoder() zapcore.Encoder {
	// 采用默认zap提供的日志打印设置
	encoderConfig := zap.NewProductionEncoderConfig()
	// 设置日志记录中时间的格式
	encoderConfig.EncodeTime = func(t time.Time, enc zapcore.PrimitiveArrayEncoder) {
		enc.AppendString(t.Format("2006-01-02 15:04:05"))
	}

	// 将日志等级标识设置为大写并且有颜色
	encoderConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder
	// 返回完整调用路径
	encoderConfig.EncodeCaller = zapcore.FullCallerEncoder
	// 生成打印到console的encoder
	return zapcore.NewConsoleEncoder(encoderConfig)
}

func getWriterSyncer(level string) zapcore.WriteSyncer {
	lumberWriteSyncer := &lumberjack.Logger{
		Filename: fmt.Sprintf("logs/%s.log", level),
		MaxSize:  10, // megabytes
		Compress: true,
	}
	// file, _ := os.Create("logs/app.log")
	return zapcore.Lock(zapcore.AddSync(lumberWriteSyncer))

}
