import React, { Component } from "react";
import API from "../utils/API";

const styles = {
    labels: {
        fontWeight: "bold",
        marginTop: "15px",
        marginLeft: "50px",
        color:"white"
    },
    inputs: {
        marginLeft: "50px",
        width: "70%",
        paddingLeft: "10px",
        borderRadius:"15px"
    },
    form: {
        borderRadius:"15px"
    },
    button: {
        marginTop: "30px",
        marginLeft: "50px",
        backgroundColor: "rgb(89, 89, 189)",
        color:"whitesmoke",
        width:"100px",
        marginRight:"15px",
        textShadow: "none",
        border:"1pt solid black",
        marginBottom:"20px",
        borderRadius:"5px"
    },
    selectFile: {
        padding:"10px",
        marginTop: "10px",
        marginLeft: "50px",
        border:"1pt solid black",
        marginBottom:"20px",
        borderRadius:"5px",
        color:"white"
    }
}

class InfoTab extends Component {

    render() {
        return (
            <div className="col-md-12">
                <form style={styles.form} onSubmit={this.props.updateEmployee}>
                    <label style={styles.labels}>First name</label><br></br>
                    <input style={styles.inputs} type="text" name="emp_fname" onChange={this.props.onChange} defaultValue={this.props.fname} ></input><br></br>
                    <label style={styles.labels}>Last name</label><br></br>
                    <input style={styles.inputs} type="text" name="emp_lname" onChange={this.props.onChange} defaultValue={this.props.lname}></input><br></br>
                    <label style={styles.labels}>Email</label><br></br>
                    <input style={styles.inputs} type="text" name="emp_email" onChange={this.props.onChange} defaultValue={this.props.email}></input><br></br>
                    <label style={styles.labels}>Salary</label><br></br>
                    <input style={styles.inputs} type="text" name="emp_pay" onChange={this.props.onChange} defaultValue={this.props.pay}></input><br></br>
                    <label style={styles.labels}>Hire Date</label><br></br>
                    <input style={styles.inputs} type="text" name="emp_hire_date" onChange={this.props.onChange} defaultValue={this.props.hire}></input><br></br>
                    <label style={styles.labels} >Photo</label><br></br>
                    <input style={styles.selectFile} type="file" name="emp_photo" onChange={this.props.setphoto}></input><br></br>
                    <input style={styles.button} type="submit" value="Update" />
                </form>
            </div>
        );
    }
}

export default InfoTab;