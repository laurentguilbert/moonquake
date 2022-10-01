import React, { useEffect } from "react";
import { scaleLinear } from 'd3-scale';
import { max, extent } from 'd3-array';

import {
  useMoonContext,
  setStartDate,
  setEndDate,
} from "../contexts/MoonContext";

const Timeline = () => {

  const { state, dispatch } = useMoonContext();

  useEffect(() => {
    dispatch(setStartDate("somedate"))
  }, []);

  return <div id="timeline"></div>;
};

export default Timeline;
