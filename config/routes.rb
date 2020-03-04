Rails.application.routes.draw do
  # Route to onepage app
  root 'homepage#index'

  # JSON only for single page app
  post 'user', to: 'user#create', constraints: lambda { |req| req.format == :json }
  post 'session', to: 'session#create', constraints: lambda { |req| req.format == :json }
  delete 'session', to: 'session#destroy', constraints: lambda { |req| req.format == :json }

end
