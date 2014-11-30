namespace :db do
  desc "populate the database with some data"
  task sample: [:environment] do

    Faker::Number.digit.to_i.times do
      user = FactoryGirl.create :user
      Faker::Number.digit.to_i.times do
        run = FactoryGirl.create :run, user: user
        Faker::Number.number(2).to_i.times do
          # The Time.now - 1000 is where I want to use the poisson to put in the next hit time
          FactoryGirl.create(:hit, run: run, time: Time.now - 1000) 
        end
      end
    end
  end
end
