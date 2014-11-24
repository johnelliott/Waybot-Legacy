class Run < ActiveRecord::Base
  include ActionView::Helpers::DateHelper
  belongs_to :user
  has_many :hits, dependent: :destroy
  def elapsed_time
    thestart = self.start_time
    theend = self.end_time
    distance_of_time_in_words(thestart, theend)
  end
  def speeds_count_chart
    self.hits.group(:speed).count
  end
end
