import { useContext, useState } from 'react';
import { AuthContext, } from "../providers/AuthProvider"
import {Row, Col, Button, Modal} from "react-bootstrap"
import Exercises from '../exercises/Exercises';
import AdminUpdate from './AdminUpdate';
import AdminUpdateImage from './AdminUpdateImage';

const AdminDash = () =>{
  const {admin, updateAdminInfo, updateAdminImage } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [imageShow, setImageShow] = useState(false);

  const handleImageShow = () => setImageShow(true);
  const handleImageHide = () => setImageShow(false);

  console.log(admin);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderAdmin = () => {
    if (admin) {
      return (
        <>
          <Row>
            <Col xs={2}>
              <h1>This is where the Submition Review needs to go</h1>
            </Col>
            <Col xs={8}>
              <Exercises />
            </Col>
            <Col xs={2}>
              <img src={admin.image} onClick={handleImageShow} alt='Admin' />
              <Modal show={imageShow} onHide={handleImageHide}>
                <Modal.Header closeButton>
                  <Modal.Title>Drag or drop a photo here</Modal.Title>
                </Modal.Header>
                <Modal.Body><AdminUpdateImage handleImageHide={handleImageHide} updateAdminImage={updateAdminImage} /></Modal.Body>
              </Modal>
              <div nClick={handleShow}>
                <h1>Welcome {admin.first_name} {admin.last_name}</h1>
                <p>Your email: {admin.email}</p>
                <p>Your phone number: {admin.phone}</p>
                <p>Your speciality: {admin.speciality}</p>
                <Button onClick={handleShow}>Update Info</Button>
              </div>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Update Trainer Information</Modal.Title>
                </Modal.Header>
                <Modal.Body><AdminUpdate handleClose={handleClose} updateAdminInfo={updateAdminInfo} /></Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
            <Col>
              <h1>connnected users</h1>
            </Col>
          </Row>
        </>
      )
    }
  }

  return (
    <>
      {renderAdmin()}
    </>
  )
}
export default AdminDash;
