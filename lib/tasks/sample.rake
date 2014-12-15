namespace :db do
  desc "populate the database with some data"
  task sample: [:environment] do

    Faker::Number.digit.to_i.times do
      user = FactoryGirl.create :user
      Faker::Number.digit.to_i.times do
        run = FactoryGirl.create :run, user: user
        next_hit_time = run.created_at
        Faker::Number.number(2).to_i.times do
          # This will run 99 times
          FactoryGirl.create(:hit, run: run, time: next_hit_time)
          next_hit_time += rand(600)
        end
      end
    end
  end
end
