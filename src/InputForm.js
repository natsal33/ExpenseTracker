import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

class InputForm extends Component {
  constructor(props) {
    super(props);

    this.getTodaysDate = this.getTodaysDate.bind(this);
  }

  getTodaysDate() {
    var date = new Date();

    return (
      date.getFullYear() +
      "-" +
      ((date.getMonth() + 1).toString().length != 2
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      "-" +
      (date.getDate().toString().length != 2
        ? "0" + date.getDate()
        : date.getDate())
    );
  }

  render() {
    return (
      <div className="p-2 mb-4">
        <Form onSubmit={this.props.handleSubmit}>
          <Row className="d-flex justify-content-evenly">
            <Col lg="2" md="3" sm="4" className="d-flex justify-content-center">
              <Form.Control
                required
                type="date"
                defaultValue={this.getTodaysDate()}
                ref={this.props.datePicker}
              ></Form.Control>
            </Col>
            <Col lg="2" md="4" sm="4" className="d-flex justify-content-center">
              <Form.Select
                ref={this.props.inputCategorySelector}
                id="expenseCategory"
                name="expenseCategory"
                defaultValue="Work"
              >
                <option value="Work">Work</option>
                <option value="Home">Home</option>
                <option value="Groceries">Groceries</option>
                <option value="Restaurants">Restaurants</option>
                <option value="Shopping">Shopping</option>
                <option value="Etc.">Etc.</option>
              </Form.Select>
            </Col>
            <Col lg="2" md="5" sm="4" className="d-flex justify-content-center">
              <Form.Control
                required
                ref={this.props.inputVendor}
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
                ref={this.props.inputDescription}
                placeholder="enter description"
              ></Form.Control>
            </Col>
            <Col lg="2" md="4" sm="4" className="d-flex justify-content-center">
              <Form.Control
                required
                ref={this.props.inputAmount}
                placeholder="enter amount"
                type="number"
                step={0.01}
              ></Form.Control>
            </Col>
            <Col lg="1" md="2" sm="4" className="d-flex justify-content-center">
              <Button type="submit">Submit</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default InputForm;
