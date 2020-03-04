Rails.application.routes.draw do
  # Route to onepage app
  root 'homepage#index'

  # JSON only for single page app
  post 'user', to: 'user#create', constraints: lambda { |req| req.format == :json }

end
