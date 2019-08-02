import React, { useEffect } from "react";
import canvasSketch from "canvas-sketch";
import { renderPolylines } from "canvas-sketch-util/penplot";
import { clipPolylinesToBox } from "canvas-sketch-util/geometry";
import random from "canvas-sketch-util/random";
import { lerp, clamp } from "canvas-sketch-util/math";

const ArtPage = () => {
  const canvasRef = React.createRef();

  useEffect(() => {
    canvasSketch(sketch, {
      canvas: canvasRef.current,
      dimensions: [
        canvasRef.current.getBoundingClientRect().width,
        canvasRef.current.getBoundingClientRect().width
      ],
      units: "px"
    });
  }, []);

  return (
    <div>
      <div
        style={{
          border: "1px solid black",
          width: "100%"
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            display: "block",
            width: "100%"
          }}
        />
      </div>
    </div>
  );
};

// const sketch = () => {
//   return {
//     render: props => {
//       // Destructure what we need from props
//       const { context, width, height } = props;
//       console.log(width, height);

//       // Fill the canvas with pink
//       context.fillStyle = "pink";
//       context.fillRect(0, 0, width, height);

//       // Now draw a white rectangle in the center
//       context.strokeStyle = "white";
//       context.lineWidth = 4;
//       context.strokeRect(width / 4, height / 4, width / 2, height / 2);
//     }
//   };
// };
function createGrid(xCount, yCount) {
  const points = [];
  for (let x = 0; x < xCount; x++) {
    for (let y = 0; y < yCount; y++) {
      const u = xCount <= 1 ? 0.5 : x / (xCount - 1);
      const v = xCount <= 1 ? 0.5 : y / (yCount - 1);
      points.push([u, v]);
    }
  }
  return points;
}

const sketch = ({ width, height }) => {
  let lines = [];
  const margin = Math.min(width, height) * 0.05;

  const cols = 180;
  const rows = Math.round(cols * (11 / 14));
  const points = createGrid(cols, rows).map(point => {
    const [u, v] = point;
    const noise = random.noise2D(u, v, 3, 1);
    const posNoise = clamp(noise, -0.3, 0.3);
    const lerpMargin = margin * 2;
    return {
      position: [
        lerp(lerpMargin, width - lerpMargin, u + posNoise * 0.02),
        lerp(lerpMargin, height - lerpMargin, v + posNoise * 0.06)
      ],
      noise
    };
  });

  // vertical lines
  for (let c = 0; c < cols; c++) {
    let columnLine = [];
    for (let r = 0; r < rows; r++) {
      columnLine.push(points[c * rows + r].position);
    }
    if (c % 2 === 0) {
      columnLine.reverse();
    }
    lines.push(columnLine);
  }

  for (let r = 0; r < rows; r++) {
    let rowLine = [];
    for (let c = 0; c < cols; c++) {
      const point = points[c * rows + r].position;
      rowLine.push(point);
    }
    if (r % 2 === 0) {
      rowLine.reverse();
    }
    lines.push(rowLine);
  }

  const box = [margin, margin, width - margin, height - margin];
  lines = clipPolylinesToBox(lines, box);
  return props => renderPolylines(lines, props);
};

export default ArtPage;
