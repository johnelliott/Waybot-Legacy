FactoryGirl.define do
  # add traits: demo, minimum valid object
  factory :run do
    user_id 1
    name Faker::Lorem.words(2)
    note Faker::Lorem.sentence
    start_time Faker::Time.between(2.days.ago, 1.days.ago, :morning)
    end_time Faker::Time.between(0.days.ago, Time.now, :afternoon)
    completed true
  end
end

# Run model looks like this:
# id: integer
# user_id: integer
# name: string
# note: text
# start_time: datetime
# end_time: datetime
# completed: boolean
# created_at: datetime
# updated_at: datetime

# sample rake looks like this
# Run.create(user_id: 1, name: Faker::Address.street_address, note: "Data captured from #{Faker::Address.street_address}, #{Faker::Address.zip}", start_time: Faker::Time.between(2.days.ago, 1.days.ago, :morning), end_time: Faker::Time.between(0.days.ago, Time.now, :afternoon), completed: true)
