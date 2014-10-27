class CreateHits < ActiveRecord::Migration
  def change
    create_table :hits do |t|
      t.belongs_to :run, index: true
      t.datetime :time
      t.float :speed

      t.timestamps
    end
  end
end
