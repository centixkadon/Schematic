//comp = '';
//compModel;
function initEvents() {
  //init button for vcc
  let vccButton = drawButton('vcc');
  vccButton.mousedown(function (ev) {
    comp = 'vcc';
    state = 1;
    x1 = 10, y1 = 10;
    compModel = drawComponent(comp, 10, 10);
    addEvents(compModel, ev, state,x1,y1);
  });

  //init button for gnd
  let gndButton = drawButton('gnd');
  gndButton.mousedown(function (ev) {
    comp = 'gnd';
    state = 1;
    x1 = 10, y1 = 10;
    compModel = drawComponent(comp, 10, 10);
    addEvents(compModel, ev, state,x1,y1);
  });

}


/*private functions for this modulw*/
//events for compModel
function addEvents(compModel, ev, state, x1, y1) {
  compModel.mousedown(function () {
    if (state == 0) {
      state = 2;
    }
  });
  $('body').keydown(function (ev) {
    if (state == 2) {
      switch (ev.which){
        case 27:
          state = 0;
          break;
        case 46:
          state = 0;
          compModel.removeIt();
          break;

      }
    }
    else if (state == 1) {
      switch (ev.which) {
        case 27:
          state = 0;
          compModel.removeIt();
          break;
      }
    }
  });
  //components move with mouse
  $('#svg').mousemove(function (ev) {
    if (state == 1) {
      [x, y] = getSchPos(ev);
      compModel.moveTo(x, y);
    }
    else if (state == 2) {
      [x, y] = getSchPos(ev);
      //compModel.moveBy(x, y);
      compModel.moveBy(x - x1, y - y1);
      [x1, y1] = getSchPos(ev);
    }
  });
  //components embedded
  $('#svg').mouseup(function (ev) {
    [x, y] = getSchPos(ev);
    if ((state == 1 || state == 2) && x > 0) {
      state = 0;
      x1 = x;
      y1 = y;
      comp = '';
    }
  });
}