let schCompModel = undefined;//storage selected components
let schCurrent = 0;//current state of sch
let schState = {
  none: 0,
  placing: 1,
  moving: 2,
};//statement structure
let schPrevX, schPrevY;
/* function initEvents: bind events with buttons and components*/
function initEvents() {
  //init button for vcc
  let vccButton = drawButton('vcc');
  vccButton.mousedown(function (ev) {
    comp = 'vcc';
    schCurrent = schState.placing;
    [x, y] = getSchPos(ev);
    schCompModel = [
      drawComponent(comp, x, y)
        .mousedown(function () {
          if (schCurrent == schState.none) {
            schCurrent = schState.moving;
            schCompModel = [$(this)];
          }
        })
    ];
  });

  //keydown events of body
  $('body').keydown(function (ev) {
    switch (schCurrent){
      case schState.moving:
        switch (ev.which) {
          case 27://esc
            schCurrent = schState.none;
            break;
          case 46://delete
            schCurrent = schState.none;
            for (var i = 0; i < schCompModel.length; i++) {
              schCompModel[i].removeIt();
            }
            break;
        }
        break;
      case schState.placing:
        switch (ev.which) {
          case 27://esc
            schCurrent = schState.none;
            for (var i = 0; i < schCompModel.length; i++) {
              schCompModel[i].removeIt();
            }
            break;
        }
        break;
    }
  });
  //mousemove events
  $('#svg').mousemove(function (ev) {
    [x, y] = getSchPos(ev);
    switch(schCurrent){
      case schState.placing:
        //[x, y] = getSchPos(ev);
        schCompModel[0].moveTo(x, y);
        break;
      case schState.moving:
        //[x, y] = getSchPos(ev);
        for (var i = 0; i < schCompModel.length; i++) {
          schCompModel[i].moveBy(x - schPrevX, y - schPrevY);
        }
        break;  
    }
    schPrevX = x;
    schPrevY = y;
  });
  //components embedded
  $('#svg').mouseup(function (ev) {
    [x, y] = getSchPos(ev);
    if (x > 0) {
      switch (schCurrent) {
        case schState.placing:
          schCurrent = schState.none;
          break;
        case schState.moving:
          schCurrent = schState.none;
          break;
      }
    }
  });
}


// /*private functions for this modulw*/
// //events for compModel
// function addEvents(compModel, ev, state, x1, y1) {
//   compModel.mousedown(function () {
//     if (state == 0) {
//       state = 2;
//     }
//   });
//   $('body').keydown(function (ev) {
//     if (state == 2) {
//       switch (ev.which){
//         case 27:
//           state = 0;
//           break;
//         case 46:
//           state = 0;
//           compModel.removeIt();
//           break;

//       }
//     }
//     else if (state == 1) {
//       switch (ev.which) {
//         case 27:
//           state = 0;
//           compModel.removeIt();
//           break;
//       }
//     }
//   });
//   //components move with mouse
//   $('#svg').mousemove(function (ev) {
//     if (state == 1) {
//       [x, y] = getSchPos(ev);
//       compModel.moveTo(x, y);
//     }
//     else if (state == 2) {
//       [x, y] = getSchPos(ev);
//       //compModel.moveBy(x, y);
//       compModel.moveBy(x - x1, y - y1);
//     }
//     [x1, y1] = getSchPos(ev);
//   });
//   //components embedded
//   $('#svg').mouseup(function (ev) {
//     [x, y] = getSchPos(ev);
//     if ((state == 1 || state == 2) && x > 0) {
//       state = 0;
//       x1 = x;
//       y1 = y;
//       comp = '';
//     }
//   });
// }