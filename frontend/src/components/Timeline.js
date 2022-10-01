import React, { useEffect } from "react";
import { scaleLinear } from "d3-scale";
import { max, extent } from "d3-array";

import { useEventsContext } from "../contexts/EventsContext";

const Timeline = () => {
  const { state, dispatch } = useEventsContext();

  return <div id="timeline"></div>;
};

export default Timeline;
