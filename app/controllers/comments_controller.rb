class CommentsController < ApplicationController
    def index
        comments=Comment.all
        render json: comments
    end
    def new
    end
    def create
        comment=Comment.create(comment_params)
       
        render json: comment
    end
    def comment_params
        params.require('comment').permit(:text, :likes)
    end
end
