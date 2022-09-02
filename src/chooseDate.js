import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ChooseDate() {
  const [startDate, setStartDate] = useState(new Date());
  var chosenDate = (
    <DatePicker
      selected={startDate}
      onChange={(date: Date) => setStartDate(date)}
    />
  );

  console.log(chosenDate);

  return <div>{chosenDate}</div>;
}

export default ChooseDate;
