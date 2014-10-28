require 'test_helper'

describe Hit do
  describe ".store_hits" do
    it "should store nothing" do
      Hit.store_hits([]).must_equal []
    end
  end
end
