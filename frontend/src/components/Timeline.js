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
  setStartDate,
  setEndDate,
} from "../contexts/EventsContext";

const Timeline = ({ margins }) => {

  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [kdeEvents, setEvents] = useState([])
  const { state, dispatch } = useEventsContext();
  const { startDate, endDate } = state;

  margins = margins 
      ? margins
      : {left: 20, top: 20, right: 20, bottom: 50} 

  const height = 200,
        innerWidth = width - margins.left - margins.right,
        innerHeight = height - margins.top - margins.bottom

  const xScale = scaleTime()
    .domain(extent(kdeEvents, d => d.date))
    .range([margins.left, innerWidth])
    .nice()

  const yScale = scaleLinear()
    .domain(extent(kdeEvents, d => d.y))
    .range([innerHeight, 0])

  const lineGenerator = line()
    .curve(curveBasis)
    .x(d => xScale(d.date))
    .y(d => yScale(d.y));


    const onBrushEnd = ({ selection }) => {
      if (selection) {
        const start = dayjs(xScale.invert(selection[0]));
        const end = dayjs(xScale.invert(selection[1]));
        if (start.diff(startDate)) {
          console.log('updating start')
          // dispatch(setStartDate(start))
        } 
        if (end.diff(endDate)) {
          console.log('updating end')
          // dispatch(setEndDate(end))
        } 
      }
    }

  useEffect(() => {
    api
      .getTimelineDensity()
      .then(({events}) => {
        const parsed_events = events.map(ev => ({...ev, date: dayjs(ev.date)}))
        setEvents(parsed_events)
      });
  }, []);

  useEffect(() => {
    setWidth(ref.current.offsetWidth);
    // setHeight(ref.current.offsetHeight);

    function handleResize() {
      setWidth(ref.current.offsetWidth);
      // setHeight(ref.current.offsetHeight);
    }
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [
    ref.current?.parentElement.offsetWidth,
    // ref.current?.parentElement.offsetHeight,
  ]);

  const KDEline = () => (
      <path 
        fill={"none"}
        strokeWidth={1.5} 
        stroke={"white"} 
        d={lineGenerator(kdeEvents)}
      />
  )
  return (
    <div ref={ref} id="timeline">
      <SVGcontainer width={width} height={height} margins={margins} >
        <Axis 
          left = {0}
          top = {innerHeight}
          label = {{ left: innerWidth/2 , 
                    top: 35, 
                    text: "Time",
                    showLabel: true
                  }}
          scale = {xScale}
          orientation = "bottom"
        />
        <KDEline />
        <Brush 
          width={innerWidth}
          height={innerHeight}
          scale = {xScale}
          onEnd = {onBrushEnd}
          initialRange = {[startDate, endDate]}
        />
      </SVGcontainer>
    </div>
  )

};

export default Timeline;
