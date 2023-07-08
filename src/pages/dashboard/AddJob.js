import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  clearValues,
  createJob,
  editJob,
  handleChange,
} from "../../slice/jobSlice";
import { Form, Formik } from "formik";
import Input from "../../components/Input";
import DropDown from "../../components/DropDown";
const AddJob = (props) => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleSubmit = (e, actions) => {
    // e.preventDefault();
    console.log(e);
    // debugger
    if (!e.position || !e.company || !e.jobLocation) {
      toast.error("Please Fill Out All Fields");
      return;
    }
    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: e,
        })
      )
        .unwrap()
        .then(() => {
          console.log("API success");
          actions.setSubmitting(false);
          actions.resetForm({
            values: {
              position: "",
              company: "",
              jobLocation: "",
              jobType: "full-time",
              status: "pending",
            },
          });
        })
        .catch((error) => {
          console.error("API call failed:", error);
        });
      return;
    } else {
      dispatch(createJob(e))
        .unwrap()
        .then(() => {
          console.log("API success");
          actions.setSubmitting(false);
          actions.resetForm();
        })
        .catch((error) => {
          // Handle API call error if needed
          console.error("API call failed:", error);
        });
    }
    // resetForm();
  };
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  const initialState = {
    position: position,
    company: company,
    jobLocation: jobLocation,
    status: status,
    jobType: jobType,
  };
  return (
    <Wrapper>
      <Formik
        initialValues={initialState}
        //  validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, resetForm }) => (
          <Form className="form">
            <h3>{isEditing ? "edit job" : "add job"}</h3>
            <div className="form-center">
              {/* position */}
              <Input
                type="text"
                name="position"
                onChange={(event) => {
                  handleJobInput(event);
                  setFieldValue(event.target.name, event.target.value);
                }}
              />
              {/* company */}
              <Input
                type="text"
                name="company"
                onChange={(event) => {
                  handleJobInput(event);
                  setFieldValue(event.target.name, event.target.value);
                }}
              />
              {/* location */}
              <Input
                type="text"
                name="jobLocation"
                label="job location"
                onChange={(event) => {
                  handleJobInput(event);
                  setFieldValue(event.target.name, event.target.value);
                }}
              />
              <DropDown
                name="status"
                options={statusOptions}
                onChange={(event) => {
                  handleJobInput(event);
                  setFieldValue(event.target.name, event.target.value);
                }}
              />
              <DropDown
                options={jobTypeOptions}
                name="jobType"
                labelText="job type"
                onChange={(event) => {
                  handleJobInput(event);
                  setFieldValue(event.target.name, event.target.value);
                }}
              />
              {/* btn container */}
              <div className="btn-container">
                <button
                  type="reset"
                  className="btn btn-block clear-btn"
                  onClick={resetForm}
                >
                  clear
                </button>
                <button
                  type="submit"
                  className="btn btn-block submit-btn"
                  disabled={isLoading}
                >
                  submit
                </button>
              </div>
            </div>
          </Form>
        )}
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

export default AddJob;
