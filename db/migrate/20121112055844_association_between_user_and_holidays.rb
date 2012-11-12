class AssociationBetweenUserAndHolidays < ActiveRecord::Migration
  def up
    change_table :holidays do |t|
      t.references :user
    end
  end

  def down
    change_table :holidays do |t|
      t.remove_references :user
    end
  end
end
