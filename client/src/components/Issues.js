import React, { Component } from "react";
import API from "../utils/API";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Issue from "./issue"
import "./issues.css";

class Issues extends Component {

    state = {
        issues: []
    }

    componentDidMount() {
        this.findIssues()
    }

    findIssues = () => {
        const employee = this.props.employee
        API.getIssues(employee)
            .then(res => this.setState({
                issues: res.data
            }))
            .catch(err => console.log(err));
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };


    render() {
        return (
            <div className="wrapper">
                <div className="col-md-12">
                    <table className="table-issue">
                        <tr>
                            <th>Issue</th>
                            <th>Date Created</th>
                            <th>Description</th>
                            <th>Cpnfirm Date</th>
                        </tr>
                        {this.state.issues.map(issue => (
                            
                            <Issue
                                key={issue.id}
                                issueShort={issue.issue_short_descr}
                                issueDate={issue.issue_date}
                                issueLong={issue.issue_full_descr}
                                issueAccept={issue.confirm_date}
                            />
                        ))}
                    </table>

                </div>
            </div>
        );
    }
}

export default Issues;