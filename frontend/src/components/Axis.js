import React, { useRef, useEffect } from 'react';
import { timeFormat } from "d3-time-format";
import { axisLeft, axisBottom } from 'd3-axis'
import { select } from 'd3-selection'


const Axis = ({ scale, left, top, label, orientation, axisOff, tickFormat }) => {

  const ref = useRef(null);
  const rotate = orientation === "left"
    ? " rotate(-90)"
    : ""

  useEffect(() => {
    const axis = orientation === 'left'
      ? axisLeft(scale) 
      : tickFormat ?
          axisBottom(scale).tickFormat(timeFormat(tickFormat))
          : axisBottom(scale)

    if (axisOff) {
      select(ref.current)
        .call(axis)
        .call(g => select(".domain").remove())
    } else {
      select(ref.current)
        .call(axis)
    }

    select(ref.current)
      .selectAll(".tick text")
      .attr("font-family",'Orbitron')
      .attr("font-weight",'bold');

  }, [scale]);

  return (
    <g transform={`translate(${left}, ${top})`}>
      <g ref={ref}></g>
      {label && label.showLabel &&
        <text fill='currentColor' font-weight='bold' transform={`translate(${label.left}, ${label.top})${rotate}`} style={{textAnchor: "middle" }}>
          {label.text}
        </text>
      }
    </g>
  )
}

export default Axis
