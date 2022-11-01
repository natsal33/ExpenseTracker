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

    var dateObj = new Date();
    var todaysDate =
      dateObj.getFullYear() + "-" + dateObj.getMonth() + "-" + dateObj.getDay();

    this.state = {
      expenses: [],
      form: {
        selectedDate: todaysDate,
        _inputCategory: "",
        _inputDescription: "",
        _inputVendor: "",
        _inputAmount: "",
      },
    };

    this.datePicker = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(e) {
    var itemArray = this.state.expenses;
    console.log(this.datePicker.current.value);
    console.log(this.state.form.selectedDate);

    if (
      this.state.form._inputDescription !== "" &&
      this.state.form._inputVendor !== "" &&
      this.state.form._inputAmount !== ""
    ) {
      console.log("made it into if statement!");
      itemArray.unshift({
        key: Date.now(),
        date: "date",
        category: this.state.form._inputCategory,
        description: this.state.form._inputDescription,
        vendor: this.state.form._inputVendor,
        amount: this.state.form._inputAmount,
      });
      // console.log(itemArray);
      this.setState({
        expenses: itemArray,
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
        <div className="p-2 mb-4">
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col>
                <Form.Control
                  type="date"
                  defaultValue={this.state.form.selectedDate}
                  ref={this.datePicker}
                ></Form.Control>
              </Col>
              <Col>
                <Form.Select
                  ref={(a) => this.state.form.setState({ _inputType: a })}
                  id="expenseType"
                  name="expenseType"
                  defaultValue="home"
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
                  ref={(a) =>
                    this.state.form.setState({ _inputDescription: a })
                  }
                  placeholder="enter description"
                ></Form.Control>
              </Col>
              <Col>
                <Form.Control
                  ref={(a) => this.state.form.setState({ _inputVendor: a })}
                  placeholder="enter vendor"
                ></Form.Control>
              </Col>
              <Col>
                <Form.Control
                  ref={(a) => this.state.form.setState({ _inputAmount: a })}
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
