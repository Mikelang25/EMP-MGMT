import React, { Component } from "react";
import API from "../../utils/API";
import EmployeeDropItem from "../employeeList";
import InfoTab from "../Info";
import Performance from "../Performance";
import Issues from "../Issues";
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
        emp_photo: ""
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
        const selectedInfo = this.state.employees.filter(employee => employee.id == selectedEmp)
        const currfname = selectedInfo[0].emp_fname
        const currlname = selectedInfo[0].emp_lname
        const curremail = selectedInfo[0].emp_email
        const currpay = selectedInfo[0].emp_pay
        const currhire = selectedInfo[0].emp_hire_date
        const currphoto = selectedInfo[0].emp_photo
        this.setState({
            emp_fname: currfname,
            emp_lname: currlname,
            emp_email: curremail,
            emp_pay: currpay,
            emp_hire_date: currhire,
            selectEmployee: selectedEmp,
            employeeInfo: selectedInfo
        })
        console.log(this.state)
    }

    uploadFile = (file) => {
        console.log(file)
        file.preventDefault();
        API.uploadFile(file.target.value)
            .then(res => console.log("upload successful"))
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
            emp_hire_date: this.state.emp_hire_date
        })
            .then(res => this.loadEmployees())
            .catch(err => console.log(err));

    }

    renderPage() {
        if (this.state.myTab === "Info") {
            return (
                <div className="col-md-12">
                    {this.state.employeeInfo.map(info => (
                        <div className="info-container">
                            <img alt="photo" className="emp-image" src={info.emp_photo} />
                            <InfoTab
                                key={info.id}
                                fname={info.emp_fname}
                                lname={info.emp_lname}
                                email={info.emp_email}
                                pay={info.emp_pay}
                                hire={info.emp_hire_date}
                                onChange={this.handleInputChange}
                                updateEmployee={this.updateEmployee}
                                photo={info.emp_photo}
                            />
                            <label className="lblSubmit" >Photo</label><br></br>
                            <input className="fileSubmit" type="file" name="emp_photo" onChange={this.uploadFile}></input>
                        </div>
                    ))}
                </div>);
        } else if (this.state.myTab === "Performance") {
            return <Performance />;
        } else if (this.state.myTab === "Issues") {
            return <Issues />;
        } else {
            return (
                <div className="col-md-12">
                    {this.state.employeeInfo.map(info => (
                        <div className="info-container">
                            <img alt="" className="emp-image" src={info.emp_photo} />
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
                        </div>
                    ))}
                </div>);
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
                    <div className="col-md-10 text-center main-container">

                    </div>
                </div>
                <div className="row">
                    <div className="tab col-md-12">
                        <button className="tablinks" value="Info" onClick={this.selectedTab}>Info</button>
                        <button className="tablinks" value="Performance" onClick={this.selectedTab}>Performance</button>
                        <button className="tablinks" value="Issues" onClick={this.selectedTab}>Issues</button>
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
