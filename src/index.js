const svg = d3
  .select('body')
  .append('svg')
  .style('width', '100%')
  .style('height', '100%');
const g = svg.append('g').attr('class', 'g_root');

function newNode(text) {
  const rd = {
    ri: {
      w: 22,
      h: 34
    },
    rc: {
      w: 120,
      h: 36
    },
    ro: {
      w: 22,
      h: 34
    }
  };

  const node = g
    .append('g')
    .attr('class', 'node')
    .style('cursor', 'pointer')
    .call(d3.drag().on('drag', handleDragged));

  function handleDragged() {
    const rectInput = d3.select(this).select('.rectInput'),
      rectContent = d3.select(this).select('.rectContent'),
      rectText = d3.select(this).select('.rectText'),
      rectOutput = d3.select(this).select('.rectOutput'),
      x = d3.event.x,
      y = d3.event.y;
    rectInput.attr('x', x - rd.rc.w / 2 - rd.ri.w).attr('y', y - rd.ri.h / 2);
    rectContent.attr('x', x - rd.rc.w / 2).attr('y', y - rd.rc.h / 2);
    rectText.attr('x', x).attr('y', y);
    rectOutput.attr('x', x + rd.rc.w / 2).attr('y', y - rd.ro.h / 2);
  }

  const rectInput = node
    .append('rect')
    .attr('class', 'rectInput')
    .attr('width', rd.ri.w)
    .attr('height', rd.ri.h)
    .attr('x', 0)
    .attr('y', rd.rc.h / 2 - rd.ri.h / 2)
    .attr('fill', 'rgb(255, 252, 218)')
    .attr('stroke', 'rgb(117, 107, 0)');

  const rectContent = node
    .append('rect')
    .attr('class', 'rectContent')
    .attr('width', rd.rc.w)
    .attr('height', rd.rc.h)
    .attr('x', rd.ri.w)
    .attr('y', 0)
    .attr('fill', 'rgb(255, 252, 218)')
    .attr('stroke', 'rgb(117, 107, 0)');

  const rectText = node
    .append('text')
    .attr('class', 'rectText')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .attr('x', rd.ri.w + rd.rc.w / 2)
    .attr('y', rd.rc.h / 2)
    .text(text);

  const rectOutput = node
    .append('rect')
    .attr('class', 'rectOutput')
    .attr('width', rd.ro.w)
    .attr('height', rd.ro.h)
    .attr('x', rd.ri.w + rd.rc.w)
    .attr('y', rd.rc.h / 2 - rd.ro.h / 2)
    .attr('fill', 'rgb(255, 252, 218)')
    .attr('stroke', 'rgb(117, 107, 0)');
}

newNode('Load Image');
