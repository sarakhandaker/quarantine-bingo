class CreateBingoSquares < ActiveRecord::Migration[6.0]
  def change
    create_table :bingo_squares do |t|
      t.string :quote

      t.timestamps
    end
  end
end
