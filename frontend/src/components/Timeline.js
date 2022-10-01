import React, { useEffect } from "react";

import {
  useMoonContext,
  setStartDate,
} from "../contexts/MoonContext";

const Timeline = () => {

  const { state, dispatch } = useMoonContext();

  useEffect(() => {
    dispatch(setStartDate("somedate"))
  }, []);

  return <div id="timeline"></div>;
};

export default Timeline;
