FactoryGirl.define do
  factory :hit do
    run
    time {Faker::Number.number(7)}
    speed {Faker::Number.number(2)}
  end

  # Required things
  #   run_id      integer
  #   time        datetime
  #   speed       float
end
