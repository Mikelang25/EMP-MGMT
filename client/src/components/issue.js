import React from "react";

const styles = {
    shortDescr:{
        width:"300px",
        marginRight:"15px",
        borderRadius:"5px"
    },
    dateCreated:{
        textAlign:"center",
        width:"250px",
        textAlign:"center",
        marginRight:"15px",
        borderRadius:"5px"
    },
    longDescr:{
        width:"450px"
    },
    button:{
        align:"center",
        width:"100px",
        height:"30px",
        margin:"0 auto"
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
        <tr style={styles.tr}>
            <td style={styles.shortDescr}>{props.issueShort}</td>
            <td style={styles.dateCreated}>{props.issueDate}</td>
            <td style={styles.dateCreated}>{props.issueAccept}</td>
            <td style={styles.file}><a href={props.issueDoc} download>{props.issueDoc}</a></td>
            <td><p style={styles.longDescr}>{props.issueLong}</p></td>
            <td><button style={styles.button} onClick={props.delete} value={props.id}>Delete</button></td>            
        </tr>
    );
}

export default Issue;
