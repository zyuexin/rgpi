package models

// 用户请求验证码时返回的验证码信息
type ResponseParamsOfSendCaptcha struct {
	SendAt     int64 `json:"sendAt"`
	Expiration int   `json:"expiration"`
}

type RequestParamsOfRegister struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
	Captcha  string `json:"captcha" binding:"required"`
	Nickname string `json:"nickName" binding:"required"`
}

type User struct {
	Email     string `json:"email" gorm:"primary_key"`
	Nickname  string `json:"nickname"`
	Password  string `json:"password"`
	LastLogin int64  `json:"last_login"`
	Avatar    string `json:"avatar"`
	Theme     string `json:"theme"`
	Lang      string `json:"lang"`
	CreatedAt int64  `json:"created_at"`
	UpdatedAt int64  `json:"updated_at"`
	DeletedAt int64  `json:"deleted_at"`
}

type UserResponse struct {
	Data *User `json:"data"`
}

type UsersResponse struct {
	Data []*User `json:"data"`
}
