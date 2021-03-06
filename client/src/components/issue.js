import React from "react";

const styles = {
    shortDescr:{
        width:"300px",
        fontFamily:"'Gotu', sans-serif"
    },
    dateCreated:{
        width:"250px",
        textAlign:"center",
        marginRight:"15px",
        verticalAlign:"middle",
        fontFamily:"'Gotu', sans-serif"
    },
    longDescr:{
        width:"450px",
        fontFamily:"'Gotu', sans-serif"
    },
    button:{
        backgroundColor: "rgb(89, 89, 189)",
        color:"whitesmoke",
        width:"150px",
        textShadow: "none",
        border:"1pt solid black",
        marginTop:"6px",
        marginLeft:"8px",
        borderRadius:"5px",
        fontFamily: "'Playfair Display SC', serif"
    },
    file:{
        width:"350px",
        textAlign:"center",
        marginLeft:"20px",
        marginRight:"30px",
        fontFamily:"'Gotu', sans-serif"
    },
    tr:{
        padding:"10px"
    }
}

function Issue(props) {
    return (
        <tr style={styles.tr}>
            <td style={styles.shortDescr}>{props.issueShort}</td>
            <td style={styles.dateCreated}>{props.issueDate}</td>
            <td style={styles.dateCreated}>{props.issueAccept}</td>
            <td style={styles.file}><a href={`https://emp-mgt-`+ props.employee + `.s3.amazonaws.com/` + props.issueDoc} download>{props.issueDoc}</a></td>
            <td><p style={styles.longDescr}>{props.issueLong}</p></td>
            <td><button style={styles.button} onClick={props.delete} value={props.id}>Delete</button></td>            
        </tr>
    );
}

export default Issue;
