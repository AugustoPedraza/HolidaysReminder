class AssociationBetweenUserAndClients < ActiveRecord::Migration
  def up
    change_table :clients do |t|
      t.references :user
    end
  end

  def down
    change_table :clients do |t|
      t.remove_references :user
    end
  end
end
