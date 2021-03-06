import React from "react";

const styles = {
    shortDescr:{
        width:"100px",
        textAlign:"center",
        verticalAlign:"middle"
    },
    tran:{
        width:"150px",
        textAlign:"center",
        marginRight:"15px",
        verticalAlign:"middle"
    },
    comment:{
        width:"200px",
        padding:"none"
    },
    button:{
        backgroundColor: "rgb(89, 89, 189)",
        color:"whitesmoke",
        width:"30px",
        textShadow: "none",
        border:"1pt solid black",
        marginTop:"6px",
        marginLeft:"15px",
        borderRadius:"5px"
    },
    tr:{
        padding:"10px"
    },
    amount:{
        width:"100px",
        textAlign:"center",
        marginRight:"15px",
        verticalAlign:"middle"
    }
}

function Item(props) {
    return (
        <tr style={styles.tr}>
            <td style={styles.shortDescr}>{props.month}</td>
            <td style={styles.tran}>{props.date}</td>
            <td style={styles.amount}>${props.credit}</td>
            <td style={styles.amount}>${props.debit}</td>    
            <td style={styles.tran}>{props.trantype}</td>        
            <td><p style={styles.comment}>{props.comment}</p></td>
            <td><button style={styles.button} onClick={props.remove} value={props.id}>X</button></td>            
        </tr>
    );
}

export default Item;
