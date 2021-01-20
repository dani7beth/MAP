import { useEffect, useState } from "react"
import Axios from "axios"
import { useParams } from "react-router-dom"
import Comment from "./Comment"

const Comments = ({submission_id}) => {
  // const { submission_id } = useParams()

  const [comments, setComments] = useState([])
  const [comment, setComment] = useState("")
  

  useEffect(()=>{
    getComments()
  },[])

  const getComments = async () => {
    try {
      // debugger
      let res = await Axios.get(`/api/submissions/${submission_id}/comments`)
      console.log(res.data)
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
      // debugger
      let res = await Axios.post(`/api/submissions/${submission_id}/comments`,{body:comment, submission_id:submission_id})
      console.log(res.data)
      setComments([res.data,...comments])
      setComment("")
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
      console.log(res.data)
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
      // debugger
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
    <>
    <h1>Comments</h1>
    <form onSubmit={handleSubmit}>
      <input value = {comment} type = "textarea" onChange={(e)=>setComment(e.target.value)}/>
      <button type="submit">+</button>
    </form>
    {comments.map(c => <Comment key={c.id}{...c} submission_id={submission_id} editSingleComment={editSingleComment} removeComment={removeComment}/>)}
    </>

  )
}

export default Comments