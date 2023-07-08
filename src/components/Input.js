import React from 'react'
import {  Field, ErrorMessage } from 'formik'
import TextError from './TextError'
const Input = (props) => {

    const {label, name, ...rest}=props
  return (
    <div className='form-row'>
        <label htmlFor={name} className='form-label'>
          {label || name}
        </label>
        <Field className='form-input' id={name} name={name} {...rest} />

        <ErrorMessage name={name} component={TextError}/>
    </div>
  )
}

export default Input