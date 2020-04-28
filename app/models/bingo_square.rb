class BingoSquare < ApplicationRecord
    def self.make_board
        board = []
        squares = BingoSquare.all.map{ |square| square.quote }
        i=0
       25.times do
            board[i] = squares.sample
            squares.delete(board[i])
            i += 1
        end
        board[12] = "Free Square"
        board
    end
end
