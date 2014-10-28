FactoryGirl.define do
  # add traits: demo, minimum valid object
  factory :run do
    user
    name {Faker::Address.street_address}
    note {Faker::Lorem.sentence}
    start_time {Faker::Time.between(2.days.ago, 1.days.ago, :morning)}
    end_time {Faker::Time.between(0.days.ago, Time.now, :afternoon)}
    completed true
  end
end
