class BingoSquaresController < ApplicationController
    def index
        squares=BingoSquare.make_board
        render json: squares
    end
end
