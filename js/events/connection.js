/*预期效果：
1.按下空格切换连线和放置元器件状态。
2.在连接线时还未按下连接终点状态时按下esc取消当前连接的线
3.选中连接线的情况下按下del删除连接线
4.选中一条连接线的情况下按下c可以变换连接形式(不支持多选)。
*/
let connectionState = {
  notconnecting: 0,
  connecting: 1,
};
let curConnection = connectionState.notconnecting;

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
            lineList.splice(i,1);
            //console.log(lineList.length);
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
      case 67: //选中连接线的情况下按下c可以变换连接形式
        for( let i=0; i<lineList.length;i++) {
          if(lineList[i][0].hasSelected() == true) {
            //lineList[i].removeIt();
            if(!lineList[i][2]) {
              lineList[i][0].removeIt();
              //lineList.pop().removeIt();
              //console.log(clist.length);
              defineComponent('line').has('line', [lineList[i][1][0]._x, lineList[i][1][0]._y, lineList[i][1][0]._x, lineList[i][1][1]._y]).has('line', [lineList[i][1][0]._x, lineList[i][1][1]._y, lineList[i][1][1]._x, lineList[i][1][1]._y]);
              lineList[i][0] = drawComponent('line', 0, 0).moveTo(0, 0)
              .mousedown(function (ev) {
                if ($(this).hasSelected() == true) {
                  $(this).removeSelected();
                }
                else {
                  $(this).addSelected();
                }
              });
              lineList[i][2] = !lineList[i][2];
              //console.log(connectStyle);
            }
            else if(lineList[i][2]){
              lineList[i][0].removeIt();
              //lineList.pop().removeIt();
              defineComponent('line').has('line', [lineList[i][1][0]._x, lineList[i][1][0]._y, lineList[i][1][1]._x, lineList[i][1][0]._y]).has('line', [lineList[i][1][1]._x, lineList[i][1][0]._y, lineList[i][1][1]._x, lineList[i][1][1]._y]);
              lineList[i][0] = drawComponent('line', 0, 0).moveTo(0, 0)
              .mousedown(function (ev) {
                if ($(this).hasSelected() == true) {
                  $(this).removeSelected();
                }
                else {
                  $(this).addSelected();
                }
              });
              lineList[i][2] = !lineList[i][2];
              //console.log(connectStyle);  
            }
          }
        }
        break;
    }
  });

  $('#svg').on('mousedown touchstart', function (ev) {
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
        if (pointsList.length >= 2) {
          defineComponent('line').has('line', [pointsList[0]._x, pointsList[0]._y, pointsList[1]._x, pointsList[0]._y]).has('line', [pointsList[1]._x, pointsList[0]._y, pointsList[1]._x, pointsList[1]._y]);
          
          lineList.push([drawComponent('line', 0, 0).moveTo(x - pointsList[1]._x, y - pointsList[1]._y).on('mousedown touchstart', function (ev) {
            if ($(this).hasSelected() == true) {
              $(this).removeSelected();
            }
            else {
              $(this).addSelected();
            }
          }),[pointsList[0],pointsList[1]],connectStyle]);//将画出的连接线加到lineList里
          for (let key in pointsList) {//当得到两个点坐标之后清空存储点的数组
            pointsList.pop();
          }
          for(let i =0;i < delList.length;i++) {
            delList[i].removeIt();
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
}