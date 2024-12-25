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
	ID        int    `json:"id" gorm:"primary_key"`
	Username  string `json:"username"`
	Password  string `json:"password"`
	Phone     string `json:"phone"`
	Email     string `json:"email"`
	LastLogin string `json:"last_login"`
	Avatar    string `json:"avatar"`
	Theme     string `json:"theme"`
	Lang      string `json:"lang"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
	DeletedAt string `json:"deleted_at"`
}

type UserResponse struct {
	Data *User `json:"data"`
}

type UsersResponse struct {
	Data []*User `json:"data"`
}
