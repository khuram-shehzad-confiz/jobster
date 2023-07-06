import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStats } from "../../slice/allJobsSlice";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import styled from "styled-components";
import StatItem from "../../components/StatItem";
import Chart from "../../components/Chart";

export const Stats = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStats());
  }, []);

  const { stats, monthlyApplications } = useSelector((store) => store.allJobs);

  const defaultStats = [
    {
      title: "pending applications",
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "interviews scheduled",
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "jobs declined",
      count: stats.declined || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];
  return (
    <>
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
    <Chart data={monthlyApplications}/>
    </>
  );
};

const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1rem;
  }
`;

export default Stats;
