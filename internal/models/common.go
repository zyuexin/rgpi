package models

type RgpiIDModel struct {
	ID uint `json:"id" gorm:"primary_key;AUTO_INCREMENT"`
}

type RgpiTimeModel struct {
	CreatedAt int64 `json:"created_at"`
	UpdatedAt int64 `json:"updated_at"`
	DeletedAt int64 `json:"deleted_at"`
}

type RgpiBaseModel struct {
	RgpiIDModel
	RgpiTimeModel
}

type RgpiIDModelWithName struct {
	RgpiIDModel
	Name string `json:"name" gorm:"type:varchar(255)"`
}
