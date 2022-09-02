import React, { Component, useState } from "react";
import "./ExpenseTracker.css";
import ChooseDate from "./chooseDate";

class ExpenseTracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expenseItems: [],
    };

    this.dateSelected = new Date();
  }

  addExpense(e) {
    var expenseArray = this.state.expenseItems;
  }

  render() {
    return (
      <div>
        <ChooseDate
          onSelect={(date) => (dateSelected = this.props.selected.getDate())}
        />
        <input
          ref={(a) => this._inputElement}
          placeholder="expense type"
        ></input>
        <input
          ref={(a) => this._inputElement}
          placeholder="expense type"
        ></input>
        <input
          ref={(a) => this._inputElement}
          placeholder="expense type"
        ></input>
        <button type="submit">Add Item</button>
      </div>
    );
  }
}

export default ExpenseTracker;
