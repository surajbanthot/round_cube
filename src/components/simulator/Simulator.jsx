import React, { useState } from "react";
import "./simulator.css";
const directions = ["NORTH", "EAST", "SOUTH", "WEST"];

const Simulator = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    f: "NORTH",
    placed: false,
  });

  const placeRobot = (x, y, f) => {
    if (x >= 0 && x <= 4 && y >= 0 && y <= 4) {
      setPosition({ x, y, f, placed: true });
    }
  };

  const moveRobot = () => {
    if (!position.placed) return;
    const { x, y, f } = position;
    let newX = x;
    let newY = y;
    switch (f) {
      case "NORTH":
        newY = y < 4 ? y + 1 : y;
        break;
      case "EAST":
        newX = x < 4 ? x + 1 : x;
        break;
      case "SOUTH":
        newY = y > 0 ? y - 1 : y;
        break;
      case "WEST":
        newX = x > 0 ? x - 1 : x;
        break;
      default:
        break;
    }
    setPosition({ ...position, x: newX, y: newY });
  };

  const rotateRobot = (direction) => {
    if (!position.placed) return;
    const currentDirectionIndex = directions.indexOf(position.f);
    if (direction === "LEFT") {
      const newDirection = (currentDirectionIndex - 1 + 4) % 4;
      setPosition({ ...position, f: directions[newDirection] });
    } else if (direction === "RIGHT") {
      const newDirection = (currentDirectionIndex + 1) % 4;
      setPosition({ ...position, f: directions[newDirection] });
    }
  };

  const reportPosition = () => {
    if (!position.placed) return;
    alert(`Output: ${position.x},${position.y},${position.f}`);
  };

 const renderGrid = () => {
   let grid = [];
   for (let row = 4; row >= 0; row--) {
     for (let col = 0; col < 5; col++) {
       grid.push(
         <div className="cell" key={`${row},${col}`}>
           {position.placed && position.x === col && position.y === row && (
             <div className="robot"></div>
           )}
         </div>
       );
     }
   }
   return grid;
 };

  return (
    <div className="robot-simulator">
      <h2>Toy Robot Simulator</h2>
      <div className="controls">
        <input type="number" placeholder="X coordinate" id="xCoord" />
        <input type="number" placeholder="Y coordinate" id="yCoord" />
        <select id="facing">
          {directions.map((direction) => (
            <option key={direction} value={direction}>
              {direction}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            const x = parseInt(document.getElementById("xCoord").value, 10);
            const y = parseInt(document.getElementById("yCoord").value, 10);
            const f = document.getElementById("facing").value;
            placeRobot(x, y, f);
          }}
        >
          PLACE
        </button>
      </div>
      <button onClick={moveRobot}>MOVE</button>
      <button onClick={() => rotateRobot("LEFT")}>LEFT</button>
      <button onClick={() => rotateRobot("RIGHT")}>RIGHT</button>
      <button onClick={reportPosition}>REPORT</button>
      <div className="grid">{renderGrid()}</div>
    </div>
  );
};

export default Simulator;
