class Api::CommentsController < ApplicationController
  before_action :authenticate_admin!, except: [:see_comments]
  # before_action :set_test_admin
  before_action :set_comment, only: [:update, :destroy, :show]
  

  def index
    # binding.pry
    submission = Submission.find(params[:submission_id]).id
    render json: current_admin.comments.where(submission_id:submission)
  end

  def see_comments
    # binding.pry
    # @submission = Submission.find(39)
    submission = Submission.find(params[:submission_id])
    render json: Comment.comments_by_submission(submission.id)
  end

  def show
    render json: @comment
  end

  def create 
   comment = current_admin.comments.new(comment_params)
    if comment.save
      render json: comment
    else
      render json: {errors: comment.errors}, status: 422
    end
  end

  def update
    @comment.update(comment_params)
    render json: @comment
  end

  def destroy
    @comment.destroy
    render json: @comment
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :submission_id)
  end

  def set_comment
    @comment = current_admin.comments.find(params[:id])
  end

  # def set_test_admin 
  #   current_admin = Admin.first
  # end
  
end
