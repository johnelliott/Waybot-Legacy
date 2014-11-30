FactoryGirl.define do
  factory :hit do
    run
    time {Time.now} # override this in rake task
    speed {Faker::Number.number(2)}
  end
end