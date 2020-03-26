import React from "react";
import Modal from 'react-bootstrap/Modal';

const styles = {
  labels: {
    fontWeight: "bold",
    marginTop: "10px",
    marginLeft: "50px",
    color:"white"
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
    backgroundColor: "rgb(89, 89, 189)",
    color: "white",
    width: "100px",
    height: "40px",
    borderRadius:"5px"
  },
  button2: {
    marginTop: "30px",
    marginLeft: "40px",
    backgroundColor: "rgb(89, 89, 189)",
    color: "white",
    width: "100px",
    height: "40px",
    borderRadius:"5px"
  },
  selectFile: {
    marginLeft: "50px"
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
    border:"1 solid black"
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
      <Modal.Header style={styles.modalHead} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h2 style={styles.modalTitle}><img src="https://img.icons8.com/color/48/000000/men-age-group-5.png"/>Create Employee</h2>
            </Modal.Title>
      </Modal.Header>
      <Modal.Body style={styles.modal}>
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
      <Modal.Footer style={styles.modalFooter}>
        
      </Modal.Footer>
    </Modal>
  );
}

export default InfoModal;
