import * as d3 from "d3";

import genreColors from "../data/genre-colors.json";
import movies from "../data/movies.json";
import petalPaths from "../data/petal-paths.json";

export function drawFlowers(svgWidth, svgHeight) {
  const topGenreColors = Object.fromEntries(
    Object.entries(genreColors).filter(([key]) => key !== "Other")
  );
  const colorScale = d3
    .scaleOrdinal()
    .domain(Object.keys(topGenreColors))
    .range(Object.values(topGenreColors))
    .unknown(genreColors.Other);
  const pathScale = d3.scaleOrdinal().range(petalPaths);
  const sizeScale = d3
    .scaleLinear()
    .domain(d3.extent(movies, (d) => d.rating))
    .range([0.2, 0.75]);
  const numPetalsScale = d3
    .scaleQuantize()
    .domain(d3.extent(movies, (d) => d.votes))
    .range([d3.range(5, 11)]);
  const xScale = d3.scaleBand().domain(d3.range(0, 7)).range([0, svgWidth]);
  const yScale = d3
    .scaleBand()
    .domain(d3.range(0, Math.floor(movies.length / 7) + 1))
    .range([0, svgHeight]);
  console.log(movies);

  const data = movies.map((d, i) => ({
    x: xScale(i % 7) + xScale.bandwidth() / 2,
    y: yScale(Math.floor(i / 7)) + yScale.bandwidth() / 2 - 50,
    xBandwidth: xScale.bandwidth(),
    yBandwidth: yScale.bandwidth(),
    color: colorScale(d.genres[0]),
    path: pathScale(d.rated),
    scale: sizeScale(d.rating),
    numPetals: numPetalsScale(d.votes),
    title: d.title,
  }));

  d3.select("#flowers")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .attr("transform-origin", "left 50")
    .attr("transform", (d) => `translate(${d.x}, ${d.y}) scale(${d.scale})`)
    .attr("d", (d) => d.path)
    .attr("fill", (d) => d.color || colors.Other)
    .attr("fill-opacity", 0.5)
    .attr("stroke-width", 2)
    .attr("stroke", (d) => d.color || colors.Other);
}
