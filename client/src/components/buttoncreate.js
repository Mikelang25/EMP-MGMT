import React, { Component } from "react";
const styles = {
    button:{
        marginTop:"20px",
        backgroundColor:"black",
        color:"white",
        borderRadius:"5px"
    }
}

class ButtonCreate extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-md-12 text-right">
                    <button style={styles.button} onClick={this.props.onClick}>Create</button>
                </div>
            </div>
        );
    }
}

export default ButtonCreate;