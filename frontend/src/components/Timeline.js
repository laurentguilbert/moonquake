import React, { useEffect } from "react";

import { useEventsContext, setStartDate } from "../contexts/EventsContext";

const Timeline = () => {
  const { state, dispatch } = useEventsContext();

  return <div id="timeline"></div>;
};

export default Timeline;
