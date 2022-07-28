import * as d3 from "d3";

const barData = [48, 67, 96, 84, 41];
const rectWidth = 50;

d3.select("svg")
  .attr("width", barData.length * rectWidth)
  .attr("height", 100)
  .selectAll("rect")
  .data(barData)
  .attr("x", (_, i) => i * rectWidth)
  .attr("y", (d) => 100 - d)
  .attr("height", (d) => d)
  .attr("width", rectWidth)
  .attr("stroke-width", 3)
  .attr("stroke-dasharray", "5 5")
  .attr("stroke", "plum")
  .attr("fill", "pink");
