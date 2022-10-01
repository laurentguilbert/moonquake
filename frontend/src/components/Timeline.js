import { extent, max } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import React, { useEffect } from 'react';

import { useEventsContext } from '../contexts/EventsContext';

const Timeline = () => {
  const { state, dispatch } = useEventsContext();

  return <div id="timeline"></div>;
};

export default Timeline;
