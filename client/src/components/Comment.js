import { useState } from "react"
import {Modal, Button} from 'react-bootstrap'
import { MdEdit, MdDelete } from "react-icons/md";


const Comment = ({body, editSingleComment, id, submission_id, removeComment}) => {

  // const [editComment, setEditComment] = useState(false)
  const [newBody, setNewBody] = useState(body)
  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);

  const handleEditClose = () => setEditShow(false);
  const handleEditShow = () => setEditShow(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit=(e)=>{
    e.preventDefault()
    editSingleComment(id, {body:newBody, submission_id:submission_id})
    handleEditClose();
  }

    return(
      <>
        <div>
          <p>{body}</p>
          <MdEdit onClick={handleEditShow} style={{fontSize:"24px", cursor:"pointer"}}/>
          <MdDelete onClick={handleShow} style={{fontSize:"24px", cursor:"pointer"}}/>

          <Modal show={editShow} onHide={handleEditClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div>
                <form onSubmit={handleSubmit}>
                  <textarea value={newBody} onChange={(e)=>setNewBody(e.target.value)}/> 
                  <br />
                  <Button type='submit' variant='primary' >Submit Changes</Button>
                  <Button variant="secondary"  onClick={handleEditClose}>Cancel</Button>
                </form>
            </div>
            </Modal.Body>
          </Modal>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to Delete?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary"  onClick={handleClose}>
                No
              </Button>
              <Button variant="danger" onClick={()=> removeComment(id)}>
                Yes, delete.
              </Button>
            </Modal.Footer>
          </Modal>
          <hr />
      </div>
      </>
    )
  
}

export default Comment