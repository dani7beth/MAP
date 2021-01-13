class Api::SubmissionsController < ApplicationController
  before_action :set_admin, only: [:create, :update, :destroy, :show, :index]
  before_action :set_exercise, only: [:update, :destroy, :show]

  def index
    render json: @admin.exercises.all
  end

  # def all_exercises
  #   @admin
  #   render json: Exercise.all
  # end

  def show
    render json: @exercise
  end

  def create 
   exercise = @admin.exercises.new(exercise_params)
    if exercise.save
      render json: exercise
    else
      render json: {errors: exercise.errors}, status: 422
    end
  end

  def update
    @exercise.update(exercise_params)
    render json: @exercise
  end

  def destroy
    @exercise.destroy
    render json: @exercise
  end

  private
  def exercise_params
    params.require(:exercise).permit(:name, :image, :how_to_video, :category, :activity)
  end
  def set_exercise
    @exercise = @admin.exercises.find(params[:id])
  end
  def set_admin
    # @admin = Admin.find(params[:admin_id])
    @admin = current_admin
  end
end
