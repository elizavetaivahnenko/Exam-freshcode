import React from "react";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { ErrorMessage, useFormikContext } from "formik";
import * as moment from "moment";

const DateInput = ({ name, classes, ...rest }) => {
  const { setFieldValue } = useFormikContext();

  return (
    <div className={classes.container}>
      <DateTime
        dateFormat="DD-MMM-YY"
        timeFormat="hh:mm a"
        inputProps={{ placeholder: "Select date and time" }}
        className={classes.input}
        isValidDate={(current) => {
          return current.isSameOrAfter(moment(), "day");
        }}
        onChange={(date) => setFieldValue(name, date)}
        {...rest}
      />
      <ErrorMessage name={name} component="span" className={classes.warning} />
    </div>
  );
};
export default DateInput;
