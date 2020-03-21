import React from "react";
import Modal from 'react-bootstrap/Modal';

const styles={
  labels:{
    fontWeight:"bold",
    marginBottom:"15px"
  },
  inputs:{
    marginBottom:"20px",
    width:"80%"
  },
  buttonSub:{
    marginTop:"30px",
    marginRight:"30px",
    width:"25%"
  }
}




function SignupModal(props) {

    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Employee
              </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
    );
  }
  
  export default SignupModal;