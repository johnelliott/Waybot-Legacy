namespace :db do
  desc "populate the database with some data"
  task sample: [:environment] do

    # User.create(email: Faker::Internet.email)
    # create user

    # Create fake runs`
    # Run(id: integer, user_id: integer, name: string, note: text, start_time: datetime, end_time: datetime, completed: boolean, created_at: datetime, updated_at: datetime)

    7.times do
      Run.create(user_id: 1, name: Faker::Address.street_address, note: "Data captured from #{Faker::Address.street_address}, #{Faker::Address.zip}", start_time: Faker::Time.between(2.days.ago, 1.days.ago, :morning), end_time: Faker::Time.between(0.days.ago, Time.now, :afternoon), completed: true)
    end
  end
end
