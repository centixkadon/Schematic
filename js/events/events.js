let schCompModel = undefined;//storage selected components
let schCompModelCopy = undefined;//storage copy
let schState = {
  none: 0,
  placing: 1,
  moving: 2,
};//statement structure
let schCurrent = schState.none;//current state of sch
let schPrevX = 0;
let schPrevY = 0;//storage mouse coordinates of last position
let keyList = undefined;
//let comp = undefined;

let pointsList = [];
let lineList = [];
let delList = [];
let connectStyle = false;
let clist = [];


/* function initEvents: bind events with buttons and components*/
function initEvents() {
  for (let key in schComponents) {
    drawButton(key).on('mousedown touchstart', function (ev) {
      if (1) {
        switch (schCurrent) {
          case schState.none://in theory, only in state none allow to draw components
            if (schCompModel != undefined) {
              for (let i = 0; i < schCompModel.length; i++) {
                schCompModel[i].removeSelected();
              }
              schCompModel = undefined;
            }//cancel all seleted when try to draw a new one

            schCurrent = schState.placing;
            schCompModel = [
              drawComponent(key, schPrevX, schPrevY)//draw a component and select into schCompModel
                .on('mousedown touchstart', function (ev) {
                  if (curConnection) {
                    if (pointsList.length > 2) {
                      for (let key in pointsList) {//当得到两个点坐标之后清空存储点的数组
                        pointsList.pop();
                      }
                    }
                    [a, b] = getSchPos(ev);
                    let point = [];
                    point._x = a;
                    point._y = b;
                    pointsList.push(point);

                    if(pointsList.length < 2 ) {
                      $('#svg').on('mousemove touchmove', function (ev) {
                        if(pointsList.length>0) {
                          for(let i =0;i < delList.length - 1;i++) {
                            delList[i].removeIt();
                          }

                        [c,d] = getSchPos(ev);
                        //defineComponent('line1').has('line', [pointsList[0]._x, pointsList[0]._y, pointsList[0]._x, d]).has('line', [pointsList[0]._x, d, c, d]);
                        defineComponent('line1').has('line', [pointsList[0]._x, pointsList[0]._y, c, pointsList[0]._y]).has('line', [c, pointsList[0]._y, c, d]);
                        delList.push(drawComponent('line1', 0, 0).moveTo(0, 0));

                        }

                      });
                    }

                    if (pointsList.length >= 2) {
                      for(let i =0;i < delList.length ;i++) {
                          delList[i].removeIt();
                        }
                      connectStyle = false;
                      defineComponent('line').has('line', [pointsList[0]._x, pointsList[0]._y, pointsList[1]._x, pointsList[0]._y])
                        .has('line', [pointsList[1]._x, pointsList[0]._y, pointsList[1]._x, pointsList[1]._y]);
                        //let temp = drawComponent('line', 0, 0).moveTo(0, 0);

                        lineList.push([drawComponent('line', 0, 0).moveTo(0, 0).on('mousedown touchstart', function (ev) {
                          if ($(this).hasSelected() == true) {
                            $(this).removeSelected();
                          }
                          else {
                            $(this).addSelected();
                          }
                        }),[pointsList[0],pointsList[1]]]);


                      clist[0] = pointsList[0];
                      clist[1] = pointsList[1];
                      for (let key in pointsList) {//当得到两个点坐标之后清空存储点的数组
                        //clist[i] = pointsList[i];
                        pointsList.pop();
                      }
                    }
                  }
                  switch (schCurrent) {
                    case schState.none://in theory, only in state none allow to select comp
                      schCurrent = schState.moving;
                      if ($(this).hasSelected() == false) {//unselected, using ctrl to select multi-comp
                        if (schCompModel != undefined) {//list exist
                          if (ev.ctrlKey) {
                            $(this).addSelected();
                            schCompModel.push($(this));//multi select
                          }
                          else {
                            for (let i = 0; i < schCompModel.length; i++) {
                              schCompModel[i].removeSelected();
                            }
                            $(this).addSelected();
                            schCompModel = [$(this)];//single select
                          }
                        }
                        else {//list does not exist
                          $(this).addSelected();
                          schCompModel = [$(this)];//single select
                        }
                      }
                      else {//selected, using ctrl to cancel
                        if (ev.ctrlKey) {
                          $(this).removeSelected();
                          if (schCompModel != undefined) {
                            for (let i = 0; i < schCompModel.length; i++) {
                              if (schCompModel[i].hasSelected() === false)//cancel select
                                schCompModel.splice(i, 1);
                            }
                          }
                        }
                      }
                      break;
                  }
                  //console.log($(this).hasSelected());
                  return false;
                })
                .addSelected()

            ];
            break;
        }
      }
      return false;
    });
  }
  //keydown events of body
  $('body').keydown(function (ev) {
    if (!curConnection) {
      switch (ev.which) {
        //case 13:
        //curConnection = connectionState.connecting;
        //console.log("Sample log");
        //break;
        case 27://esc
          switch (schCurrent) {
            case schState.none:
              if (schCompModel != undefined) {
                for (let i = 0; i < schCompModel.length; i++) {
                  schCompModel[i].removeSelected();//cancel all selected
                }
                schCompModel = undefined;
              }
              break;
            case schState.placing://esc in placing state
              schCurrent = schState.none;//cancel placing
              if (schCompModel != undefined) {
                for (let i = 0; i < schCompModel.length; i++) {
                  schCompModel[i].removeSelected();
                  schCompModel[i].removeIt();//remove models
                }
                schCompModel = undefined;
              }
              break;
            case schState.moving://esc in moving state
              schCurrent = schState.none;//cancle moving
              if (schCompModel != undefined) {
                for (let i = 0; i < schCompModel.length; i++) {
                  schCompModel[i].removeSelected();//cancel all selected
                }
                schCompModel = undefined;
              }
              break;
          }
          break;
        case 46://delete
          schCurrent = schState.none;//return to state none
          if (schCompModel != undefined) {
            for (let i = 0; i < schCompModel.length; i++) {
              schCompModel[i].removeSelected();
              schCompModel[i].removeIt();//remove all selected models
            }
            console.log(schCompModel.length);
          }
          break;
        case 81://Q
          //turn 90 deg counter clockwise

          if (schCompModel != undefined) {
            if (ev.shiftKey) {
              centerX = 0, centerY = 0;
              for (let i = 0; i < schCompModel.length; i++) {
                centerX = centerX + schCompModel[i].getMove().x;
                centerY = centerY + schCompModel[i].getMove().y;
              }
              centerX = centerX / schCompModel.length;
              centerY = centerY / schCompModel.length;
              for (let i = 0; i < schCompModel.length; i++) {
                schCompModel[i].rotateBy(-90);
                schCompModel[i].moveTo(centerX - centerY + schCompModel[i].getMove().y, -schCompModel[i].getMove().x + centerX + centerY);
              }
            }
            else {
              for (let i = 0; i < schCompModel.length; i++) {
                schCompModel[i].rotateBy(-90);
              }
            }
          }
          break;
        case 69://E
          //turn 90 deg clockwise
          if (schCompModel != undefined) {
            if (ev.shiftKey) {
              centerX = 0, centerY = 0;
              for (let i = 0; i < schCompModel.length; i++) {
                centerX = centerX + schCompModel[i].getMove().x;
                centerY = centerY + schCompModel[i].getMove().y;
              }
              centerX = centerX / schCompModel.length;
              centerY = centerY / schCompModel.length;
              for (let i = 0; i < schCompModel.length; i++) {
                schCompModel[i].rotateBy(90);
                schCompModel[i].moveTo(centerX + centerY - schCompModel[i].getMove().y, schCompModel[i].getMove().x - centerX + centerY);
              }
            }
            else {
              for (let i = 0; i < schCompModel.length; i++) {
                schCompModel[i].rotateBy(90);
              }
            }
          }
          break;
        case 67://C
          if (ev.ctrlKey) {//ctrl+c
            if (schCompModel != undefined) {
              schCompModelCopy = schCompModel;
            }
          }
          break;
        case 88://X
          if (ev.ctrlKey) {//ctrl+x
            if (schCompModel != undefined) {
              schCompModelCopy = schCompModel;
              for (let i = 0; i < schCompModel.length; i++) {
                schCompModel[i].removeSelected();
                //schCompModel[i].removeIt();//remove all selected models
              }
               console.log(schCompModel.length);
            }
          }
          break;
        case 86://V
          if (ev.ctrlKey) {//ctrl+v
            switch (schCurrent) {
              case schState.none:
                if (schCompModelCopy != undefined) {
                  if (schCompModel != undefined) {
                    for (let i = 0; i < schCompModel.length; i++) {
                      schCompModel[i].removeSelected();//cancel all selected
                    }
                    schCompModel = undefined;
                  }//clear schModelComp, cancel all selected
                  console.log(schCompModelCopy.length);
                  for (let i = 0; i < schCompModelCopy.length; i++) {
                    console.log(i, schCompModelCopy[i].getName(), schCompModelCopy[i].getMove().x, schCompModelCopy[i].getMove().y);
                    tempComp = drawComponent(schCompModelCopy[i].getName(), schCompModelCopy[i].getMove().x, schCompModelCopy[i].getMove().y)
                    tempComp.on('mousedown touchstart', function (ev) {
                      switch (schCurrent) {
                        case schState.none://in theory, only in state none allow to select comp
                          schCurrent = schState.moving;
                          if ($(this).hasSelected() == false) {//unselected, using ctrl to select multi-comp
                            if (schCompModel != undefined) {//list exist
                              if (ev.ctrlKey) {
                                $(this).addSelected();
                                schCompModel.push($(this));//multi select
                              }
                              else {
                                $(this).addSelected();
                                schCompModel = [$(this)];//single select
                              }
                            }
                            else {//list does not exist
                              $(this).addSelected();
                              schCompModel = [$(this)];//single select
                            }
                          }
                          else {//selected, using strl to cancel
                            if (ev.ctrlKey) {
                              $(this).removeSelected();
                              if (schCompModel != undefined) {
                                for (let i = 0; i < schCompModel.length; i++) {
                                  if (schCompModel[i].hasSelected() === false)//cancel select
                                    schCompModel.splice(i, 1);
                                }
                              }
                            }
                          }
                          break;

                      }
                      //console.log($(this).hasSelected());
                      return false;
                    });
                    tempComp.addSelected();
                    if (schCompModel != undefined) {
                      schCompModel.push($(tempComp));
                    }
                    else { schCompModel = [$(tempComp)]; }
                  }
                  centerX = 0, centerY = 0;
                  for (let i = 0; i < schCompModel.length; i++) {
                    centerX = centerX + schCompModel[i].getMove().x;
                    centerY = centerY + schCompModel[i].getMove().y;
                  }
                  centerX = centerX / schCompModel.length;
                  centerY = centerY / schCompModel.length;
                  for (let i = 0; i < schCompModel.length; i++) {
                    schCompModel[i].moveBy(x - centerX, y - centerY);
                  }
                  schCurrent = schState.moving;
                }
                break;
            }
          }
          break;
      }
    }
  });
  //keyup events of body
  //$('body').keyup(function(ev){})

  //mousemove events
  $('#svg').on('mousemove touchmove', function (ev) {
    if (!curConnection) {
      [x, y] = getSchPos(ev);//get coordinates
      if (x < 0) return;
      switch (schCurrent) {
        case schState.placing://state placing
          if (schCompModel != undefined) {
            for (let i = 0; i < schCompModel.length; i++) {
              schCompModel[i].moveTo(schPrevX, schPrevY);
            }
          }
          break;
        case schState.moving://state moving
          if (schCompModel != undefined) {
            for (let i = 0; i < schCompModel.length; i++) {
              schCompModel[i].moveBy(x - schPrevX, y - schPrevY);
            }
          }
          break;
      }
      schPrevX = x;
      schPrevY = y;
    }

  });
  //mousedown events for svg (click in the blank)
  $('#svg').on('mousedown touchstart', function (ev) {
    if (!curConnection) {
      //console.log(schCompModel.length);
      if (schCompModel != undefined) {
        for (let i = 0; i < schCompModel.length; i++) {
          schCompModel[i].removeSelected();
        }
        schCompModel = undefined;
      }
      schCurrent = schState.none;//cancel all selected and change state to none

    }
  });
  //components embedded
  $('#svg').on('mouseup touchend', function (ev) {//mouse up means not moving comp
    if (!curConnection) {
      [x, y] = getSchPos(ev);
      if (x > 0) {//can only embed in the area where x > 0
        switch (schCurrent) {
          case schState.placing:
            schCurrent = schState.none;
            break;
          case schState.moving:
            schCurrent = schState.none;
            break;
        }
      }
    }

  });

}

