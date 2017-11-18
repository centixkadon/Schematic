//////////////////////////////////////////////////////////////////////////////////////////////////
//1.drawSchComponent()函数画出一个元器件、drawSchematic()画出所有已保存在schSchematic中的元器件。
//2.因为涉及到成员函数，在这里用函数的方法定义元器件结构体。
//3.drawComponent的返回值不是<g>对象，而是对应的元器件结构体。
/////////////////////////////////////////////////////////////////////////////////////////////////


//用函数方法定义元器件结构体，包括name、x、y以及两个内部函数
function schComponent(name, x, y) {
  this.name = name;
  this.x = x;
  this.y = y;
  this.moveTo = function (X, Y) {
    this.x = X;
    this.y = Y;
    drawSchComponent(this);
    return this;
  };
  this.moveBy = function (X, Y) {
    this.x = this.x + X;
    this.y = this.y + Y;
    drawSchComponent(this);
    return this;
  };
}

//用来存放电路图中所有元器件的数组
let schSchematic = new Array();

//输入obj为schSchematic数组元素,画出对应的元器件并返回创建的<g>对象
function drawSchComponent(obj) {
  let group = $s('g').appendComponent(obj.name).attr('transform', 'translate(' + obj.x+' '+obj.y + ')');
  $('#svgSch').append(group);
  return group;
}

//保存一个元器件名称、位置，返回当前元器件数组schSchematic的元素个数
function writeComponent(componentName,offsetX,offsetY) {
  let component=new schComponent(componentName,offsetX,offsetY);
  return schSchematic.push(component);
}

//画出一个元器件，返回元器件结构体
function drawComponent(componentName, offsetX, offsetY) {
  let idx = writeComponent(componentName, offsetX, offsetY)-1;
  drawSchComponent(schSchematic[idx]);
  return schSchematic[idx];
}

function drawSchematic() {
  for (component in schSchematic) {
    drawSchComponent(schSchematic[component]);
  }  
}