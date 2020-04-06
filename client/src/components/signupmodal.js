import React from "react";
import Modal from 'react-bootstrap/Modal';
import "./signupmodal.css";

const styles = {
  labels: {
    fontWeight: "bold",
    marginBottom: "15px",
    color:"white",
    fontFamily: "'Playfair Display SC', serif"
  },
  inputs: {
    marginBottom: "20px",
    width: "80%",
    borderRadius: "10px",
    paddingLeft: "10px",
    fontFamily:"'Gotu', sans-serif"
  },
  buttonSub: {
    marginTop: "30px",
    marginRight: "30px",
    width: "25%",
    color: "white",
    borderRadius:"5px",
    fontFamily: "'Playfair Display SC', serif",
    backgroundColor: "rgb(89, 89, 189)"
  },
  modal:{
    backgroundImage:"url('./dark_fish_skin.png')"
  },
  modalHead:{
    backgroundColor:"grey",
    color:"white"
  },
  modalFooter:{
    backgroundColor:"black"
  },
  modalTitle:{
    border:"1 solid black",
    fontFamily: "'Playfair Display SC', serif"
  }
}

function SignupModal(props) {

  return (
    <Modal
      className="signmodal"
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={styles.modalHead} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h2 style={styles.modalTitle}>Create Employee</h2>
              </Modal.Title>
      </Modal.Header>
      <Modal.Body style={styles.modal}> 
        <div className="col-md-12">
          <form>
            <label style={styles.labels}>Email</label><br></br>
            <input style={styles.inputs} type="text" name="new_email" onChange={props.onChange}></input><br></br>
            <label style={styles.labels}>Password</label><br></br>
            <input style={styles.inputs} type="text" name="new_password" onChange={props.onChange}></input><br></br>
            <button style={styles.buttonSub} onClick={props.onClick}>Create</button>
            <button style={styles.buttonSub} onClick={props.onHide}>Close</button>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer style={styles.modalFooter}>

      </Modal.Footer>
    </Modal>
  );
}

export default SignupModal;