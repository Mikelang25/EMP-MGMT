import React, { Component } from "react";
import API from "../../utils/API";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import "./manage.css";
import "./search.css";
import Issue from "../issueSearch";

class Search extends Component {

    state = {
        issues: [],
        email: "",
        selectedIssues: [],
        employeeID: ""
    };

    componentDidMount() {
        this.findIssues();
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    findIssues = () => {
        API.getIssuesSearch()
            .then(res => this.setState({
                issues: res.data
            }))
            .catch(err => console.log(err));
    }

    acceptIssue = (event) => {
        console.log("this works")
        const markAccept = event.target.value
        event.preventDefault();       
        API.updateIssue(markAccept)
            .then(res => {
                const remainingIssuesEmp = this.state.selectedIssues.filter(issue => issue.id != markAccept)
                this.setState({
                    selectedIssues: remainingIssuesEmp
                })
                this.findIssues();
            })
            .catch(err => console.log(err));
    }

    findEmployee = () => {
        const selectEmail = this.state.email
        console.log(selectEmail)
        API.findEmployee(selectEmail)
            .then(res => {
                this.setState({
                    selectedIssues: this.state.issues.filter(issue => issue.employee_id === res.data.id)
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="wrapper">
                <div className="row">
                    <div className="tab col-md-12">
                        <button className="tablinks" value="Issues"><img className="issue-img" src="https://img.icons8.com/office/16/000000/high-risk.png" />Search Issues</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5">
                        <label className="lbl-search">Search:</label>
                        <input className="inp-search" name="email" type="text" value={this.state.email} onChange={this.handleInputChange}></input>
                        <input className="btn-search" type="submit" value="Submit" onClick={this.findEmployee}></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                    {this.state.selectedIssues.length ? (
                        <Table className="issue-table" variant="dark" striped bordered hover size="sm">
                            <thead>
                                <tr className="table-headers">
                                    <th className="table-head">Issue</th>
                                    <th className="table-head">Date Created</th>
                                    <th className="table-head">Confirm Date</th>
                                    <th className="table-head">Attachment</th>
                                    <th className="table-head">Description</th>
                                    <th className="table-head">Action</th>
                                </tr>
                            </thead>
                            <tbody className="table-issue">
                                {this.state.selectedIssues.map(issue => (
                                    <Issue
                                        key={issue.id}
                                        id={issue.id}
                                        issueShort={issue.issue_short_descr}
                                        issueDate={issue.issue_date}
                                        issueLong={issue.issue_full_descr}
                                        issueAccept={issue.confirm_date}
                                        issueDoc={issue.issue_attach}
                                        onChange={this.handleInputChange}
                                        accept={this.acceptIssue}
                                    />
                                ))}
                            </tbody>
                        </Table> ):(
                            <div>
                                <h2 className="text-center no-issues2">Enter your email to search for open issues</h2>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

}

export default Search;
