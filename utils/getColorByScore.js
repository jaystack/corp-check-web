import * as d3 from 'd3-scale';
import { RED, ORANGE, GREEN } from './colors';

export default d3.scaleLinear().domain([0, 0.5, 1]).range([RED, ORANGE, GREEN]);
