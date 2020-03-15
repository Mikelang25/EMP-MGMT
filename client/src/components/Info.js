import React from "react";

const styles= {
    labels:{
        marginTop:"10px",
        marginLeft:"50px",
    },
    inputs:{
        marginLeft:"50px",
        width:"30%",
        borderRadius:"10px",
        paddingLeft:"10px"
    },
    form:{
    },
    button:{
        marginTop:"30px",
        marginLeft:"50px",
    }
}

function InfoTab(props) {

    return (
        <div className="col-md-12">
            <form>
                <label style={styles.labels}>First name:</label><br></br>
                <input style={styles.inputs} type="text" name="emp_fname" onChange={props.onChange} defaultValue={props.fname} ></input><br></br>
                <label style={styles.labels}>Last name:</label><br></br>
                <input style={styles.inputs} type="text" name="emp_lname"  onChange={props.onChange} defaultValue={props.lname}></input><br></br>
                <label style={styles.labels}>Email:</label><br></br>
                <input style={styles.inputs} type="text" name="emp_email" onChange={props.onChange} defaultValue={props.email}></input><br></br>
                <label style={styles.labels}>Salary:</label><br></br>
                <input style={styles.inputs} type="text" name="emp_pay" onChange={props.onChange} defaultValue={props.pay}></input><br></br>
                <label style={styles.labels}>Hire Date:</label><br></br>
                <input style={styles.inputs} type="text" name="emp_hire_date" onChange={props.onChange} defaultValue={props.hire}></input><br></br>

                <button style={styles.button} onClick={props.updateEmployee}>Update</button>
            </form>
        </div>
    );
  }
  
  export default InfoTab;