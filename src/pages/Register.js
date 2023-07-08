import React, { useState, useEffect } from "react";
import Logo from "../components/Logo";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../slice/userSlice";
import { useNavigate } from "react-router-dom";
import { Form, Formik, useFormikContext, validateYupSchema } from "formik";
import Input from "../components/Input";
import * as Yup from "yup";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

function Register() {
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (values) => {
    // console.log(e.target)
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please fill out all fields");
      //   alert('Please fill out all fields')
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [user]);

  const schemaValidation = Yup.object({
    isMember: Yup.boolean(),
    name: Yup.string().when("isMember", {
      is: false,
      then: () => Yup.string().required("Required"),
    }),
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });
  return (
    <Wrapper className="full-page">
      <Formik
        initialValues={initialState}
        validationSchema={schemaValidation}
        onSubmit={onSubmit}
      >
       
        {({ values, setFieldValue }) => (
 <Form className="form">
 <Logo />
 <h3>{values.isMember ? "Login" : "Register"}</h3>
 {/* name field */}
 {!values.isMember && (
   <Input type="text" name="name" />
 )}
 {/* email field */}
 <Input type="email" name="email" />

 <Input type="password" name="password" />


 <button type="submit" className="btn btn-block" disabled={isLoading}>
   {isLoading ? "loading..." : "submit"}
 </button>
 <p>
   {values.isMember ? "Not a member yet?" : "Already a member?"}
   {/* <button type="button" onClick={toggleMember(values, setFieldValue)} className="member-btn"> */}
   <button type="button" onClick={()=>{
    setFieldValue('isMember', !values.isMember)
   }} className="member-btn">

     {values.isMember ? "Register" : "Login"}
   </button>
 </p>
</Form>
           )}
       
      </Formik>

      {/* <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>

        
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? "loading..." : "submit"}
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form> */}
    </Wrapper>
  );
}
const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }
  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;

export default Register;
