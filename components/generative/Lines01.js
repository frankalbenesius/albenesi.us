import React from "react";
import palette from "../../util/palette";

const width = 1000;
const height = 1000;

const toPath = xs => `M${xs[0]}`;
const toCoordinate = (x, i, xs) => `${x} ${(height / (xs.length - 1)) * i}`;

const Line = ({ xs, color = palette.black, stroke = 1 }) => {
  const yDelta = height / (xs.length - 1);
  const [x0, ...xRest] = xs;
  const M = `M ${x0} 0`;
  const controlPoint = {
    x: x0,
    y: yDelta
  };
  const Q = `Q ${controlPoint.x} ${controlPoint.y}, `;
  const restPoints = xRest.map((x, i) => `${x} ${yDelta * (i + 1)}`);
  const d = `${M} ${Q} ${restPoints.join(" T ")}`;
  return (
    <g>
      <path
        d={d}
        fill="transparent"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
      />
      {/* <circle
        cx={controlPoint.x}
        cy={controlPoint.y}
        r="5"
        fill={palette.blue[5]}
      /> */}
    </g>
  );
};

const wiggle = (x, factor = 0.05) => {
  const range = factor * 2;
  const base = 1.1 - factor;
  return x * (Math.random() * range + base);
};
const createLineData = (acc, line, i, lines) => {
  const n = lines.length;
  const vertices = n * 2;
  const deltaX = width / n;
  const traceLine = i < 1 ? Array(vertices).fill(0) : acc[i - 1];
  const newLine = traceLine.map(x => x + wiggle(deltaX));
  acc.push(newLine);
  return acc;
};

class Lines extends React.Component {
  state = {
    lines: []
  };
  componentDidMount() {
    const n = this.props.n;
    const lines = Array(n)
      .fill([])
      .reduce(createLineData, []);
    this.setState({
      lines
    });
  }
  render() {
    const deltaY = height / (this.props.n - 1);
    return this.state.lines.map((line, i) => {
      return (
        <g key={i}>
          {/* <line
            x1={0}
            y1={deltaY * i}
            x2={width}
            y2={deltaY * i}
            stroke={palette.black}
          /> */}
          <Line xs={line} color={this.props.color} stroke={this.props.stroke} />
        </g>
      );
    });
  }
}

const ArtBoard = ({ children, background = palette.white }) => (
  <div className="svg-wrapper">
    <svg viewBox={`50 50 ${width - 50} ${height - 50}`}>
      <rect // background color
        x={0}
        y={0}
        width={width}
        height={height}
        fill={background}
      />
      {children}
    </svg>

    <style jsx>{`
      .svg-wrapper {
        border: 0.25rem solid ${palette.black};
        margin: 1rem 0;
      }
      svg {
        display: block;
      }
    `}</style>
  </div>
);

export default () => (
  <div>
    <h1>Lines01</h1>
    <ArtBoard>
      <Lines n={20} stroke={1} color={palette.black} />
    </ArtBoard>
    <ArtBoard background={palette.black}>
      <Lines n={20} color={palette.red[5]} stroke={2} />
    </ArtBoard>
    <ArtBoard background={palette.red[9]}>
      <Lines n={10} color={palette.red[4]} stroke={2} />
    </ArtBoard>
  </div>
);
