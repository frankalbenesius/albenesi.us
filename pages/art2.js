import React from "react";
import palette from "../util/palette";

const size = 10000;
const strokeWidth = size / 1000;
const lineCount = Math.floor(size / 80);

function distance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

class Art extends React.Component {
  state = {};
  render() {
    return (
      <g>
        <line
          x1={0}
          y1={size / 2}
          x2={size}
          y2={size / 2}
          stroke={palette.orange[6]}
          strokeWidth={strokeWidth}
        />
      </g>
    );
  }
}

export default () => (
  <div>
    <div className="svg-wrapper">
      <svg viewBox={`0 0 ${size} ${size}`}>
        <rect // background color
          x={0}
          y={0}
          width={size}
          height={size}
          fill={palette.white}
        />
        <Art />
      </svg>
    </div>
    <style jsx>{`
      .svg-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${palette.black};
      }
      .svg-wrapper svg {
        padding: 1em;
        width: 100vmin;
        height: 100vmin;
      }
    `}</style>
  </div>
);
