import { useEffect, useState } from "react";
import axios from "axios";
import Exercise from './Exercise'
import ExerciseForm from './ExerciseForm';

const Exercises = () => {
  const [exercises, setExercises] = useState([]);

  const getExercises = () => {
    axios
      .get("/api/exercises")
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  

  useEffect(() => {
    getExercises();
  }, []);
    
  const deleteExercise = (id) => {
    axios.delete(`/api/exercises/${id}`)
      .then((res) => {
        setExercises(exercises.filter((exercise)=> exercise.id !== id))
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error in delete exercise");
      })
  }

  const renderExercises = () => {
    return exercises.map((exercise) => (
      <Exercise key={exercise.id} exerciseProp={exercise} deleteExercise={deleteExercise}/>
    ))
  }


  const addExercise = (exercise) => {
    setExercises([exercise, ...exercises])
};
  
  return (
    <>
      <h1>Exercises</h1>
      <ExerciseForm addExercise={addExercise}/>
      {renderExercises()}
    </>
  );
};

export default Exercises;
