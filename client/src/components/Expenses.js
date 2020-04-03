import React, { Component } from "react";
import API from "../utils/API";
import Table from 'react-bootstrap/Table';
import Item from "./accountItem";
import "./Expenses.css"

class Expenses extends Component {

    state = {
        budgetItems: [],
        months: ["select","January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        tranTypes: ["select","cash deposit", "cash disbursement", "sale", "expense"],
        tranYears:["select","2019","2020","2021"],
        selectedType: "",
        selectedMonth: "",
        selectedYear:"",
        tranAmount: "",
        tranDescr: "",
        tranDate:""
    }

    componentDidMount() {
        this.getAccountingItems()
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    getAccountingItems = () => {
        API.findAccounting()
            .then(res => this.setState({
                budgetItems: res.data
            }))
            .then(res => console.log(this.state.budgetItems))
            .catch(err => console.log(err));
    }

    addAccountingItem = (event) => {
        event.preventDefault();
        console.log("attempting to add item")
        let dmount = ""
        let cmount = ""
        const creditType = ["cash deposit","sale"]

        if(creditType.includes(this.state.selectedType)){
            dmount = "0"
            cmount = this.state.tranAmount
        }else{
            dmount = this.state.tranAmount
            cmount = "0"
        }

        var todayDate = new Date().toISOString().slice(0,10);

        API.postAccounting({
            budget_year:this.state.selectedYear,
            budget_month:this.state.selectedMonth,
            budget_credit: cmount,
            budget_debit: dmount,
            budget_description: this.state.selectedType,
            budget_comment:this.state.tranDescr,
            budget_tran_date: todayDate
        })
            .then(res => {
                console.log(res.data)
                this.getAccountingItems()
                this.setState({
                    selectedType: "select",
                    selectedMonth: "select",
                    selectedYear:"select",
                    tranAmount: "",
                    tranDescr: ""
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="wrapper">
                {this.state.budgetItems.length ? (
                    <div className="col-md-12 table-container">
                        <div className="row">
                            <div className="col-md-6">
                                <Table className="item-table" variant="dark" striped bordered hover size="sm">
                                    <thead>
                                        <tr className="table-headers">
                                            <th className="table-head">Month</th>
                                            <th className="table-head">Posted Date</th>
                                            <th className="table-head">Credit</th>
                                            <th className="table-head">Debit</th>
                                            <th className="table-head">Type</th>
                                            <th className="table-head">Description</th>
                                            <th className="table-head">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-issue">
                                        {this.state.budgetItems.map(item => (
                                            <Item
                                                key={item.id}
                                                id={item.id}
                                                month={item.budget_month}
                                                date={item.budget_tran_date}
                                                credit={item.budget_credit}
                                                debit={item.budget_debit}
                                                trantype={item.budget_description}
                                                comment={item.budget_comment}
                                            />
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                            <div className="col-md-6">
                                <form className="new-item-accounting">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label className="lbl-new-item">Month</label><br></br>
                                            <select name="selectedMonth" className="dropdown-month" onChange={this.handleInputChange} value={this.state.selectedMonth}>
                                                {this.state.months.map(month => (
                                                    <option key = {month} value={month}>
                                                        {month}
                                                    </option>
                                                ))}
                                            </select><br></br>
                                            <label className="lbl-new-item">Year</label><br></br>
                                            <select name="selectedYear" className="dropdown-month" onChange={this.handleInputChange} value={this.state.selectedYear}>
                                                {this.state.tranYears.map(year => (
                                                    <option key = {year} value={year}>
                                                        {year}
                                                    </option>
                                                ))}
                                            </select><br></br>
                                            <label className="lbl-new-item">Amount</label><br></br>
                                            <input name="tranAmount" className="input-new-item" type="text" onChange={this.handleInputChange} value={this.state.tranAmount} required></input>
                                        </div>
                                        <div className="col-md-6">
                                        <label className="lbl-new-item">Type</label><br></br>
                                            <select name="selectedType" className="dropdown-month" onChange={this.handleInputChange} value={this.state.selectedType} required>
                                                {this.state.tranTypes.map(type => (
                                                    <option key={type} value={type}>
                                                        {type}
                                                    </option>
                                                ))}
                                            </select><br></br>
                                            <label  className="lbl-new-item">Description</label><br></br>
                                            <textarea name="tranDescr" className="text-new-item" onChange={this.handleInputChange} value={this.state.tranDescr} required></textarea><br></br>
                                            <input className="btn-submit-item" type="submit" value="submit" onClick={this.addAccountingItem}></input>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                ) : (
                        <div className="col-md-12">
                            TABLE
                        </div>
                    )}
            </div>
        );
    }
}

export default Expenses;