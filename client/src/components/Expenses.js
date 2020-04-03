import React, { Component } from "react";
import API from "../utils/API";
import Table from 'react-bootstrap/Table';
import Item from "./accountItem";
import "./Expenses.css"

class Expenses extends Component {

    state = {
        budgetItems: []
    }

    componentDidMount() {
        this.getAccountingItems()
    }

    getAccountingItems = () => {
        API.findAccounting()
            .then(res => this.setState({
                budgetItems: res.data
            }))
            .then(res => console.log(this.state.budgetItems))
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
                                            <th className="table-head">Date</th>
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
                                TEST AREA FOR EXPENSE CREATION
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