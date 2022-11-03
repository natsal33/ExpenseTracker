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
      inputs: {
        defaultDate: "",
        defaultCategory: "home",
        defaultDescription: "",
        defaultVendor: "",
        defaultAmount: 100,
      },
    };

    this.datePicker = React.createRef();
    this.inputCategorySelector = React.createRef();
    this.inputDescription = React.createRef();
    this.inputVendor = React.createRef();
    this.inputAmount = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteExpense = this.deleteExpense.bind(this);
    this.getTodaysDate = this.getTodaysDate.bind(this);
    this.updateExpensesLocalStorage =
      this.updateExpensesLocalStorage.bind(this);
    this.updateInputLocalStorage = this.updateInputLocalStorage.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("storedExpenses")) {
      this.expenseData = JSON.parse(localStorage.getItem("storedExpenses"));

      this.setState({
        expenses: this.expenseData,
      });
    }
  }

  getTodaysDate() {
    var dateObj = new Date();
    return (
      dateObj.getFullYear() +
      "-" +
      (dateObj.getMonth() + 1) +
      "-0" +
      dateObj.getDate()
    );
  }

  updateExpensesLocalStorage(newExpenseArray) {
    localStorage.setItem("storedExpenses", JSON.stringify(newExpenseArray));
  }

  updateInputLocalStorage(inputType, inputString) {
    localStorage.setItem(inputType, JSON.stringify(inputString));

    console.log(JSON.parse(localStorage.getItem("amount")));
  }

  handleSubmit(e) {
    var itemArray = [...this.state.expenses];

    if (
      this.inputDescription.current.value !== "" &&
      this.inputVendor.current.value !== "" &&
      this.inputAmount.current.value !== ""
    ) {
      itemArray.unshift({
        key: Date.now(),
        date: this.datePicker.current.value,
        category: this.inputCategorySelector.current.value,
        description: this.inputDescription.current.value,
        vendor: this.inputVendor.current.value,
        amount: parseFloat(this.inputAmount.current.value),
      });
      // console.log(itemArray);
      this.setState({
        expenses: itemArray,
      });
    }
    this.updateExpensesLocalStorage(itemArray);
    e.preventDefault();
  }
  //
  deleteExpense(key) {
    var itemArray = [...this.state.expenses];
    var filteredItems = itemArray.filter(function (item) {
      return item.key !== key;
    });

    this.setState({
      expenses: filteredItems,
    });

    this.updateExpensesLocalStorage(filteredItems);
  }

  render() {
    return (
      <div className="bod">
        <h1 className="d-flex p-2 justify-content-center">
          <Badge bg="light" text="dark">
            Expense Tracker
          </Badge>
        </h1>
        <div className="p-2 mb-4">
          <Form onSubmit={this.handleSubmit}>
            <Row className="d-flex justify-content-evenly">
              <Col
                lg="2"
                md="3"
                sm="4"
                className="d-flex justify-content-center"
              >
                <Form.Control
                  type="date"
                  defaultValue={this.getTodaysDate()}
                  onChange={(e) =>
                    this.updateInputLocalStorage("date", e.target.value)
                  }
                  ref={this.datePicker}
                ></Form.Control>
              </Col>
              <Col
                lg="2"
                md="4"
                sm="4"
                className="d-flex justify-content-center"
              >
                <Form.Select
                  ref={this.inputCategorySelector}
                  id="expenseCategory"
                  name="expenseCategory"
                  onChange={(e) =>
                    this.updateInputLocalStorage("category", e.target.value)
                  }
                  defaultValue={JSON.parse(localStorage.getItem("category"))}
                >
                  <option value="work">Work</option>
                  <option value="home">Home</option>
                  <option value="groceries">Groceries</option>
                  <option value="restaurants">Restaurants</option>
                  <option value="shopping">Shopping</option>
                  <option value="etc">Etc.</option>
                </Form.Select>
              </Col>
              <Col
                lg="2"
                md="5"
                sm="4"
                className="d-flex justify-content-center"
              >
                <Form.Control
                  ref={this.inputVendor}
                  onChange={(e) =>
                    this.updateInputLocalStorage("vendor", e.target.value)
                  }
                  defaultValue={JSON.parse(localStorage.getItem("vendor"))}
                  placeholder="enter vendor"
                ></Form.Control>
              </Col>
              <Col
                lg="3"
                md="6"
                sm="12"
                className="d-flex justify-content-center"
              >
                <Form.Control
                  ref={this.inputDescription}
                  onChange={(e) =>
                    this.updateInputLocalStorage("description", e.target.value)
                  }
                  defaultValue={JSON.parse(localStorage.getItem("description"))}
                  placeholder="enter description"
                ></Form.Control>
              </Col>
              <Col
                lg="2"
                md="4"
                sm="4"
                className="d-flex justify-content-center"
              >
                <Form.Control
                  ref={this.inputAmount}
                  onChange={(e) =>
                    this.updateInputLocalStorage("amount", e.target.value)
                  }
                  defaultValue={parseFloat(
                    JSON.parse(localStorage.getItem("amount"))
                  )}
                  placeholder="enter amount"
                ></Form.Control>
              </Col>
              <Col
                lg="1"
                md="2"
                sm="4"
                className="d-flex justify-content-center"
              >
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
