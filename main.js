import * as d3 from "d3";

import colors from "./colors.json";
import movies from "./movies.json";
import paths from "./paths.json";

const barData = [48, 67, 96, 84, 41, 72, 72, 10, 15, 23];
const svgWidth = 600;
const svgHeight = 400;

const xScale = d3
  .scaleBand()
  .domain(barData.keys())
  .range([0, svgWidth])
  .padding(0.25);

const max = d3.max(barData, (d) => d);

const yScale = d3.scaleLinear().domain([0, max]).range([svgHeight, 0]);

d3.select("#barchart")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .selectAll("rect")
  .data(barData)
  .enter()
  .append("rect")
  .attr("x", (_, i) => xScale(i))
  .attr("y", (d) => yScale(d))
  .attr("height", (d) => svgHeight - yScale(d))
  .attr("width", xScale.bandwidth)
  .attr("stroke-width", 3)
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
