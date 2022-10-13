import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ChooseDate(props) {
  var chosenDate = (
    <DatePicker selected={props.selectedDate} onChange={props.selected} />
  );

  //   console.log(chosenDate);

  return <div>{chosenDate}</div>;
}
