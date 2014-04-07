class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.string :pic_file_name
      t.string :pic_content_type
      t.integer :pic_file_size
      t.timestamps
    end
  end
end
