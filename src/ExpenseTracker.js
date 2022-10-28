import React, { Component } from "react";
import "./ExpenseTracker.css";
import ExpenseTable from "./ExpenseTable";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

class ExpenseTracker extends Component {
  expenseData;
  constructor(props) {
    super(props);

    this.state = {
      expenses: [],
      form: {
        selectedDate: new Date(),
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
        date: "date",
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
    // console.log(this.state.form.selectedDate);
    return (
      <div className="bod">
        <div>
          <Form onSubmit={this.addExpense}>
            <Row>
              <Col>
                <Form.Control type="date"></Form.Control>
              </Col>
              <Col>
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
              <Col>
                <Form.Control
                  ref={(a) => (this._inputDescription = a)}
                  placeholder="enter description"
                ></Form.Control>
              </Col>
              <Col>
                <Form.Control
                  ref={(a) => (this._inputVendor = a)}
                  placeholder="enter vendor"
                ></Form.Control>
              </Col>
              <Col>
                <Form.Control
                  ref={(a) => (this._inputAmount = a)}
                  placeholder="enter amount"
                ></Form.Control>
              </Col>
              <Col>
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
