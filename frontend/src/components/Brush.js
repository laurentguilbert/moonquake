import brush, { brushX } from 'd3-brush';
import { select } from 'd3-selection';
import { symbol, symbolTriangle } from 'd3-shape';
import React, { useEffect, useRef } from 'react';

const Brush = ({ width, height, scale, onEnd, initialRange, strokeColor }) => {
  const refLeft = useRef(null);
  const refRight = useRef(null);
  const ref = useRef(null);
  const brushStroke = strokeColor ? strokeColor : '#7A7A7A';

  const brushing = ({ selection }) => {
    if (selection) {
      moveHandles(selection);
    }
  };

  let [lower, upper] = initialRange.map((d) => scale(d));
  if (!lower) {
    lower = 0;
  }
  if (!upper) {
    upper = 0;
  }

  const moveHandles = ([lower, upper]) => {
    select(refLeft.current).attr('transform', `translate(${lower}, 0)`);
    select(refRight.current).attr('transform', `translate(${upper}, 0)`);
  };

  const brush = brushX()
    .extent([
      [0, 0],
      [width, height],
    ])
    .handleSize(20)
    .on('start brush end', (event) => brushing(event))
    .on('end', (event) => onEnd(event));

  useEffect(() => {
    if (ref && lower && upper) {
      select(ref.current).call(brush).call(brush.move, [lower, upper]);

      select(ref.current)
        .select('rect.selection')
        .attr('stroke', strokeColor)
        .attr('stroke-width', '3px');

      moveHandles([lower, upper]);
    }
  }, [scale, initialRange]);

  return (
    <g>
      <g ref={refLeft}>
        <line y1={0} y2={height} stroke={brushStroke} strokeWidth={5} />
        <path
          transform={`translate(${-6}, ${height / 2}) rotate(-90)`}
          d={symbol().type(symbolTriangle).size(90)()}
          fill={brushStroke}
        />
      </g>
      <g ref={refRight}>
        <line y1={0} y2={height} stroke={brushStroke} strokeWidth={5} />
        <path
          transform={`translate(${6}, ${height / 2}) rotate(90)`}
          d={symbol().type(symbolTriangle).size(90)()}
          fill={brushStroke}
        />
      </g>
      <g ref={ref}></g>
    </g>
  );
};

export default Brush;
