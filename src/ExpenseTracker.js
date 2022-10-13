import React, { Component } from "react";
import "./ExpenseTracker.css";
import ChooseDate from "./chooseDate";
import ExpenseTable from "./ExpenseTable";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class ExpenseTracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expenses: [],
      form: {
        selectedDate: new Date(),
      },
    };

    this.numberOfItems = 0;

    this.addExpense = this.addExpense.bind(this);
    this.deleteExpense = this.deleteExpense.bind(this);
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
      this.numberOfItems++;
      itemArray.unshift({
        key: this.numberOfItems,
        date: this.state.form.selectedDate,
        category: this._inputCategory.value,
        description: this._inputDescription.value,
        vendor: this._inputVendor.value,
        amount: this._inputAmount.value,
      });
      console.log(itemArray);
      this.setState({
        expenses: itemArray,
      });
    }
    // console.log(this.expenses);
    e.preventDefault();
  }

  deleteExpense(key) {
    var filteredItems = this.state.expenses.filter(function (item) {
      return item.key !== key;
    });

    this.setState({
      expenses: filteredItems,
    });
  }

  render() {
    console.log(this.state.form.selectedDate);
    return (
      <div>
        <div>
          <Form onSubmit={this.addExpense}>
            <ChooseDate
              selected={(a) =>
                this.setState({
                  form: { selectedDate: a },
                })
              }
              selectedDate={this.state.form.selectedDate}
            />
            <select
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
            </select>
            <input
              ref={(a) => (this._inputDescription = a)}
              placeholder="enter description"
            ></input>
            <input
              ref={(a) => (this._inputVendor = a)}
              placeholder="enter vendor"
            ></input>
            <input
              ref={(a) => (this._inputAmount = a)}
              placeholder="enter amount"
            ></input>
            <Button type="submit">Submit</Button>
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
