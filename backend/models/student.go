package models

import (
	"time"
)

type Student struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Name      string    `json:"name" gorm:"not null;size:100"`
	Subject   string    `json:"subject" gorm:"not null;size:100"`
	Mark      float64   `json:"mark" gorm:"not null"`
	CreatedAt time.Time `json:"created_at" gorm:"autoCreateTime"`
}

func (Student) TableName() string {
	return "student"
}
