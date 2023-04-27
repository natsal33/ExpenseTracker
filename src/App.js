import React, { Component } from "react";
import "./App.css";
import ExpenseTable from "./ExpenseTable";
import Badge from "react-bootstrap/Badge";
import InputForm from "./InputForm";

class App extends Component {
  expenseData;
  constructor(props) {
    super(props);

    this.state = {
      expenses: [],
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

  handleSubmit(e) {
    var itemArray = [...this.state.expenses];
    const date = new Date();
    const formattedDate =
      date.getFullYear() +
      "-" +
      ((date.getMonth() + 1).toString().length !== 2
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      "-" +
      (date.getDate().toString().length !== 2
        ? "0" + date.getDate()
        : date.getDate());

    itemArray.unshift({
      key: Date.now(),
      date: this.datePicker.current.value,
      category: this.inputCategorySelector.current.value,
      description: this.inputDescription.current.value,
      vendor: this.inputVendor.current.value,
      amount: this.inputAmount.current.value,
    });
    this.setState({
      expenses: itemArray,
    });
    this.updateExpensesLocalStorage(itemArray);
    this.datePicker.current.value = formattedDate;
    this.inputCategorySelector.current.value = "Work";
    this.inputDescription.current.value = "";
    this.inputVendor.current.value = "";
    this.inputAmount.current.value = "";
    e.preventDefault();
  }

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
        <InputForm
          handleSubmit={this.handleSubmit}
          getTodaysDate={this.getTodaysDate}
          datePicker={this.datePicker}
          inputCategorySelector={this.inputCategorySelector}
          inputVendor={this.inputVendor}
          inputDescription={this.inputDescription}
          inputAmount={this.inputAmount}
        />
        <ExpenseTable
          entries={this.state.expenses}
          delete={this.deleteExpense}
        />
      </div>
    );
  }
}

export default App;
