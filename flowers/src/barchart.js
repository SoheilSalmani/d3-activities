import * as d3 from "d3";

const svgWidth = 800;
const svgHeight = 400;
const t = d3.transition().duration(1000);

function getScales(data) {
  const max = d3.max(data, (d) => d);
  const xScale = d3
    .scaleBand()
    .domain(data.keys())
    .range([0, svgWidth])
    .padding(0.25);
  const yScale = d3.scaleLinear().domain([0, max]).range([svgHeight, 0]);
  return { xScale, yScale };
}

export function drawBarchart(data) {
  const { xScale, yScale } = getScales(data, svgWidth, svgHeight);

  const svg = d3
    .select("#barchart")
    .attr("width", svgWidth)
    .attr("height", svgHeight);
  svg
    .selectAll("rect")
    .data(data, (d) => d)
    .enter()
    .append("rect")
    .attr("x", (_, i) => xScale(i))
    .attr("y", (d) => yScale(d))
    .attr("height", (d) => svgHeight - yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("stroke-width", 3)
    .attr("stroke", "plum")
    .attr("fill", "pink");
  return svg;
}

export function updateBarchartOld(data, svg) {
  const { xScale, yScale } = getScales(data);
  const rect = svg.selectAll("rect").data(data, (d) => d);
  console.info(rect);

  rect.exit().remove();

  const enter = rect
    .enter()
    .append("rect")
    .attr("stroke-width", 3)
    .attr("stroke", "plum")
    .attr("fill", "pink");

  enter
    .merge(rect)
    .attr("x", (_, i) => xScale(i))
    .attr("y", (d) => yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => svgHeight - yScale(d));
}

export function updateBarchartNew(data, svg) {
  const { xScale, yScale } = getScales(data);
  svg
    .selectAll("rect")
    .data(data, (d) => d)
    .join(
      (enter) => {
        return enter
          .append("rect")
          .attr("height", 0)
          .attr("y", svgHeight)
          .attr("x", (_, i) => xScale(i))
          .attr("width", xScale.bandwidth())
          .attr("stroke-width", 3)
          .attr("stroke", "plum")
          .attr("fill", "pink");
      },
      (update) => update,
      (exit) => {
        exit.transition().duration(1000).attr("height", 0).attr("y", svgHeight);
      }
    )
    .transition()
    .duration(1000)
    .attr("x", (_, i) => xScale(i))
    .attr("y", (d) => yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => svgHeight - yScale(d));
}
