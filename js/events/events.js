comp = '';
state = 0;
compModel;
function initEvents() {
  //init button for vcc
  let vccButton = drawButton('vcc');
  vccButton.mousedown(function () {
    comp = 'vcc';
    compModel = drawComponent(comp, 10, 10);
    state = 1;
  });

  //init button for gnd
  let gndButton = drawButton('gnd');
  gndButton.mousedown(function () {
    comp = 'gnd';
    compModel = drawComponent(comp, 10, 10);
    state = 1;
  });

  //components move with mouse
  $('#svg').mousemove(function (ev) {
    if (state == 1) {
      [x, y] = getMousePosition(ev);
      //compModel.moveTo(x, y);
      compModel.moveTo(x, y);
    }
  });

  //components embedded
  $('#svg').mouseup(function (ev) {
    [x, y] = getMousePosition(ev);
    if (state == 1 && x>0) {
      state = 0;
      comp = '';
    }
  });

}


//get coordinates of mouse
function getMousePosition(ev) {
  let x = getSvgPos(ev.offsetX) - 100, y = getSvgPos(ev.offsetY);
  return [x, y];
}