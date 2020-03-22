import React, { Component } from "react";
import API from "../../utils/API";
import EmployeeDropItem from "../employeeList";
import InfoTab from "../Info";
import Performance from "../Performance";
import InfoModal from "../employeemodal";
import IssueModal from "../issuemodal";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import "./manage.css";
import Issue from "../issue"
import "../issues.css";

class Manage extends Component {

    state = {
        employees: [],
        issues: [],
        emp_issues: [],
        employeeInfo: [],
        selectEmployee: "",
        myTab: "Info",
        emp_fname: "",
        emp_lname: "",
        emp_email: "",
        emp_pay: "",
        emp_hire_date: "",
        emp_photo: null,
        photo_name: "",
        modalShow: false,
        new_fname: "",
        new_lname: "",
        new_email: "",
        new_pay: "",
        new_hire_date: "",
        new_photo: "noimage.png",
        issue_short_descr: "",
        issue_date: "",
        issue_full_descr: "",
        confirm_date: "",
        issue_attach: "",
        new_issue_short_descr: "",
        new_issue_date: "",
        new_attach: null,
        new_attach_name: "",
        new_issue_full_descr: ""
    };

    componentDidMount() {
        this.loadEmployees()
        this.findIssues()
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    selectedTab = empPage => {
        const desiredTab = empPage.target.value
        this.setState({
            myTab: desiredTab
        });
    }


    submitEmployee = event => {
        event.preventDefault();
        API.createEmployee({
            emp_fname: this.state.new_fname,
            emp_lname: this.state.new_lname,
            emp_email: this.state.new_email,
            emp_pay: this.state.new_pay,
            emp_hire_date: this.state.new_hire_date,
            emp_photo: this.state.new_photo
        })
            .then(res => {
                this.hideModal()
                this.loadEmployees()
            })
            .catch(err => console.log(err));
    }

    submitIssue = event => {
        event.preventDefault();

        const newIssue = {
            employee_id: this.state.selectEmployee,
            issue_short_descr: this.state.new_issue_short_descr,
            issue_date: this.state.new_issue_date,
            issue_full_descr: this.state.new_issue_full_descr,
            issue_attach: this.state.new_attach_name
        }
        API.createIssue(newIssue)
            .then(res => {
                this.hideModal()
                const update_emp_issues = this.state.emp_issues
                update_emp_issues.push(newIssue)
                this.setState({
                    emp_issues: update_emp_issues
                })
            })
            .catch(err => console.log(err));

    }

    selectEmployee = (emp) => {
        const selectedEmp = parseInt(emp.target.value);
        const selectedInfo = this.state.employees.filter(employee => employee.id === selectedEmp)
        const issues = this.state.issues.filter(issue => issue.employee_id === selectedEmp)
        const currfname = selectedInfo[0].emp_fname
        const currlname = selectedInfo[0].emp_lname
        const curremail = selectedInfo[0].emp_email
        const currpay = selectedInfo[0].emp_pay
        const currhire = selectedInfo[0].emp_hire_date
        const currPhoto = selectedInfo[0].emp_photo

        this.setState({
            emp_fname: currfname,
            emp_lname: currlname,
            emp_email: curremail,
            emp_pay: currpay,
            emp_hire_date: currhire,
            selectEmployee: selectedEmp,
            employeeInfo: selectedInfo,
            photo_name: currPhoto,
            emp_issues: issues
        })

        console.log(this.state)
    }

    setPhoto = (event) => {
        this.setState({
            emp_photo: event.target.files[0],
            photo_name: event.target.files[0].name
        })
    }

    uploadAttach = (event) => {
        const data = new FormData()
        data.append('file', event.target.files[0])
        const fileName = event.target.files[0].name
        API.uploadFile(data)
            .then(res => console.log(res.statusText))
            .then(res => {
                this.setState({
                    new_attach_name: fileName
                })
                console.log(this.state.new_attach_name)
            })
            .catch(err => console.log(err));
    }

    uploadFile = (event) => {
        const data = new FormData()
        data.append('file', event.target.files[0])
        API.uploadFile(data)
            .then(res => console.log(res.statusText))
            .then(
                this.setState({
                    photo_name: event.target.files[0].name
                })
            )
            .catch(err => console.log(err));
    }

    loadEmployees = () => {
        API.getEmployees()
            .then(res => this.setState({
                employees: res.data
            }))
            .catch(err => console.log(err));
    }

    findIssues = () => {
        API.getIssues()
            .then(res => this.setState({
                issues: res.data
            }))
            .catch(err => console.log(err));
    }

    deleteIssue = (event) => {
        const markDelete = event.target.value
        event.preventDefault();
        API.deleteIssue(markDelete)
            .then(res => {
                const update_emp_issues = this.state.emp_issues.filter(issue => issue.id != markDelete)
                this.setState({
                    emp_issues: update_emp_issues
                })
                console.log(markDelete)
                console.log(this.state.emp_issues)
            })
            .catch(err => console.log(err));
    }

    updateEmployee = event => {
        event.preventDefault();
        API.updateEmployee({
            id: this.state.selectEmployee,
            emp_fname: this.state.emp_fname,
            emp_lname: this.state.emp_lname,
            emp_email: this.state.emp_email,
            emp_pay: this.state.emp_pay,
            emp_hire_date: this.state.emp_hire_date,
            emp_photo: this.state.photo_name
        })
            .then(res => {
                const updatedInfo = this.state.employees.filter(employee => employee.id === this.state.selectEmployee)
                updatedInfo[0].emp_photo = this.state.photo_name
                this.setState({
                    employeeInfo: updatedInfo
                })
                console.log(updatedInfo)
            })
            .catch(err => console.log(err));
    }

    logout = (event) => { 
        console.log("this is working")
        event.preventDefault();
        API.logoutUser()
        .then(res => {
            window.location.replace("/")
        })
        .catch(err => console.log(err));

    }

    showModal = () => {
        this.setState({
            modalShow: true
        })
    }

    hideModal = () => {
        this.setState({
            modalShow: false
        })
    }

    getModal() {
        if (this.state.myTab === "Info") {
            return (
                <div>
                    <Button key={this.state.selectEmployee} className="emp-create" variant="primary" onClick={this.showModal}>
                        Create Employee
                    </Button>
                    <InfoModal
                        show={this.state.modalShow}
                        onHide={this.hideModal}
                        onSubmit={this.submitEmployee}
                        onChange={this.handleInputChange}
                    />
                </div>
            );
        } else if (this.state.myTab === "Issues") {
            return (
                <div>
                    <Button key={this.state.selectEmployee} className="emp-create" variant="primary" onClick={this.showModal}>
                        Create Issue
                    </Button>
                    <IssueModal
                        show={this.state.modalShow}
                        onHide={this.hideModal}
                        onSubmit={this.submitIssue}
                        onChange={this.handleInputChange}
                        setattach={this.uploadAttach}
                    />
                </div>
            );

        } else if (this.state.myTab === "Performance") {

        }
    }


    renderPage() {
        if (this.state.myTab === "Info") {
            return (
                <div className="col-md-12">
                    {this.state.employeeInfo.map(info => (
                        <div className=" row info-container">
                            <div className="col-md-4 main-container">
                                <div className="image-container">
                                    <img alt="photo" className="emp-image" src={info.emp_photo} />
                                </div>
                            </div>
                            <div className="col-md-4 employee-container">
                                <InfoTab
                                    key={info.id}
                                    fname={info.emp_fname}
                                    lname={info.emp_lname}
                                    email={info.emp_email}
                                    pay={info.emp_pay}
                                    hire={info.emp_hire_date}
                                    onChange={this.handleInputChange}
                                    updateEmployee={this.updateEmployee}
                                    setphoto={this.uploadFile}
                                />
                                <div className="row">
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        } else if (this.state.myTab === "Performance") {
            return <Performance
                employee={this.state.selectEmployee}
            />;
        } else if (this.state.myTab === "Issues") {
            return (
                <div className="wrapper">
                    {this.state.emp_issues.length ? (
                        <div className="col-md-12 container-table">
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th className="table-head">Issue</th>
                                        <th className="table-head">Date Created</th>
                                        <th className="table-head">Confirm Date</th>
                                        <th className="table-head">Attachment</th>
                                        <th className="table-head">Description</th>
                                        <th className="table-head">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="table-issue">
                                    {this.state.emp_issues.map(issue => (
                                        <Issue
                                            key={issue.id}
                                            id={issue.id}
                                            issueShort={issue.issue_short_descr}
                                            issueDate={issue.issue_date}
                                            issueLong={issue.issue_full_descr}
                                            issueAccept={issue.confirm_date}
                                            issueDoc={issue.issue_attach}
                                            onChange={this.handleInputChange}
                                            delete={this.deleteIssue}
                                        />
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    ) : (
                            <h2 className="text-center no-issues">No issues have been created for this employee</h2>
                        )}
                </div>);
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div className="row">
                    <div className="col-md-2 text-center drop-container">
                        <select className="dropdown" defaultValue="" onChange={this.selectEmployee}>
                            {this.state.employees.map(employee => (
                                <EmployeeDropItem
                                    key={employee.id}
                                    id={employee.id}
                                    fname={employee.emp_fname}
                                    lname={employee.emp_lname}
                                />
                            ))}
                        </select>
                    </div>
                    <div className="col-md-5 text-center main-container">

                    </div>
                    <div className="col-md-4 text-right">
                        {this.getModal()}
                    </div>
                    <div className="col-md-1 text-cemter">
                        <Button className="btn-logout" onClick={this.logout}>
                            Logout
                        </Button>
                    </div>
                </div>
                <div className="row">
                    <div className="tab col-md-12">
                        <button className="tablinks" value="Info" onClick={this.selectedTab}><img className="issue-img" src="https://img.icons8.com/offices/16/000000/info.png" />Info</button>
                        <button className="tablinks" value="Issues" onClick={this.selectedTab}><img className="issue-img" src="https://img.icons8.com/office/16/000000/high-risk.png" />Issues</button>
                        <button className="tablinks" value="Performance" onClick={this.selectedTab}><img className="issue-img" src="https://img.icons8.com/plasticine/16/000000/area-chart.png" />Performance</button>
                    </div>
                </div>
                <div className="row">
                    {this.renderPage()}
                </div>
            </div>
        );
    }

}

export default Manage;
