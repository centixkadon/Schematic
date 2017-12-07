let connectionState = {
  notconnecting: 0,
  connecting: 1,
};
let curConnection = connectionState.notconnecting;


//let pointsList = [];
//let lineList = [];
//let delList = [];

function schEvents() {

  initEvents();

  //切换摆放元器件对象和连线状态
  $('body').keydown(function (ev) {
    switch (ev.which) {
      case 32://空格
        curConnection = !curConnection;

        for (let key in pointsList) {//切换模式之后清空数组
          pointsList.pop();
        }

        schCurrent = schState.none;
        console.log(curConnection);
        break;
      case 46://del 
        for (let i = 0; i < lineList.length; i++) {
          if (lineList[i].hasSelected() == true) {
            lineList[i].removeIt();
          }
        }
        break;      
      case 27://esc
        if(curConnection) {
          for(let i =0; i < delList.length; i++) {
            delList[i].removeIt();
            for (let key in pointsList) {
              pointsList.pop();
            }
          }
        }
        break;
      case 67://c
        for(let i=0; i<lineList.length; i++) {
          if(lineList[i].hasSelected() == true) {
            //console.log("1111");
            if(!curConnection) {
              if(clist.length == 2) {
                //case 67://c
                if(!connectStyle) {

                  for( let i=0; i<lineList.length;i++) {
                    if(lineList[i].hasSelected() == true)
                      lineList[i].removeIt();
                  }
                  //lineList.pop().removeIt();
                  //console.log(clist.length);
                  defineComponent('line').has('line', [clist[0]._x, clist[0]._y, clist[0]._x, clist[1]._y]).has('line', [clist[0]._x, clist[1]._y, clist[1]._x, clist[1]._y]);
                  lineList.push(drawComponent('line', 0, 0).moveTo(0, 0)
                  .mousedown(function (ev) {
                    if ($(this).hasSelected() == true) {
                      $(this).removeSelected();
                    }
                    else {
                      $(this).addSelected();
                    }
                  }));
                  connectStyle = !connectStyle;
                  //console.log(connectStyle);
                }
                else if(connectStyle){
                  for( let i=0; i<lineList.length;i++) {
                    if(lineList[i].hasSelected() == true)
                      lineList[i].removeIt();
                  }
                  //lineList.pop().removeIt();
                  defineComponent('line').has('line', [clist[0]._x, clist[0]._y, clist[1]._x, clist[0]._y]).has('line', [clist[1]._x, clist[0]._y, clist[1]._x, clist[1]._y]);
                  lineList.push(drawComponent('line', 0, 0).moveTo(0, 0)
                  .mousedown(function (ev) {
                    if ($(this).hasSelected() == true) {
                      $(this).removeSelected();
                    }
                    else {
                      $(this).addSelected();
                    }
                  }));
                  connectStyle = !connectStyle;
                  //console.log(connectStyle);  
                }
              } 
            }
          }
        }
        break;  
    }
  });

  $('#svg').mousedown(function (ev) {
    if (!curConnection) {
      for (let key in pointsList) {//当得到两个点坐标之后清空存储点的数组
        pointsList.pop();
      }
    }
    else if (curConnection) {
      [x, y] = getSchPos(ev);
      if (x > 0) {
        let point = [];
        point._x = x;
        point._y = y;
        pointsList.push(point);//将每次点击的坐标存储到pointsList里 
        /*
        if(pointsList.length < 2) {
           $('#svg').mousemove(function (ev) {
              if(pointsList.length>0) {
                for(let i =0;i < delList.length - 1;i++) {
                  delList[i].removeIt();
                }

                [a,b] = getSchPos(ev);

                defineComponent('line1').has('line', [pointsList[0]._x, pointsList[0]._y, a, pointsList[0]._y]).has('line', [a, pointsList[0]._y, a, b]);
                delList.push(drawComponent('line1', 0, 0).moveTo(a - a, b - b));
              }
            }); 
        }*/
        if (pointsList.length >= 2) {
          defineComponent('line').has('line', [pointsList[0]._x, pointsList[0]._y, pointsList[1]._x, pointsList[0]._y]).has('line', [pointsList[1]._x, pointsList[0]._y, pointsList[1]._x, pointsList[1]._y]);
          lineList.push(drawComponent('line', 0, 0).moveTo(x - pointsList[1]._x, y - pointsList[1]._y)
          .mousedown(function (ev) {
            if ($(this).hasSelected() == true) {
              $(this).removeSelected();
            }
            else {
              $(this).hasSelected();
            }
          }));//将画出的连接线加到lineList里
          for (let key in pointsList) {//当得到两个点坐标之后清空存储点的数组
            pointsList.pop();
          }
        }
      }
    }
  });

  $('#svg').mousemove(function (ev) {
    if(pointsList.length < 2) {
      if(pointsList.length>0) {
        for(let i =0;i < delList.length - 1;i++) {
          delList[i].removeIt();
        }

        [a,b] = getSchPos(ev);

        defineComponent('line1').has('line', [pointsList[0]._x, pointsList[0]._y, a, pointsList[0]._y]).has('line', [a, pointsList[0]._y, a, b]);
        delList.push(drawComponent('line1', 0, 0).moveTo(a - a, b - b));
      }
    }
  }); 

/*
  $('body').keydown(function (ev) {
    switch (ev.which) {
      case 46://del
        for (let i = 0; i < lineList.length; i++) {
          if (lineList[i].hasSelected() == true) {
            lineList[i].removeIt();
          }
        }
        break;
    }
  });*/

/*
  $('body').keydown(function (ev) {
    if(curConnection) {
      switch (ev.which) {
      case 27://esc
        for(let i =0; i < delList.length; i++) {
          delList[i].removeIt();
          for (let key in pointsList) {//当得到两个点坐标之后清空存储点的数组
            pointsList.pop();
          }
        }
        break;
      }
    }
  });*/

/*
  $('body').keydown(function (ev) { //在连接线被选中的情况下 按下c可以转换连接形式
    for(let i=0; i<lineList.length; i++) {
      if(lineList[i].hasSelected() == true) {
        //console.log("1111");
        if(!curConnection) {
          if(clist.length == 2) {
            switch (ev.which) {
              case 67://c
              if(!connectStyle) {

                for( let i=0; i<lineList.length;i++) {
                  if(lineList[i].hasSelected() == true)
                    lineList[i].removeIt();
                }
                //lineList.pop().removeIt();
                //console.log(clist.length);
                defineComponent('line').has('line', [clist[0]._x, clist[0]._y, clist[0]._x, clist[1]._y])
                .has('line', [clist[0]._x, clist[1]._y, clist[1]._x, clist[1]._y]);
                lineList.push(drawComponent('line', 0, 0).moveTo(0, 0).mousedown(function (ev) {
                  if ($(this).hasSelected() == true) {
                    $(this).removeSelected();
                  }
                  else {
                    $(this).addSelected();
                  }
              }));
                connectStyle = !connectStyle;
                //console.log(connectStyle);
              }
              else if(connectStyle){
                for( let i=0; i<lineList.length;i++) {
                  if(lineList[i].hasSelected() == true)
                    lineList[i].removeIt();
                }
                //lineList.pop().removeIt();
                defineComponent('line').has('line', [clist[0]._x, clist[0]._y, clist[1]._x, clist[0]._y])
                .has('line', [clist[1]._x, clist[0]._y, clist[1]._x, clist[1]._y]);
                lineList.push(drawComponent('line', 0, 0).moveTo(0, 0).mousedown(function (ev) {
                  if ($(this).hasSelected() == true) {
                    $(this).removeSelected();
                  }
                  else {
                    $(this).addSelected();
                  }
              }));
                connectStyle = !connectStyle;
                //console.log(connectStyle);  
              }
            break;
            }
          } 
        }
      }
    }
  });*/
}