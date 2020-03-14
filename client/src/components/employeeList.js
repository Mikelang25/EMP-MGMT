import React from "react";

const styles = {
    dropdown:{
        width:"80%",
        backgroundColor:"white",
        color:"black",
        marginTop:"20px"
    },
    dropItem:{
        fontWeight:"bold"
    }
}

export function EmployeeList({ children }) {
    return <select style={styles.dropdown} default-value ="" id="employees">{children}</select>
}

export function EmployeeDropItem(props) {
    return (
        <option value={props.fname} id={props.id}>
            {props.lname + ` , ` + props.fname}
        </option>
    );
}
