# frozen_string_literal: true

class Admin < ActiveRecord::Base
  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :exercises, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :submissions, through: :comments

 
end
