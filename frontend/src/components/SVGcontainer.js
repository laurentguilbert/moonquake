import React from 'react';

const SVGcontainer = (props) => {
  const { width, height, margins, children } = props
  return (
      <div style={{display: 'inline-block'}}>
        <svg width={width} height={height}>
          <g transform = {`translate(${margins.left}, ${margins.top})`}
             width = {width - margins.left - margins.right}
             height = {height - margins.left - margins.top}
          >
            {children}
          </g>
        </svg>
      </div>
  )
}

export default SVGcontainer
