import React, { Component } from "react";
import API from "../../utils/API";
import { EmployeeList, EmployeeDropItem } from "../employeeList";
import "./manage.css";

class Manage extends Component {

    state = {
        employees: []
    };

    componentDidMount() {
        this.loadEmployees();
      }


    loadEmployees = () => {
        API.getEmployees()
            .then(res => this.setState({ employees: res.data }))
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div className="wrapper">
                <div className="row">
                    <div className ="col-md-2 text-center drop-container">
                        <EmployeeList>
                            {this.state.employees.map(employee => (
                                <EmployeeDropItem 
                                key={employee.id}
                                fname={employee.emp_fname}
                                lname={employee.emp_lname}
                                />
                            ))}
                        </EmployeeList>
                    </div>
                    <div className="col-md-10 text-center main-container">
                        TEST
                    </div>
                </div>
            </div>
        );
    }

}

export default Manage;
