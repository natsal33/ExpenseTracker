import React, { Component } from "react";
import "./ExpenseTracker.css";
import ChooseDate from "./chooseDate";
import ExpenseItems from "./ExpenseTable";

class ExpenseTracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expenses: [],
    };

    this.numberOfItems = 0;
    this._inputType = "";
    this._inputDescription = "";
    this._inputAmount = "";
    this._selectedDate = "";

    this.addExpense = this.addExpense.bind(this);
    this.deleteExpense = this.deleteExpense.bind(this);
    this.dateSelected = new Date();
  }

  addExpense(e) {
    // console.log("in addExpense method");
    var itemArray = this.state.expenses;
    console.log(this._selectedDate);

    if (
      this._inputType.value !== "" &&
      this._inputDescription.value !== "" &&
      this._inputAmount.value !== "" &&
      this._selectedDate !== ""
    ) {
      console.log("inside if statement");
      this.numberOfItems++;
      itemArray.unshift({
        key: this.numberOfItems,
        type: this._inputType.value,
        description: this._inputDescription.value,
        amount: this._inputAmount.value,
      });
      this.setState({
        expenses: itemArray,
      });
      this._inputType.value = "";
      this._inputDescription.value = "";
      this._inputAmount.value = "";
    }

    e.preventDefault();
    console.log("made it");
  }

  deleteExpense(key) {
    console.log("in deleteExpense method");
    var filteredItems = this.state.expenses.filter(function (item) {
      return item.key !== key;
    });

    this.setState({
      expenses: filteredItems,
    });
  }

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.addExpense}>
            <ChooseDate selected={(a) => (this._selectedDate = a)} />
            <input
              ref={(a) => (this._inputType = a)}
              placeholder="enter type"
            ></input>
            <input
              ref={(a) => (this._inputDescription = a)}
              placeholder="enter description"
            ></input>
            <input
              ref={(a) => (this._inputAmount = a)}
              placeholder="enter amount"
            ></input>
            <button type="submit">Submit</button>
          </form>
        </div>
        <ExpenseItems entries={this.state.expenses} />
      </div>
    );
  }
}

export default ExpenseTracker;
