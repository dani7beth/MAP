import { useEffect, useState } from "react"
import Axios from "axios"
import Comment from "./Comment"
import { Button, Form, Modal } from "react-bootstrap"
import styled from 'styled-components';

const Comments = ({submission_id}) => {
  // const { submission_id } = useParams()
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState("")
  const [addShow, setAddShow] = useState(false);

  const handleAddClose = () => setAddShow(false);
  const handleAddShow = () => setAddShow(true);

  useEffect(()=>{
    getComments()
  },[])

  const getComments = async () => {
    try {
      // debugger
      let res = await Axios.get(`/api/submissions/${submission_id}/comments`)
      setComments(res.data)
    } catch (error) {
      console.log(error)
      return (
        <h1>It would appear there has been a grave error. </h1>
      )
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let res = await Axios.post(`/api/submissions/${submission_id}/comments`,{body:comment, submission_id:submission_id})
      setComments([res.data,...comments])
      setComment("")
      handleAddClose();
    } catch (error) {
      console.log(error)
      return (
        <h1>It would appear there has been a grave error. </h1>
      )
    }
  }

  const editSingleComment = async (id, object) => {
    try {
      // debugger
      let res = await Axios.put(`/api/submissions/${submission_id}/comments/${id}`,object)
      let newComments = comments.map(c => c.id !== id ? c : res.data)
      setComments(newComments)
    } catch (error) {
      console.log(error)
      return (
        <h1>It would appear there has been a grave error. </h1>
      )
    }
  }

  const removeComment = async(id) => {
    try {
      let res = await Axios.delete(`/api/submissions/${submission_id}/comments/${id}`)
      console.log(res.data)
      let newComments = comments.filter(c => c.id !== id)
      setComments(newComments)
    } catch (error) {
      console.log(error)
      return (
        <h1>It would appear there has been a grave error. </h1>
      )
    }
  }

  return (
    <div style={{padding: "30px", backgroundColor:'white', height:'300px', borderRadius:'10px'}}>
      <h3>
        Comments
      <Button onClick={handleAddShow} style={{marginBottom: "0px", marginLeft:'30px', backgroundColor:'#f4731f', border:'1px solid #f4731f' }}>
        Add comment
      </Button>
      </h3>
      <CommentsContainer>
        {comments.map(c => <Comment key={c.id}{...c} submission_id={submission_id} editSingleComment={editSingleComment} removeComment={removeComment}/>)}
      </CommentsContainer>
      <Modal show={addShow} onHide={handleAddClose}>
        <Modal.Header closeButton>
          <Modal.Title>What would you like to say?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form onSubmit={handleSubmit}>
              <Form.Control value={comment} as="textarea" onChange={(e)=>setComment(e.target.value)}/>  
              <Button type='submit' variant='primary'>Submit</Button>
              <Button variant="secondary" onClick={handleAddClose}>Cancel</Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Comments;

export const CommentsContainer = styled.div`
  height:224px;
  overflow:auto;
  border-radius:10px;
`