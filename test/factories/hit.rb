FactoryGirl.define do
  factory :hit do
    run
    time {Time.now} // override this
    speed {Faker::Number.number(2)}
  end
end