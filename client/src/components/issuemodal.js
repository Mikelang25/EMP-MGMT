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
    width: "60%",
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
    borderRadius: "5px"
  },
  button2: {
    marginTop: "30px",
    marginLeft: "40px",
    backgroundColor: "black",
    color: "white",
    width: "100px",
    height: "40px",
    borderRadius: "5px"
  },
  selectFile: {
    marginLeft: "50px"
  },
  dateCreated: {
    marginLeft: "50px",
    width: "30%",
    borderRadius: "10px",
    paddingLeft: "10px"
  },
  fileSubmit:{
    marginLeft: "50px",
    width: "40%",
    borderRadius: "10px",
    paddingLeft: "10px"
  },
  longDescr:{
    marginLeft: "50px",
    width: "80%",
    height:"100px",
    borderRadius: "10px",
    paddingLeft: "10px"
  }
}

function IssueModal(props) {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Employee Issue
            </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="col-md-12">
          <form>
            <label style={styles.labels}>Title</label><br></br>
            <input style={styles.inputs} type="text" name="new_issue_short_descr" onChange={props.onChange}></input><br></br>
            <label style={styles.labels}>Issue Date</label><br></br>
            <input style={styles.dateCreated} type="text" name="new_issue_date" onChange={props.onChange}></input><br></br>
            <label style={styles.labels}>Attachment</label><br></br>
            <input style={styles.fileSubmit} type="file" name="new_attach" onChange={props.setAttach}></input><br></br>
            <label style={styles.labels}>Description</label><br></br>
            <textarea style={styles.longDescr} name="new_issue_full_descr" onChange={props.onChange}></textarea><br></br>
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

export default IssueModal;
