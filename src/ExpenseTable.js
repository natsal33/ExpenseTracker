import { isCursorAtEnd } from "@testing-library/user-event/dist/utils";
import React, { Component } from "react";
import Table from "react-bootstrap/Table";

class ExpenseTable extends Component {
  constructor(props) {
    super(props);

    this.createExpense = this.createExpense.bind(this);
    this.delete = this.delete.bind(this);

    this._selectedDate = new Date();
  }

  delete(key) {
    this.props.delete(key);
  }

  createExpense(item) {
    return (
      <tr onClick={() => this.delete(item.key)} key={item.key}>
        <td>{item.date.toLocaleDateString()}</td>
        <td>{item.category}</td>
        <td>{item.description}</td>
        <td>{item.vendor}</td>
        <td>{item.amount}</td>
      </tr>
    );
  }

  render() {
    var expenseEntries = this.props.entries;
    var expenseTableItems = expenseEntries.map(this.createExpense);

    return (
      <Table striped>
        <caption>Expense Log</caption>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Vendor</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>{expenseTableItems}</tbody>
      </Table>
    );
  }
}

export default ExpenseTable;
