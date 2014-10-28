class Hit < ActiveRecord::Base
  belongs_to :run
  def self.store_hits(hit_minutes)
    hit_minutes.each { |i|
      Hit.create(time: i)
    }
  end
end
