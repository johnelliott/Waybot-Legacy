require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Waybot
    class Application < Rails::Application
        # Settings in config/environments/* take precedence over those specified here.
        # Application configuration should go into files in config/initializers
        # -- all .rb files in that directory are automatically loaded.

        # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
        # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
        # config.time_zone = 'Central Time (US & Canada)'

        # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
        # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
        # config.i18n.default_locale = :de

        # config faye
        config.middleware.delete Rack::Lock
        config.middleware.use FayeRails::Middleware, mount: '/faye', :timeout => 45

        config.assets.paths << Rails.root.join('vendor', 'assets', 'bower_components')
        # config.assets.paths << Rails.root.join('vendor', 'assets', 'stylesheets')

        # skip fixtures
        config.generators do |g|
            g.test_framework :minitest, spec: true, fixture: false
        end

        # for heroku: https://devcenter.heroku.com/articles/rails-4-asset-pipeline
        # By default Rails 4 will not serve your assets. To enable this functionality you need to go into config/application.rb and add this line:
        # config.serve_static_assets = true
    end
end
