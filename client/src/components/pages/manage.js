import React, { Component } from "react";
import API from "../../utils/API";
import EmployeeDropItem from "../employeeList";
import InfoTab from "../Info";
import Performance from "../Performance";
import ButtonCreate from "../buttoncreate";
import Issues from "../Issues";
import InfoModal from "../employeemodal";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import "./manage.css";

class Manage extends Component {

    state = {
        employees: [],
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
        modalShow: false
    };

    componentDidMount() {
        this.loadEmployees()
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };


    selectedTab = (empPage) => {
        const desiredTab = empPage.target.value
        this.setState({
            myTab: desiredTab
        });
    }

    selectEmployee = (emp) => {
        const selectedEmp = parseInt(emp.target.value);
        const selectedInfo = this.state.employees.filter(employee => employee.id === selectedEmp)
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
            photo_name: currPhoto
        })
        console.log(this.state)
    }

    setPhoto = (event) => {
        this.setState({
            emp_photo: event.target.files[0],
            photo_name: event.target.files[0].name
        })
    }

    uploadFile = () => {
        const data = new FormData()
        data.append('file', this.state.emp_photo)
        console.log(this.state.emp_photo)
        API.uploadFile(data)
            .then(res => console.log(res.statusText))
            .catch(err => console.log(err));
    }

    loadEmployees = () => {
        API.getEmployees()
            .then(res => this.setState({
                employees: res.data
            }))
            .catch(err => console.log(err));
    }

    updateEmployee = event => {
        console.log(event.target.value)
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
            .then(res => this.loadEmployees())
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
        return (
            <div>
                <Button className="emp-create" variant="primary" onClick={this.showModal}>
                    Create Employee
                </Button>
                <InfoModal show={this.state.modalShow} onHide={this.hideModal} />
            </div>
        );
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
                            <div className="col-md-7">
                                <InfoTab
                                    key={info.id}
                                    fname={info.emp_fname}
                                    lname={info.emp_lname}
                                    email={info.emp_email}
                                    pay={info.emp_pay}
                                    hire={info.emp_hire_date}
                                    onChange={this.handleInputChange}
                                    updateEmployee={this.updateEmployee}
                                />
                                <div className="row">
                                    <div className="col-md-4 photo-container">
                                        <label className="lblSubmit" >Photo</label><br></br>
                                        <input className="fileSubmit" type="file" name="emp_photo" onChange={this.setPhoto}></input>
                                        <input className="btn-submit" type="submit" value="Upload" onClick={this.uploadFile} />
                                    </div>
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
            return <Issues
                employee={this.state.selectEmployee}
            />;
        }
    };

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
                    <div className="col-md-7 text-center main-container">

                    </div>
                    <div className="col-md-2 text-right">
                        {this.getModal()}
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
