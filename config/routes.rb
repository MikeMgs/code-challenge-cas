Rails.application.routes.draw do
  resources :categories, only: [:index]
  resources :videos, only: [:create, :index]
end
