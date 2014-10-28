factory :hit do
  run # runs run factory
  run_id 
  time Faker::Number.number(7)
  speed Faker::Number.number(2)
end

# Required things
#   run_id      integer
#   time        datetime
#   speed       float
