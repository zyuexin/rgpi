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

type RequestParamsOfLogin struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type User struct {
	Email      string      `json:"email" gorm:"primary_key;type:varchar(255)"`
	Nickname   string      `json:"nickname"`
	Password   string      `json:"password"`
	Avatar     string      `json:"avatar"`
	Theme      string      `json:"theme"`
	Lang       string      `json:"lang"`
	CreatedAt  int64       `json:"created_at"`
	UpdatedAt  int64       `json:"updated_at"`
	DeletedAt  int64       `json:"deleted_at"`
	TodoGroups []TodoGroup `json:"todo_groups" gorm:"foreignKey:UserEmail"`
	Todos      []Todo      `json:"todos" gorm:"foreignKey:UserEmail"`
}

type UserStatesCache struct {
	Email      string `json:"email" gorm:"primary_key"`
	PreferMenu string `json:"preferMenu"`
}

type UserResponse struct {
	Data *User `json:"data"`
}

type UsersResponse struct {
	Data []*User `json:"data"`
}
