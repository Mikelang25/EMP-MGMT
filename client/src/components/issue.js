import React from "react";

const styles = {
    shortDescr:{
        width:"300px",
        marginRight:"15px",
        borderRadius:"5px"
    },
    dateCreated:{
        width:"250px",
        textAlign:"center",
        marginRight:"15px",
        borderRadius:"5px"
    },
    longDescr:{
        width:"450px",
        marginTop:"30px",
        marginRight:"15px",
        borderRadius:"5px",
        
    },
    button:{
        width:"100px",
        height:"30px",
        marginLeft:"15px"
    },
    file:{
        width:"350px",
        textAlign:"center",
        marginLeft:"20px",
        marginRight:"30px",
        borderRadius:"5px"
    }
}

function Issue(props) {
    return (
        <tr>
            <td><input style={styles.shortDescr} type="text" name="issue_short_descr" onChange={props.onChange} defaultValue={props.issueShort}></input></td>
            <td><input style={styles.dateCreated} type="text" name="issue_date" onChange={props.onChange} defaultValue={props.issueDate}></input></td>
            <td><input style={styles.dateCreated} type="text" name="confirm_date" onChange={props.onChange} defaultValue={props.issueAccept}></input></td>
            <td><span style={styles.file}><a href={props.issueDoc} download>{props.issueDoc}</a></span></td>
            <td><textarea style={styles.longDescr} name="issue_full_descr" onChange={props.onChange} defaultValue={props.issueLong}></textarea></td>
            <td><button style={styles.button} onClick={props.delete} value={props.id}>Delete</button></td>            
        </tr>
    );
}

export default Issue;
