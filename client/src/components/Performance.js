import React, { Component } from "react";
import API from "../utils/API";

class Performance extends Component {


    


    render() {
        return (
        <div className="col-md-12">
            {this.props.employee} + 1
        </div>
        );
    }
}

export default Performance;