class Run < ActiveRecord::Base
  include ActionView::Helpers::DateHelper
  belongs_to :user
  has_many :hits, dependent: :destroy
  def elapsed_time
    thestart = self.start_time
    theend = self.end_time
    distance_of_time_in_words(thestart, theend)
  end
  def test_chart
    self.hits.group_by_hour(:time, format: "%l %P").count
  end
  def faker_test_chart
    {Faker::Name.name => Faker::Number.number(2), Faker::Name.name => Faker::Number.number(2)}
  end
end
