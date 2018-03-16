document.addEventListener('contextmenu', event => event.preventDefault());

const svg = d3.select('body').append('svg');
svg.style({
  width: '100%',
  height: '100%'
});

const g = svg.append('g').attr({
  class: 'g_root'
});

const diagonal = d3.svg.diagonal();

const drag = d3.behavior.drag()
  .origin(function () {
    const t = d3.select(this);
    return {
      x: t.attr('x'),
      y: t.attr('y')
    };
  })
  .on('drag', dragged);

function createNode(x, y, i) {
  const node = g.append('g').attr({
    class: 'g_node',
    id: `node_${i}`
  });

  return node
    .append('rect')
    .attr({
      class: 'rect',
      width: 50,
      height: 50,
      x: x,
      y: y,
      fill: 'lightgray',
      stroke: 'gray',
      'stroke-width': 4
    })
    .style({
      cursor: 'pointer',
      opacity: 0.5
    })
    .on('dblclick', clicked)
    .on('mouseover', mouseover)
    .on('mouseout', mouseout)
    .call(drag);
}

function mouseover(d) {
  d3.select(this).style('opacity', '1.0');
}

function mouseout() {
  d3.select(this).style('opacity', '0.5');
}

function get(r) {
  return {
    x: parseInt(r.attr('x')) + parseInt(r.attr('width') / 2),
    y: parseInt(r.attr('y')) + parseInt(r.attr('height') / 2),
    id: d3.select(r.node().parentNode).attr('id')
  };
}

const r1 = createNode(50, 50, 1);
const r2 = createNode(200, 90, 2);
const r3 = createNode(70, 300, 3);
const r4 = createNode(230, 250, 4);

let source = get(r1);
let targets = [
  get(r2),
  get(r3),
  get(r4)
];

const links = targets.map(t => {
  return {source: source, target: t};
});

function dragged() {
  const x = d3.event.x, y = d3.event.y;
  const parent = d3.select(this.parentNode);
  console.log(parent);
  d3.select(this).attr({x: x, y: y});
}

function clicked() {
  const t = d3.select(this);
}

const link = g
  .selectAll('path')
  .data(links)
  .enter()
  .insert('g', '.g_node')
  .attr({
    class: 'link',
    id: (d, i) => `link_${i}`
  })
  .append('path')
  .attr({
    d: diagonal
  });

