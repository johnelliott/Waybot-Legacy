# require 'faker'
namespace :db do
  desc "populate the database with some data"
  task :sample
  # User.create(email: Faker::Internet.email)
  # create user

  # Run(id: integer, user_id: integer, name: string, note: text, start_time: datetime, end_time: datetime, completed: boolean, created_at: datetime, updated_at: datetime)
  Run.create(user_id: 1, name: Faker::Address.street_address, note: "Data captured from #{Faker::Address.street_address}, #{Faker::Address.zip}", start_time: Faker::Time.backward(1, :morning), end_time: Faker::Time.backward(1, :evening), completed: true)

end