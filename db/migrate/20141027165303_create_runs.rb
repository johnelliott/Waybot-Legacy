class CreateRuns < ActiveRecord::Migration
  def change
    create_table :runs do |t|
      t.belongs_to :user, index: true
      t.string :name
      t.text :note
      t.datetime :start_time
      t.datetime :end_time
      t.boolean :completed

      t.timestamps
    end
  end
end
