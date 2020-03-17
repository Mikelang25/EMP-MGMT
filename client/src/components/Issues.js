import React, { Component } from "react";
import API from "../utils/API";

class Issues extends Component {





    render() {
        return(
        <div className="col-md-12">
            {this.props.employee}
        </div>
        );
    }
}

export default Issues;