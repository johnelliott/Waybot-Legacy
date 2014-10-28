class Hit < ActiveRecord::Base
  belongs_to :run
  def self.store_hits(hit_minutes)
    now = Time.now
    hit_minutes.each { |i|
      Hit.create(time: i)
    }
  end
end
