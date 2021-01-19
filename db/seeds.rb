
require 'faker'

#admins 
5.times do |i|
admin = Admin.create(name:"admin#{i}", email: "admin#{i}@test.com", password:"123456")
    puts "created email: #{admin.email}"
    3.times do
        exercise = admin.exercises.create(name:'Shrek shredder 4000', image:"https://fakeimg.pl/300/", how_to_video:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", category: "Upper body", activity:Faker::Verb.simple_present)
            exercise.levels.create(name: 'Easy', measurement: Faker::Measurement.weight, reps: 10, timeframe:"" , sets: 3)
            exercise.levels.create(name: 'Medium', measurement: Faker::Measurement.weight, reps: 13, timeframe:"" , sets: 3) 
            exercise.levels.create(name: 'Hard', measurement: Faker::Measurement.weight, reps: 15, timeframe:"" , sets: 3)     
    end
end 

#users

5.times do |j|
  user = User.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    weight: rand(100..300),
    height: rand(163..199),
    gender: Faker::Gender.binary_type,
    about: Faker::Movies::PrincessBride.quote,
    age: rand(18..65),
    image: 'https://picsum.photos/200',
    email: "user#{j}@test.com", 
    password: '123456')
    puts "created user email: #{user.email}"
    3.times do 
      submit = user.submissions.create(completed:false, name: "squats", video_upload: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", level_id: rand(1..15))
      # 2.times do 
      #   submit.comments.create(admin_id:rand(0..4), body:"Nice!")
      # end
    end
end

15.times do
  Comment.create(submission_id:rand(1..15), admin_id:rand(1..5), body:"Nice!")
end

#submissions
#comments
puts "seeded"