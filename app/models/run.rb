class Run < ActiveRecord::Base
  belongs_to :user
  has_many :hits, dependent: :destroy
end
