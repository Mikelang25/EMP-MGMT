import React from "react";

const styles= {
    labels:{
        marginTop:"20px",
        marginLeft:"50px",
    },
    inputs:{
        marginLeft:"50px",
        width:"30%",
        borderRadius:"10px",
        paddingLeft:"10px"
    },
    form:{
    }
}

function InfoTab(props) {

    return (
        <div className="col-md-12">
            <form>
                <label style={styles.labels}>First name:</label><br></br>
                <input style={styles.inputs} type="text" id="fname" name="emp_fname" defaultValue={props.fname} ></input><br></br>
                <label style={styles.labels}>Last name:</label><br></br>
                <input style={styles.inputs} type="text" id="lname" name="emp_lname" defaultValue={props.lname}></input><br></br>
                <label style={styles.labels}>Email:</label><br></br>
                <input style={styles.inputs} type="text" id="email" name="emp_email" defaultValue={props.email}></input><br></br>
                <label style={styles.labels}>Salary:</label><br></br>
                <input style={styles.inputs} type="text" id="pay" name="emp_pay" defaultValue={props.pay}></input><br></br>
                <label style={styles.labels}>Hire Date:</label><br></br>
                <input style={styles.inputs} type="text" id="hire" name="emp_hire_date" defaultValue={props.hire}></input><br></br>
            </form>
        </div>
    );
  }
  
  export default InfoTab;