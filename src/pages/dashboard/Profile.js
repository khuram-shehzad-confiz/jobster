import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUser } from "../../slice/userSlice";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "../../components/Input";

const Profile = () => {
  const { isLoading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    // e.preventDefault();
    console.log(e);
    // debugger
    dispatch(updateUser(e));
  };

  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    lastName: user?.lastName || "",
    location: user?.location || "",

  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    lastName: Yup.string().required("Required!"),
    location: Yup.string().required("Required!"),
  });
  return (
    <Wrapper>
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="form">
          <div className="form-center">
            <Input type="text" name="name" />
            <Input type="text" name="lastName" />
            <Input type="email" name="email" />
            <Input type="text" name="location" />

            <button
              type="submit"
              className="btn btn-block"
              disabled={isLoading}
            >
              {isLoading ? "Please Wait..." : "save changes"}
            </button>
          </div>
        </Form>
      </Formik>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`;
export default Profile;
