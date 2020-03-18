import React from "react";

const styles = {
    shortDescr:{
        width:"300px",
        marginRight:"25px",
        borderRadius:"5px"
    },
    dateCreated:{
        width:"250px",
        textAlign:"center",
        marginRight:"25px",
        borderRadius:"5px"
    },
    longDescr:{
        width:"450px",
        marginTop:"30px",
        marginRight:"25px",
        borderRadius:"5px",
        
    },
    button:{
        width:"100px",
        height:"30px",
        marginLeft:"25px"
    }
}

function Issue(props) {
    return (
        <tr>
            <td><input style={styles.shortDescr} type="text" name="issue_short_descr" onChange={props.onChange} defaultValue={props.issueShort}></input></td>
            <td><input style={styles.dateCreated} type="text" name="issue_date" onChange={props.onChange} defaultValue={props.issueDate}></input></td>
            <td><textarea style={styles.longDescr} name="issue_full_descr" onChange={props.onChange} defaultValue={props.issueLong}></textarea></td>
            <td><input style={styles.dateCreated} type="text" name="confirm_date" onChange={props.onChange} defaultValue={props.issueAccept}></input></td>
            <td><button style={styles.button} onClick={props.delete} value={props.id}>Delete</button></td>
        </tr>
    );
}

export default Issue;
