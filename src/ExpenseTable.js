import React, { Component } from "react";

class ExpenseTable extends Component {
  constructor(props) {
    super(props);

    this.createExpense = this.createExpense.bind(this);
  }

  delete(key) {
    this.props.delete(key);
  }

  createExpense(item) {
    return (
      <li onClick={() => this.delete(item.key)} key={item.key}>
        listy item
      </li>
    );
  }

  render() {
    var expenseEntries = this.props.entries;
    var listItems = expenseEntries.map(this.createExpense);
    // console.log(listItems);

    return <ul className="expenseList">{listItems}</ul>;
  }
}

export default ExpenseTable;
