package models

type TodoGroup struct {
	RgpiBaseModel
	UserEmail   string `json:"email" gorm:"type:varchar(255)"`
	Title       string `json:"title" gorm:"type:varchar(255)"`
	Description string `json:"description"`
	Todos       []Todo `json:"todos" gorm:"foreignkey:GroupID"`
}

type Todo struct {
	RgpiBaseModel
	UserEmail   string `json:"email" gorm:"type:varchar(255)"`
	GroupID     uint   `json:"group_id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Status      int    `json:"status"`
	Priority    int    `json:"priority"`
}

type TodoStatusCate struct {
	RgpiIDModelWithName
	Todos       []Todo `json:"todos" gorm:"foreignkey:Status"`
	Description string `json:"description" gorm:"type:varchar(255)"`
}

type TodoPriorityCate struct {
	RgpiIDModelWithName
	Todos       []Todo `json:"todos" gorm:"foreignkey:Priority"`
	Description string `json:"description" gorm:"type:varchar(255)"`
}
