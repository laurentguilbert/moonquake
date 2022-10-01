import React, { useRef, useEffect } from 'react';

import brush, { brushX } from 'd3-brush';
import { select } from 'd3-selection';
import { symbol, symbolTriangle } from 'd3-shape'

const Brush = ({ width, height, scale, onEnd, initialRange }) => {

  const refLeft = useRef(null);
  const refRight = useRef(null);
  const ref = useRef(null);

    const brushing = ({ selection }) => {
      if (selection) {
        moveHandles(selection)
      }
    }

    let [lower, upper] = initialRange.map(d => scale(d))
    if (!lower) {
      lower = 0
    }
    if (!upper) {
      upper = 0
    }

    const moveHandles = ([lower, upper]) => {
      select(refLeft.current).attr("transform", `translate(${lower}, 0)`)
      select(refRight.current).attr("transform", `translate(${upper}, 0)`)
    }

    const brush = brushX()
      .extent([[0, 0], [width, height]])
      .handleSize(20)
      .on("start brush end", (event) => brushing(event))
      .on("end", (event) => onEnd(event))

    useEffect(() => {
      select(ref.current)
        .call(brush)
        .call(brush.move, [lower, upper])
      moveHandles([lower, upper])
    }, [scale, initialRange]);

  return (
    <g>
      <g ref={refLeft}>
        <line y1={0} y2={height} stroke={"#7A7A7A"} strokeWidth={5}/>
        <path transform={`translate(${-6}, ${height/2}) rotate(-90)`} 
              d = {symbol().type(symbolTriangle).size(90)()} 
              fill = {"#7A7A7A"}
        />
      </g>
      <g ref={refRight}>
        <line y1={0} y2={height} stroke={"#7A7A7A"} strokeWidth={5}/>
        <path transform={`translate(${6}, ${height/2}) rotate(90)`} 
              d = {symbol().type(symbolTriangle).size(90)()} 
              fill = {"#7A7A7A"}
        />
      </g>
      <g ref={ref}></g>
    </g>
  )
}

export default Brush
