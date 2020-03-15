import React from "react";

function EmployeeDropItem(props) {
    return (
        <option value={props.id}>
            {`` + props.lname + ` , ` + props.fname}
        </option>
    );
}

export default EmployeeDropItem;
