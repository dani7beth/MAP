class Api::ExercisesController < ApplicationController
  before_action :authenticate_admin!, except: [:all_exercises, :show, :index, :create, :update]
  before_action :authenticate_user!, only: [:all_exercises]
  # before_action :set_admin, only: [:create, :update, :destroy, :show, :index]
  before_action :set_exercise, only: [:update, :destroy]
  before_action :set_page

  def index
    # binding.pry
    exercises = current_admin.exercises.page(@page).exercise_levels_by_admin(current_admin.id, params[:SearchText], params[:category])
    render json: {
      data: current_admin.exercises.page(@page).exercise_levels_by_admin(current_admin.id,params[:SearchText], params[:category]), 
      total_pages: exercises.total_pages, 
      # total_length: current_admin.exercises.exercise_levels_by_admin_distinct(current_admin.id, params[:SearchText], params[:category]).distinct.pluck(:id).length
    }
  end

  # def all_exercises
  # binding.pry
  #   exercises = Exercise.page(@page).exercise_levels(params[:SearchText], params[:category])
  #   render json: {
  #     data: Exercise.page(@page).exercise_levels(params[:SearchText], params[:category]), 
  #     total_pages: exercises.total_pages, 
  #     total_length: Exercise.exercise_levels(params[:SearchText], params[:category]).distinct.pluck(:exercise_id).length}
  # end

  def all_exercises
    # binding.pry
      exercises = Exercise.exercise_levels(params[:SearchText], params[:category], current_user.id)
      # paginated_exercises = Kaminari.paginate_array(exercises).page(@page)
      render json: exercises
      # json: {
      #   data: paginated_exercises, 
      #   total_pages: paginated_exercises.total_pages, 
      #   # total_length: Exercise.exercise_levels(params[:SearchText], params[:category], current_user.id).distinct.pluck(:exercise_id).length
      # }
    end

  def show
    render json: Exercise.find(params[:id])
  end

  def create 
    # exercise = current_admin.exercises.new(exercise_params)
    file = params[:how_to_video]
    if file
      begin
        # ext = File.extname(file.tempfile)
        cloud_video = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true, resource_type: :video)
        # user.image = cloud_image['secure_url']
        exercise = current_admin.exercises.new(image: params[:image], name: params[:name], how_to_video: cloud_video['secure_url'], category: params[:category], activity: params[:activity], description: params[:description])
      rescue => e
        render json: { errors: e }, status: 422
        return
      end
    end
    

    if exercise.save
      render json: exercise
    else
      render json: {errors: exercise.errors}, status: 422
    end

  end

  def update
    file = params[:how_to_video]
    if file
      begin
      cloud_video = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true, resource_type: :video)
      @exercise.update(image: params[:image], name: params[:name], how_to_video: cloud_video['secure_url'], category: params[:category], activity: params[:activity], description: params[:description])
      rescue => e
        render json: {errors: e}, status: 422
        return
      end 
    end
    render json: @exercise
  end


  def destroy
    @exercise.destroy
    render json: @exercise
  end

  private

  def exercise_params
    params.permit(:name, :image, :how_to_video, :category, :activity, :description)
  end

  def set_exercise
    @exercise = current_admin.exercises.find(params[:id])
  end

  def set_page
    @page = params[:page] || 1
  end
  
  # def set_admin
  #   # @admin = Admin.find(params[:admin_id])
  #   @admin = current_admin
  # end
end
