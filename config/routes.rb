Rails.application.routes.draw do
  resources :songs
  # Route to onepage app
  root 'homepage#index'
end
