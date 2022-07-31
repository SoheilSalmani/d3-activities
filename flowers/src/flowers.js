import * as d3 from "d3";

import genreColors from "../data/genre-colors.json";
import petalPaths from "../data/petal-paths.json";
import { trunc } from "./utils";

export function drawFlowers(movies, svgWidth, svgHeight) {
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
    .range(d3.range(5, 11));
  const xScale = d3.scaleBand().domain(d3.range(0, 7)).range([0, svgWidth]);
  const yScale = d3
    .scaleBand()
    .domain(d3.range(0, Math.floor(movies.length / 7) + 1))
    .range([0, svgHeight]);

  const data = movies.map((d, i) => ({
    x: xScale(i % 7) + xScale.bandwidth() / 2,
    y: yScale(Math.floor(i / 7)) + yScale.bandwidth() / 2,
    xBandwidth: xScale.bandwidth(),
    yBandwidth: yScale.bandwidth(),
    color: colorScale(d.genres[0]),
    path: pathScale(d.rated),
    scale: sizeScale(d.rating),
    numPetals: numPetalsScale(d.votes),
    title: d.title,
  }));

  const g = d3
    .select("#flowers")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", (d) => `translate(${d.x}, ${d.y})`);
  g.selectAll("path")
    .data((d) =>
      Array.from({ length: d.numPetals }, (_, i) => ({
        rotate: i * (360 / d.numPetals),
        ...d,
      }))
    )
    .enter()
    .append("path")
    .attr("d", (d) => d.path)
    .attr("transform", (d) => `rotate(${d.rotate}) scale(${d.scale})`)
    .attr("fill", (d) => d.color || colors.Other)
    .attr("fill-opacity", 0.5)
    .attr("stroke-width", 2)
    .attr("stroke", (d) => d.color || colors.Other);
  g.append("text")
    .text((d) => trunc(d.title, 30))
    .attr("text-anchor", "middle")
    .style("font-size", ".7em")
    .style("font-style", "italic")
    .attr("dy", ".35em");
}
