package models

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
