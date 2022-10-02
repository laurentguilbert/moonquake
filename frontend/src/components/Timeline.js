import React, { useEffect, useState, useRef } from "react";
import { scaleLinear, scaleTime } from "d3-scale";
import { extent } from "d3-array";
import { line, curveBasis } from "d3-shape";
import { api } from "../services/api";
import dayjs from "dayjs"

import Axis from './Axis.js'
import SVGcontainer from './SVGcontainer.js'
import Brush from './Brush.js'
import {
  useEventsContext,
  setDateRange,
} from "../contexts/EventsContext";
import { EventTypeColor } from '../core/enums';

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

  margins = margins ? margins : { left: 30, top: 20, right: 30, bottom: 50 };

  const innerWidth = width - margins.left - margins.right,
    innerHeight = height - margins.top - margins.bottom,
    selectedEventWidth = "8px"

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

  const SelectedEvent = ({event}) => (
      <rect style={{fill:EventTypeColor[event.type]}} x={xScale(dayjs(event.start_date))} width={selectedEventWidth} height={innerHeight} />
  )

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
          tickFormat={"%Y"}
        />
        <KDEline />
        {
          selectedEvent &&
            <SelectedEvent event={selectedEvent} />
        }
        <Brush 
          width={innerWidth}
          height={innerHeight}
          scale={xScale}
          onEnd={onBrushEnd}
          initialRange={[startDate, endDate]}
        />
      </SVGcontainer>
    </div>
  );
};

export default Timeline;
