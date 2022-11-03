import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
        <td>{item.date}</td>
        <td>{item.category}</td>
        <td>{item.description}</td>
        <td>{item.vendor}</td>
        <td>${item.amount}</td>
      </tr>
    );
  }

  render() {
    var expenseEntries = this.props.entries;
    var expenseTableItems = expenseEntries.map(this.createExpense);

    return (
      <div className="d-flex justify-content-center">
        <Row>
          <Col sm="12" md="12" lg="12">
            <h4 className="d-flex justify-content-center p-2">Expense Log </h4>
          </Col>
          <Table striped className="justify-content-center p-2">
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
        </Row>
      </div>
    );
  }
}

export default ExpenseTable;
