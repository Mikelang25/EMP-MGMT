import React from "react";
import Modal from 'react-bootstrap/Modal';

const styles = {
  labels: {
    fontWeight: "bold",
    marginTop: "10px",
    marginLeft: "50px",
  },
  inputs: {
    marginLeft: "50px",
    width: "80%",
    borderRadius: "10px",
    paddingLeft: "10px"
  },
  form: {
  },
  button: {
    marginTop: "30px",
    marginLeft: "400px",
    backgroundColor: "black",
    color: "white",
    width: "100px",
    height: "40px",
    borderRadius:"5px"
  },
  button2: {
    marginTop: "30px",
    marginLeft: "40px",
    backgroundColor: "black",
    color: "white",
    width: "100px",
    height: "40px",
    borderRadius:"5px"
  },
  selectFile: {
    marginLeft: "50px"
  }
}

function InfoModal(props) {

  return (
    <Modal
      {...props}
      size="lg"
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
            <label style={styles.labels}>First name</label><br></br>
            <input style={styles.inputs} type="text" name="new_fname" onChange={props.onChange}></input><br></br>
            <label style={styles.labels}>Last name</label><br></br>
            <input style={styles.inputs} type="text" name="new_lname" onChange={props.onChange}></input><br></br>
            <label style={styles.labels}>Email</label><br></br>
            <input style={styles.inputs} type="text" name="new_email" onChange={props.onChange}></input><br></br>
            <label style={styles.labels}>Salary</label><br></br>
            <input style={styles.inputs} type="text" name="new_pay" onChange={props.onChange}></input><br></br>
            <label style={styles.labels}>Hire Date</label><br></br>
            <input style={styles.inputs} type="text" name="new_hire_date" onChange={props.onChange}></input><br></br>
            <button style={styles.button} onClick={props.onSubmit}>Create</button>
            <button style={styles.button2} onClick={props.onHide}>Close</button>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        
      </Modal.Footer>
    </Modal>
  );
}

export default InfoModal;
