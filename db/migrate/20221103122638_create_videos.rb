class CreateVideos < ActiveRecord::Migration[7.0]
  def change
    create_table :videos do |t|
      t.references :category, unique: true, null: false
      t.string :name

      t.timestamps
    end
  end
end
