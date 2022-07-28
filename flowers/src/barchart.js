import * as d3 from "d3";

export function drawBarchart(svgWidth, svgHeight) {
  const data = [10, 53, 78, 23, 45, 69, 98];
  const max = d3.max(data, (d) => d);
  const xScale = d3
    .scaleBand()
    .domain(data.keys())
    .range([0, svgWidth])
    .padding(0.25);
  const yScale = d3.scaleLinear().domain([0, max]).range([svgHeight, 0]);

  d3.select("#barchart")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (_, i) => xScale(i))
    .attr("y", (d) => yScale(d))
    .attr("height", (d) => svgHeight - yScale(d))
    .attr("width", xScale.bandwidth)
    .attr("stroke-width", 3)
    .attr("stroke", "plum")
    .attr("fill", "pink");
}
