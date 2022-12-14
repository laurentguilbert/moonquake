import { extent } from 'd3-array';
import { scaleLinear, scaleTime } from 'd3-scale';
import { curveBasis, line } from 'd3-shape';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';

import { setDateRange, useEventsContext } from '../contexts/EventsContext';
import { EventTypeColor } from '../core/enums';
import { api } from '../services/api';
import Axis from './Axis.js';
import Brush from './Brush.js';
import SVGcontainer from './SVGcontainer.js';

const Timeline = ({ margins }) => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [kdeEvents, setEvents] = useState([]);
  const { state, dispatch } = useEventsContext();
  const { startDate, endDate, selectedEvent } = state;

  useEffect(() => {
    api.getTimelineDensity().then(({ events }) => {
      const parsed_events = events.map((ev) => ({
        ...ev,
        date: dayjs(ev.date),
      }));
      setEvents(parsed_events);
    });
  }, []);

  useEffect(() => {
    setWidth(ref.current.offsetWidth);
    setHeight(ref.current.offsetHeight);

    function handleResize() {
      setWidth(ref.current.offsetWidth);
      setHeight(ref.current.offsetHeight);
    }
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [
    ref.current?.parentElement.offsetWidth,
    ref.current?.parentElement.offsetHeight,
  ]);

  margins = margins ? margins : { left: 20, top: 30, right: 40, bottom: 70 };

  const innerWidth = width - margins.left - margins.right,
    innerHeight = height - margins.top - margins.bottom,
    selectedEventWidth = '4px';

  const xScale = scaleTime()
    .domain(extent(kdeEvents, (d) => d.date))
    .range([margins.left, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(kdeEvents, (d) => d.y))
    .range([innerHeight, 0]);

  const lineGenerator = line()
    .curve(curveBasis)
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.y));

  const onBrushEnd = ({ selection }) => {
    if (selection) {
      const start = dayjs(xScale.invert(selection[0]));
      const end = dayjs(xScale.invert(selection[1]));
      let need_update = false;
      if (start.diff(startDate)) {
        need_update = true;
      }
      if (end.diff(endDate)) {
        need_update = true;
      }
      if (need_update) {
        dispatch(setDateRange([start, end]));
      }
    }
  };

  const KDEline = () => (
    <path
      fill={'none'}
      strokeWidth={1.5}
      stroke={'white'}
      d={lineGenerator(kdeEvents)}
    />
  );

  const SelectedEvent = ({ event }) => (
    <rect
      style={{ fill: EventTypeColor[event.type] }}
      x={xScale(dayjs(event.start_date))}
      width={selectedEventWidth}
      height={innerHeight}
    />
  );

  return (
    <div ref={ref} id="timeline">
      <SVGcontainer width={width} height={height} margins={margins}>
        <Axis
          left={0}
          top={innerHeight}
          label={{
            left: innerWidth / 2,
            top: 35,
            text: 'Seismic activity over time',
            showLabel: true,
          }}
          scale={xScale}
          orientation="bottom"
          axisOff={true}
          tickFormat={'%Y'}
        />
        <KDEline />
        {selectedEvent && <SelectedEvent event={selectedEvent} />}
        <Brush
          width={innerWidth}
          height={innerHeight}
          scale={xScale}
          onEnd={onBrushEnd}
          initialRange={[startDate, endDate]}
          strokeColor={'#57558c'}
        />
      </SVGcontainer>
    </div>
  );
};

export default Timeline;
