import * as d3 from 'd3';

export function createRegionSvg(caption: any): string {
  const width = 700;
  const height = 50;
  const fontSize = 48;
  const fontFamily = 'serif';

  const svg = d3.create('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('xmlns', 'http://www.w3.org/2000/svg');

  const textX = width / 2;
  const textY = height / 2 + fontSize / 3;

  // Define a drop shadow filter
  const defs = svg.append('defs');

  const filter = defs.append('filter')
    .attr('id', 'dropshadow')
    .attr('height', '130%');

  filter.append('feGaussianBlur')
    .attr('in', 'SourceAlpha')
    .attr('stdDeviation', 3)
    .attr('result', 'blur');

  filter.append('feOffset')
    .attr('in', 'blur')
    .attr('dx', 2)
    .attr('dy', 2)
    .attr('result', 'offsetBlur');

  const feMerge = filter.append('feMerge');

  feMerge.append('feMergeNode')
    .attr('in', 'offsetBlur');
  feMerge.append('feMergeNode')
    .attr('in', 'SourceGraphic');

  svg.append('text')
    .attr('x', textX)
    .attr('y', textY)
    .attr('text-anchor', 'middle')
    .attr('font-size', fontSize)
    .attr('font-family', fontFamily)
    .attr('fill', 'white')
    .attr('filter', 'url(#dropshadow)')  // Apply the drop shadow filter
    .text(caption);

  const lineY = textY + 3;
  const pathD = `M ${textX - 375} ${lineY} Q ${textX} ${lineY - 1}, ${textX + 375} ${lineY}`;

  const gradient = defs.append('linearGradient')
    .attr('id', 'fade')
    .attr('x1', '0%')
    .attr('y1', '0%')
    .attr('x2', '100%')
    .attr('y2', '0%');

  gradient.append('stop')
    .attr('offset', '0%')
    .attr('stop-color', 'white')
    .attr('stop-opacity', 0);

  gradient.append('stop')
    .attr('offset', '50%')
    .attr('stop-color', 'white')
    .attr('stop-opacity', 1);

  gradient.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', 'white')
    .attr('stop-opacity', 0);

  svg.append('path')
    .attr('d', pathD)
    .attr('stroke', 'url(#fade)')
    .attr('stroke-width', 2)
    .attr('fill', 'none');

  const xmlSerializer = new XMLSerializer();
  const svgString = xmlSerializer.serializeToString(svg.node()!);
  const encodedSvg = encodeURIComponent(svgString)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');

  return `data:image/svg+xml,${encodedSvg}`;
}
