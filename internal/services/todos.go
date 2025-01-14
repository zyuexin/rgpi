package services

import (
	"rgpiserver/internal/repositories"
)

func NewTodosService(repo repositories.TodosRepository) *TodosService {
	return &TodosService{
		Repo: repo,
	}
}

type TodosService struct {
	Repo repositories.TodosRepository
}
