import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class ExpenseTable extends Component {
  constructor(props) {
    super(props);

    this.createExpense = this.createExpense.bind(this);
    this.delete = this.delete.bind(this);

    this.expenseTotal = React.createRef();
    this.expenseTotal.current = Number(0);
    this._selectedDate = new Date();
    this.itemKey = 0;
  }

  componentDidUpdate() {
    this.expenseTotal.current = Number(0);
  }

  delete(key) {
    this.props.delete(key);
  }

  createExpense(item) {
    this.itemKey++;
    this.expenseTotal.current += Number(item.amount);
    return (
      <tr key={this.itemKey}>
        <td>{item.date}</td>
        <td>{item.category}</td>
        <td>{item.description}</td>
        <td>{item.vendor}</td>
        <td>${item.amount}</td>
        <td>
          <Button
            variant="danger"
            size="sm"
            onClick={() => this.delete(item.key)}
            key={item.key}
          >
            X
          </Button>
        </td>
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
                <th>Vendor</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            {expenseTableItems.length === 0 ? (
              <tfoot
                className="text-center"
                style={{
                  fontWeight: "700",
                  fontSize: "16pt",
                }}
              >
                <td></td>
                <td></td>
                <td> Enter your first expense to get started!</td>
                <td></td>
                <td></td>
              </tfoot>
            ) : (
              <tbody>{expenseTableItems}</tbody>
            )}
            <tfoot style={{ fontWeight: "700" }}>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>Total:</td>
                <td>${Math.round(this.expenseTotal.current * 100) / 100}</td>
              </tr>
            </tfoot>
          </Table>
        </Row>
      </div>
    );
  }
}

export default ExpenseTable;
