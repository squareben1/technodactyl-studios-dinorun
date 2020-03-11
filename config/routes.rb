Rails.application.routes.draw do
  # Route to onepage app
  root 'homepage#index'

  # Error pages
  get '404', to: 'error#show', via: :all
  get '422', to: 'error#show', via: :all
  get '500', to: 'error#show', via: :all

  # JSON only for single page app
  post 'user', to: 'user#create', constraints: lambda { |req| req.format == :json }

  get 'session', to: 'session#index', constraints: lambda { |req| req.format == :json }
  post 'session', to: 'session#create', constraints: lambda { |req| req.format == :json }
  delete 'session', to: 'session#destroy', constraints: lambda { |req| req.format == :json }

  get 'songs', to: 'songs#index', constraints: lambda { |req| req.format == :json }
  get 'songs/:id', to: 'songs#show', constraints: lambda { |req| req.format == :json }
  post 'songs', to: 'songs#create'

  post 'scores', to: 'scores#create', constraints: lambda { |req| req.format == :json }
  get 'scores/:id', to: 'scores#show', constraints: lambda { |req| req.format == :json }
  
  # Testing/Development
  if Rails.env.development? || Rails.env.test?
    get 'jasmine', to: 'jasmine#index'
  end
end
