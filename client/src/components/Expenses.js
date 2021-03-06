import React, { Component } from "react";
import API from "../utils/API";
import Table from 'react-bootstrap/Table';
import Item from "./accountItem";
import "./Expenses.css"
import { VictoryPie } from "victory";

class Expenses extends Component {

    state = {
        totalbudgetItems: [],
        budgetItems:[],
        months: ["select", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        tranTypes: ["select", "cash deposit", "cash disbursement", "sale", "expense"],
        tranYears: ["select", "2019", "2020", "2021"],
        selectedType: "",
        selectedMonth: "",
        selectedYear: "",
        tranAmount: "",
        tranDescr: "",
        tranDate: "",
        monthCreditTotals: [],
        monthDebitTotals: []
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
    selectYearItemsLoad = (year) => {
        const selectedYear = parseInt(year);
        const selectedItems = this.state.totalbudgetItems.filter(item => item.budget_year == selectedYear)
        console.log(selectedItems)

        this.setState({
            budgetItems: selectedItems
        }, () => {
            this.getCreditTotals()
            this.getDebitTotals()
        });
    }

    selectYearItems = (event) => {
        const selectedYear = parseInt(event.target.value);
        const selectedItems = this.state.totalbudgetItems.filter(item => item.budget_year == selectedYear)
        console.log(selectedItems)

        this.setState({
            budgetItems: selectedItems
        }, () => {
            this.getCreditTotals()
            this.getDebitTotals()
        });
    }

    getCreditTotals = () => {
        console.log("getting credit totals")
        const monthTotals = []
        let distinctMonths = []
        for (var i = 0; i < this.state.budgetItems.length; i++) {
            if (!distinctMonths.includes(this.state.budgetItems[i].budget_month) && parseInt(this.state.budgetItems[i].budget_credit) > 0) {
                distinctMonths.push(this.state.budgetItems[i].budget_month)
            }

        }
        for (var k = 0; k < distinctMonths.length; k++) {
            let month = distinctMonths[k]
            let monthTotal = 0
            for (var j = 0; j < this.state.budgetItems.length; j++) {
                if (this.state.budgetItems[j].budget_month === month) {
                    monthTotal = monthTotal + parseInt(this.state.budgetItems[j].budget_credit)
                }
            }
            monthTotals.push({ month, monthTotal })
        }

        this.setState({
            monthCreditTotals: monthTotals
        });
        console.log(monthTotals)
    }

    getDebitTotals = () => {
        console.log("getting credit totals")
        const monthTotals = []
        let distinctMonths = []
        for (var i = 0; i < this.state.budgetItems.length; i++) {
            if (!distinctMonths.includes(this.state.budgetItems[i].budget_month) && parseInt(this.state.budgetItems[i].budget_debit) > 0) {
                distinctMonths.push(this.state.budgetItems[i].budget_month)
            }

        }
        for (var k = 0; k < distinctMonths.length; k++) {
            let month = distinctMonths[k]
            let monthTotal = 0
            for (var j = 0; j < this.state.budgetItems.length; j++) {
                if (this.state.budgetItems[j].budget_month === month) {
                    monthTotal = monthTotal + parseInt(this.state.budgetItems[j].budget_debit)
                }
            }
            monthTotals.push({ month, monthTotal })
        }

        this.setState({
            monthDebitTotals: monthTotals
        });
        console.log(monthTotals)
    }

    getAccountingItems = () => {
        API.findAccounting()
            .then(res => this.setState({
                totalbudgetItems: res.data
            }))
            .then(res => {
                console.log(this.state.totalbudgetItems)
            })
            .catch(err => console.log(err));
    }

    removeAccountingItem = (item) => {
        console.log("this works")
        let deletedItem = item.target.value
        API.deleteAccounting(deletedItem)
            .then(res => {
                console.log("item deleted")
                let updateTotal = this.state.totalbudgetItems.filter(item => item.id != deletedItem)
                let updatedFiltered = this.state.budgetItems.filter(item => item.id != deletedItem)
                this.setState({
                    totalbudgetItems:updateTotal,
                    budgetItems:updatedFiltered
                })
                this.getCreditTotals();
                this.getDebitTotals();
            })
            .catch(err => console.log(err));
    }

    addAccountingItem = (event) => {
        event.preventDefault();
        console.log("attempting to add item")
        let dmount = ""
        let cmount = ""
        const creditType = ["cash deposit", "sale"]

        if (creditType.includes(this.state.selectedType)) {
            dmount = "0"
            cmount = this.state.tranAmount
        } else {
            dmount = this.state.tranAmount
            cmount = "0"
        }

        var todayDate = new Date().toISOString().slice(0, 10);

        let yearSelect = this.state.selectedYear

        API.postAccounting({
            budget_year: this.state.selectedYear,
            budget_month: this.state.selectedMonth,
            budget_credit: cmount,
            budget_debit: dmount,
            budget_description: this.state.selectedType,
            budget_comment: this.state.tranDescr,
            budget_tran_date: todayDate
        })
            .then(res => {
                console.log(res.data)
                let addItem = {
                    budget_year:res.data.budget_year,
                    budget_month:res.data.budget_month,
                    budget_credit:res.data.budget_credit,
                    budget_debit:res.data.budget_debit,
                    budget_description:res.data.budget_description,
                    budget_comment: res.data.budget_comment,
                    budget_tran_date:res.data.budget_tran_date
                }
                const updateTotal = this.state.totalbudgetItems
                updateTotal.push(addItem)
                const updatedFiltered = this.state.budgetItems
                updatedFiltered.push(addItem)

                this.setState({
                    selectedType: "select",
                    selectedMonth: "select",
                    selectedYear: "select",
                    tranAmount: "",
                    tranDescr: "",
                    totalbudgetItems:updateTotal,
                    budgetItems:updatedFiltered
                }, () => {
                    this.getCreditTotals()
                    this.getDebitTotals()
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="wrapper">
                <div className="col-md-12 table-container">
                    <div className="row">
                        <div>
                            <span className="lbl-sl-year">Year</span>
                            <select className="dropdown-year" defaultValue="" onChange={this.selectYearItems}>
                                {this.state.tranYears.map(year => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 table-hold">
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
                                            remove={this.removeAccountingItem}
                                        />
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-12">
                                    <form className="new-item-accounting">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label className="lbl-new-item">Month</label><br></br>
                                                <select name="selectedMonth" className="dropdown-month" onChange={this.handleInputChange} value={this.state.selectedMonth}>
                                                    {this.state.months.map(month => (
                                                        <option key={month} value={month}>
                                                            {month}
                                                        </option>
                                                    ))}
                                                </select><br></br>
                                                <label className="lbl-new-item">Year</label><br></br>
                                                <select name="selectedYear" className="dropdown-month" onChange={this.handleInputChange} value={this.state.selectedYear}>
                                                    {this.state.tranYears.map(year => (
                                                        <option key={year} value={year}>
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
                                                <label className="lbl-new-item">Description</label><br></br>
                                                <textarea name="tranDescr" className="text-new-item" onChange={this.handleInputChange} value={this.state.tranDescr} required></textarea><br></br>
                                                <input className="btn-submit-item" type="submit" value="submit" onClick={this.addAccountingItem}></input>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-11 text-center graphs">
                                    <div className="row">
                                        <div className="col-md-6 text-center">
                                            <h4 className="graph-head">Cash In</h4>
                                            <VictoryPie
                                                data={
                                                    this.state.monthCreditTotals.map(item => (
                                                        { x: item.month + ' - $' + item.monthTotal, y: parseInt(item.monthTotal) }
                                                    ))}
                                                height={250}
                                                colorScale={["tomato", "orange", "red", "grey", "navy"]}
                                                style={{
                                                    labels: {
                                                        fontSize: 12, fill: "white"
                                                    }
                                                }}

                                            />
                                        </div>
                                        <div className="col-md-6 text-center">
                                            <h4 className="graph-head">Cash Out</h4>
                                            <VictoryPie
                                                data={
                                                    this.state.monthDebitTotals.map(item => (
                                                        { x: item.month + ' - $' + item.monthTotal, y: parseInt(item.monthTotal) }
                                                    ))}
                                                height={250}
                                                colorScale={["purple", "yellow", "red", "black", "navy"]}
                                                style={{
                                                    labels: {
                                                        fontSize: 12, fill: "white"
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Expenses;