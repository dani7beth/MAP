class Submission < ApplicationRecord
  belongs_to :level
  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :admins, through: :comments

  def self.submissions_by_exercise(exercise_id)
    select("submissions.ID as submission_id, 
            submissions.video_upload as video, 
            submissions.created_at as created_at,
            submissions.updated_at as updated_at,
            levels.ID as level_id,
            exercises.ID as exercise_id,
            users.ID as user_id,
            users.first_name as user_first_name
          ")
        .joins("inner join levels on levels.id = submissions.level_id")
        .joins("inner join exercises on exercises.id = levels.exercise_id")
        .joins("inner join users on users.id = submissions.user_id")
        .where("exercises.id = ? ", exercise_id)
  end
end
