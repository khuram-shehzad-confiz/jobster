import React, { useEffect } from "react";
import JobsContainer from "../../components/JobsContainer";
import SearchContainer from "../../components/SearchContainer";
import Pagination from "../../components/Pagination";
import Modal from "../../components/Modal";
import { useSelector } from "react-redux";

const AllJobs = () => {
  const { isDeleting } = useSelector((store) => store.job);

  //   console.log('isDeleting '+isDeleting)

  return (
    <>
      {isDeleting && <Modal />}
      <SearchContainer />
      <JobsContainer />
      <Pagination />
    </>
  );
};

export default AllJobs;
