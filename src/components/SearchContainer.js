import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { clearFilters, handleChange } from "../slice/allJobsSlice";
import Input from "./Input";
import { Form, Formik } from "formik";
import DropDown from "./DropDown";

const SearchContainer = () => {
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobs);
  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);
  //   console.log('from redux: '+initialFiltersState)
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    // debugger;
    // console.log(e.target.name + " " + e.target.value);
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };
  
  const initialFiltersState = {
    search: search,
    searchStatus: searchStatus,
    searchType: searchType,
    sort: sort,
  };

  return (
    <Wrapper>
      <Formik
        initialValues={initialFiltersState}
        onSubmit={(initialFiltersState, actions) => {
          dispatch(clearFilters());
          actions.resetForm({
            initialFiltersState,
          });
        }}
      >
        {({ setFieldValue }) => (
          <Form className="form">
            <h4>search form Formik</h4>
            <div className="form-center">
              <Input
                type="text"
                name="search"
                onChange={(event) => {
                  handleSearch(event);
                  setFieldValue(event.target.name, event.target.value);
                }}
              />
               {/* search by status */}
              <DropDown
                name="searchStatus"
                labelText="status"
                options={["all", ...statusOptions]}
                onChange={(event) => {
                  handleSearch(event);
                  setFieldValue(event.target.name, event.target.value);
                }}
              />
              {/* search by type */}
              <DropDown
                name="searchType"
                labelText="type"
                options={["all", ...jobTypeOptions]}
                onChange={(event) => {
                  handleSearch(event);
                  setFieldValue(event.target.name, event.target.value);
                }}
              />
               {/* sort */}
              <DropDown
                name="sort"
                options={sortOptions}
                onChange={(event) => {
                  handleSearch(event);
                  setFieldValue(event.target.name, event.target.value);
                }}
              />

              <button
                type="submit"
                className="btn btn-block btn-danger"
                disabled={isLoading}
              >
                clear filters
              </button>
            </div>
          </Form>
        )}
      </Formik>

    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
  h5 {
    font-weight: 700;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`;
export default SearchContainer;
