
let windowScale = 1, allScale = 1;

$('#svgAll').attr('transform', 'scale(' + allScale + ')');

function setComponentsScale(s) {
  schConfig.componentsScale = s;

  allScale = windowScale * schConfig.componentsScale;
  $('#svgAll').attr('transform', 'scale(' + allScale + ')');

  $('#svgAll').children('line')
    .attr('x1', schConfig.svg.button.width)
    .attr('x2', schConfig.svg.button.width)
    .attr('y1', 0)
    .attr('y2', schConfig.svg.innerSize.height / schConfig.componentsScale);
  $('#svgSch').attr('transform', 'translate(' + schConfig.svg.button.width + ' 0)');
}

function setWindowScale(s) {
  windowScale = s;
  $('#svg').attr('width', windowScale * schConfig.svg.innerSize.width);
  $('#svg').attr('height', windowScale * schConfig.svg.innerSize.height);

  allScale = windowScale * schConfig.componentsScale;
  $('#svgAll').attr('transform', 'scale(' + allScale + ')');

  $('#svgButton').children('text').attr('y', schConfig.svg.innerSize.height / schConfig.componentsScale - 10);
  $('#svgSch').children('text').attr('y', schConfig.svg.innerSize.height / schConfig.componentsScale - 10);
}

function getSchPos(ev) {
  let offset = $('#svg').offset();
  return [
    parseInt((ev.pageX - offset.left) / allScale - schConfig.svg.button.width),
    parseInt((ev.pageY - offset.top) / allScale)
  ];
}
