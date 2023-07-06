import React from 'react'
import JobsContainer from '../../components/JobsContainer'
import SearchContainer from '../../components/SearchContainer'
import Pagination from '../../components/Pagination'

const AllJobs = () => {
  return (
    <>
    <SearchContainer/>
    <JobsContainer/>
    <Pagination/>
    </>
  )
}

export default AllJobs