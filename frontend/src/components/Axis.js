import React, { useRef, useEffect } from 'react';
import { timeFormat } from "d3-time-format";
import { axisLeft, axisBottom } from 'd3-axis'
import { select } from 'd3-selection'


const Axis = ({ scale, left, top, label, orientation }) => {

  const ref = useRef(null);
  const rotate = orientation === "left"
    ? " rotate(-90)"
    : ""

  useEffect(() => {
    const axis = orientation === 'left'
      ? axisLeft(scale) 
      : axisBottom(scale).tickFormat(timeFormat("%m/%Y"))

    select(ref.current)
      .call(axis)

  }, [scale]);

  return (
    <g transform={`translate(${left}, ${top})`}>
      <g ref={ref}></g>
      {label && label.showLabel &&
        <text fill='currentColor' transform={`translate(${label.left}, ${label.top})${rotate}`} style={{textAnchor: "middle" }}>
          {label.text}
        </text>
      }
    </g>
  )
}

export default Axis
