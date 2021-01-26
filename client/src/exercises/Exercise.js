import ExerciseForm from "./ExerciseForm";
import { useState, } from 'react';
import {Link} from 'react-router-dom';
import { Button, Modal } from "react-bootstrap";
import Levels from "../components/Levels";

const Exercise = ({ exerciseProp, deleteExercise, editExercises, activity, exercise_id, levels }) => {
  const [ exercise, setExercise] = useState()
  // const [ showDeleteForm, setshowDeleteForm] = useState(false)
  const [showDelete, setshowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showLevel, setShowLevel] = useState(true)

  const handleDeleteShow = () => setshowDelete(true);
  const handleDeleteHide = () => setshowDelete(false);
  const handleEditShow = () => setShowEdit(true);
  const handleEditHide = () => setShowEdit(false);
  

  const editExercise = (res) => {
    const newExercise = res;
    if(newExercise === exerciseProp.id) return setExercise(newExercise)
    else return exerciseProp
  }


  return (
    <div>
      <span>
        <Link to={`/show-exercises-for-admin/${exerciseProp.exercise_id}`}>  
          <h5>{exerciseProp.activity} - {exerciseProp.exercise_id}</h5>
        </Link>
        <button onClick={()=>setShowLevel(!showLevel)}>{showLevel ? "Expand" : "Collapse"}</button>
      </span>
      {showLevel ? "" : exerciseProp.levels.map((x) =>  {
        return(
          <p>{x.level_name}</p>
        )
      }
      )}
      
      <Button variant="primary" onClick={handleEditShow}>
        Edit
      </Button>
      <Modal show={showEdit} onHide={handleEditHide}>
        <Modal.Header closeButton>
          <Modal.Title>Edit this exericise</Modal.Title>
        </Modal.Header>
        <Modal.Body><ExerciseForm editExercise={editExercise} exerciseProp={exerciseProp} handleEditHide={handleEditHide} editExercises={editExercises} /></Modal.Body>
      </Modal>

      <Button variant="danger" onClick={handleDeleteShow}>
        Delete
      </Button>
      <Modal show={showDelete} onHide={handleDeleteHide}>
        <Modal.Header closeButton>
          <Modal.Title>Delete this exericise</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this exercise?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>handleDeleteHide}>
            No
          </Button>
          <Button variant="danger" onClick={()=> {
            deleteExercise(exerciseProp.exercise_id)
            handleDeleteHide()
            }}>
            Yes, delete.
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <Levels /> */}
    </div>
  )
}
export default Exercise;
