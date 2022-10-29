import React, { Component } from "react";
import "./ExpenseTracker.css";
import ExpenseTable from "./ExpenseTable";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";

class ExpenseTracker extends Component {
  expenseData;
  constructor(props) {
    super(props);

    this.state = {
      expenses: [],
      form: {
        selectedDate: "x",
      },
    };

    this.addExpense = this.addExpense.bind(this);
    this.deleteExpense = this.deleteExpense.bind(this);
  }

  componentDidMount() {
    this.expenseData = JSON.parse(localStorage.getItem("storedExpenses"));

    if (localStorage.getItem("storedExpenses")) {
      this.setState({
        expenses: this.expenseData,
      });
    }
  }

  updateLocalStorage(newExpenseArray) {
    localStorage.clear();
    localStorage.setItem("storedExpenses", JSON.stringify(newExpenseArray));
  }

  addExpense(e) {
    // console.log("in addExpense method");
    var itemArray = this.state.expenses;
    // console.log(this.state.form.selectedDate);

    if (
      this._inputCategory.value !== "" &&
      this._inputDescription.value !== "" &&
      this._inputVendor.value !== "" &&
      this._inputAmount.value !== "" &&
      this.state.form.selectedDate !== ""
    ) {
      itemArray.unshift({
        key: Date.now(),
        date: this.state.form.selectedDate.toLocaleDateString(),
        category: this._inputCategory.value,
        description: this._inputDescription.value,
        vendor: this._inputVendor.value,
        amount: this._inputAmount.value,
      });
      // console.log(itemArray);
      this.setState({
        expenses: itemArray,
        form: {
          selectedDate: new Date(),
        },
      });
    }
    this.updateLocalStorage(itemArray);
    e.preventDefault();
  }
  //
  deleteExpense(key) {
    var filteredItems = this.state.expenses.filter(function (item) {
      return item.key !== key;
    });

    this.setState({
      expenses: filteredItems,
    });

    this.updateLocalStorage(filteredItems);
  }

  render() {
    return (
      <div className="bod">
        <h1 className="d-flex p-2 justify-content-center">
          <Badge bg="light" text="dark">
            Expense Tracker
          </Badge>
        </h1>
        <div className="p-2 mb-4 d-flex justify-content-center">
          <Form onSubmit={this.addExpense}>
            <Row>
              <Col lg="2" md="4" sm="4">
                <Form.Control
                  type="date"
                  defaultValue={"2022-10-28"}
                  // onChange={(e) => {
                  //   console.log(e.target.value);
                  //   this.setState({
                  //     form: {
                  //       selectedDate: e.target.value,
                  //     },
                  //   });
                  //   e.preventDefault();
                  // }}
                ></Form.Control>
              </Col>
              <Col lg="2" md="4" sm="4">
                <Form.Select
                  ref={(a) => (this._inputCategory = a)}
                  id="expenseType"
                  name="expenseType"
                  defaultValue="work"
                >
                  <option value="work">Work</option>
                  <option value="home">Home</option>
                  <option value="groceries">Groceries</option>
                  <option value="restaurants">Restaurants</option>
                  <option value="shopping">Shopping</option>
                  <option value="etc">Etc.</option>
                </Form.Select>
              </Col>
              <Col lg="2" md="4" sm="4">
                <Form.Control
                  ref={(a) => (this._inputVendor = a)}
                  placeholder="vendor"
                ></Form.Control>
              </Col>
              <Col lg="3" md="8">
                <Form.Control
                  ref={(a) => (this._inputDescription = a)}
                  placeholder="description"
                ></Form.Control>
              </Col>
              <Col lg="2" md="4">
                <Form.Control
                  ref={(a) => (this._inputAmount = a)}
                  placeholder="amount"
                ></Form.Control>
              </Col>
              <Col lg="1">
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </Form>
        </div>
        <ExpenseTable
          entries={this.state.expenses}
          delete={this.deleteExpense}
        />
      </div>
    );
  }
}

export default ExpenseTracker;
