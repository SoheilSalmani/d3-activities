import * as d3 from "d3";

import colors from "./colors.json";
import movies from "./movies.json";
import paths from "./paths.json";

const barData = [48, 67, 96, 84, 41];
const rectWidth = 50;

d3.select("#barchart")
  .attr("width", barData.length * rectWidth)
  .attr("height", 100)
  .selectAll("rect")
  .data(barData)
  .enter()
  .append("rect")
  .attr("x", (_, i) => i * rectWidth)
  .attr("y", (d) => 100 - d)
  .attr("height", (d) => d)
  .attr("width", rectWidth)
  .attr("stroke-width", 3)
  .attr("stroke-dasharray", "5 5")
  .attr("stroke", "plum")
  .attr("fill", "pink");

d3.select("#genres")
  .selectAll("path")
  .data(movies)
  .attr("fill", (d) => colors[d.genres[0]] || colors.Other)
  .attr("fill-opacity", 0.5)
  .attr("stroke-width", 2)
  .attr("stroke", (d) => colors[d.genres[0]] || colors.Other);

const perRow = 7;
const pathWidth = 100;
const gapX = 10;
const gapY = 15;
const calculateGridPos = (i) => {
  return [
    gapX + pathWidth / 2 + (pathWidth + gapX) * (i % perRow),
    gapY + (pathWidth + gapY) * Math.floor(i / perRow),
  ];
};

d3.select("#petals")
  .attr("width", gapX + perRow * (pathWidth + gapX))
  .attr("height", gapY + Math.ceil(movies.length / perRow) * (pathWidth + gapY))
  .selectAll("path")
  .data(movies)
  .enter()
  .append("path")
  .attr("transform", (_, i) => `translate(${calculateGridPos(i)})`)
  .attr("d", (d) => paths[d.rated])
  .attr("fill", (d) => colors[d.genres[0]] || colors.Other)
  .attr("fill-opacity", 0.5)
  .attr("stroke-width", 2)
  .attr("stroke", (d) => colors[d.genres[0]] || colors.Other);
