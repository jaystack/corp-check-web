import * as d3 from 'd3-scale';

export default d3
  .scaleLinear()
  .domain([0, 0.5, 1])
  .range(['rgb(219, 40, 40)', 'rgb(242, 113, 28)', 'rgb(33, 186, 69)']);
