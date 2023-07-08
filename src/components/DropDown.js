import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
const DropDown = ({ labelText, name, options, ...rest }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>

      <Field
        as="select"
        className="form-select"
        name={name}
        id={name}
        {...rest}
      >
        {options.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name} component={TextError}/>
    </div>
  );
};

export default DropDown;
