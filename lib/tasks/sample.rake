namespace :db do
  desc "populate the database with some data"
  task sample: [:environment] do

    Faker::Number.digit.to_i.times do
      user = FactoryGirl.create :user
      Faker::Number.digit.to_i.times do
        run = FactoryGirl.create :run, user: user
        Faker::Number.number(2).to_i.times do
          FactoryGirl.create :hit, run: run
        end
      end
    end
  end
end
