package middlewares

import (
	"github.com/gin-gonic/gin"

	"rgpiserver/internal/models"
	"rgpiserver/pkg/mysql"
)

func StatesCahceHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		email, _ := c.Cookie("Email")
		if email != "" {
			// 从cookie中获取PreferMenu字段的值
			preferMenu, _ := c.Cookie("PreferMenus")
			// 从数据库中查询出当前用户的偏好菜单信息
			states := models.UserStatesCache{}
			mysql.DB.Where("email = ?", email).Find(&states)
			// 1.如果当前请求是用户信息页面或者登录页面的请求，则将偏好菜单信息写入cookie中
			if c.Request.URL.Path == "/user/info" || c.Request.URL.Path == "/user/login" {
				maxAge := 999999999999999999
				c.SetCookie(PREFER_MENU, states.PreferMenu, maxAge, "/", "", false, false)
			} else if preferMenu != "" && preferMenu != "[]" {
				// 2.传过来的preferMenu不为空，并且不为[]时，更新数据库中的偏好菜单信息
				if states.PreferMenu != preferMenu {
					states.PreferMenu = preferMenu
					mysql.DB.Save(&states)
				}
			}
		}
		c.Next()
	}
}
