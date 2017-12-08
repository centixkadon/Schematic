
# 各模块具体要求

## 1. 元器件库结构体

### 主要任务

1. 设计一个结构体
2. 提供调用接口
   1. 添加jQuery对象成员函数。画出指定种类的元器件
   2. 添加全局函数。在结构体中添加一种元器件
3. 可在绘画前设置缩放值。缩放系数为1.0时，电阻、电容等元器件尺寸为100px*100px

其他人并不关心如何实现，所以不能体现在接口调用方式上。

### 预期目标1

```javascript
// 将以下代码复制到 js/test/test.js 中，应画出一个电源，一个地，并返回调用appendComponent的jQuery对象。
$('#svgTestAppendComponent1').appendComponent('vcc');
$('#svgTestAppendComponent2').appendComponent('gnd');
```
```javascript
// 将以下代码复制到 js/test/test.js 中，应在schComponents结构体中添加相应的线（或者其他svg元素）构成的元器件地和电源数组。
defineComponent('vcc').has('line', [-10, -10, 10, -10], [0, -10, 0, 0]);
defineComponent('gnd').has('line', [0, 0, 0, 10], [-15, 10, 15, 10], [-10, 15, 10, 15], [-5, 20, 5, 20]);
```

限制元器件范围为-20到20，x方向为从左到右，y方向为从上到下。各接口使用方法如下：

```javascript
defineComponent('blablabla')                           // 定义名字为blablabla的元器件，名字不能重复，可以是中文
.has('line', [x1, y1, x2, y2], ...)                    // 添加线
.has('circle', [x, y, r], ...)                         // 添加圆
.has('rect', [x, y, width, height], ...)               // 添加矩形
.has('polyline', [x1, y1, x2, y2, ..., xn, yn], ...)   // 添加折线
.has('polygon', [x1, y1, x2, y2, ..., xn, yn], ...)    // 添加多边形
.has('point', [x, y], ...)                             // 添加点
.has('arc', [x1, y1, [isClockwise1, r1, isLargeArc1], x2, y2, ..., xn, yn ], ...) // 添加连续圆弧
                                                       // x_i, y_i          指定连续圆弧经过的点
                                                       // r_i               为 x_i, y_i 到 x_i+1, y_i+1 圆弧的半径，不写则默认画半圆
                                                       // isLargeArc_i      指定圆弧是否大于180度，不写则默认否
                                                       // isClockwise_i     指定圆弧是否顺时针，不写则默认是
                                                       // 若 [] 内三个参数均不写，仍需要保留 []

.has('circle', [x, y, [rx, ry]], ...)                  // 添加椭圆
.has('arc', [x1, y1, [isClockwise1, [rx1, ry1, rt1], isLargeArc1], x2, y2, ..., xn, yn ], ...) // 添加连续椭圆弧
                                                       // rx_i              指定椭圆弧的x轴
                                                       // ry_i              指定椭圆弧的y轴，不写则默认是rx_i
                                                       // rt_i              指定椭圆弧的旋转角，不写则默认是0
```
```javascript
// 将以下代码复制到 js/test/test.js 中，应在schComponents结构体中添加一个很蠢的元器件。
defineComponent('电压源').has('line', [0, -20, 0, 20]).has('circle', [0, 0, 13]).has('point', [0, -20], [0, 20]);
defineComponent('电流源').has('line', [0, -13, 0, -20], [-13, 0, 13, 0], [0, 13, 0, 20]).has('circle', [0, 0, 13]).has('point', [0, -20], [0, 20]);
defineComponent('测试用大杂烩元器件')
  .has('line', [20, -20, 20, 20], [-20, -20, -20, 20])
  .has('circle', [0, -13, 3], [0, 13, 3])
  .has('rect', [10, 10, 5, 10], [-15, -20, 5, 10])
  .has('polyline', [15, -20, 10, -10, 15, -10], [-15, 20, -10, 10, -15, 10])
  .has('polygon', [-2, 0, -6, 6, -10, 3, -14, 6, -17, -6, -12, -3, -7, -6], [2, 0, 6, -6, 10, -3, 14, -6, 17, 6, 12, 3, 7, 6], )
  .has('point', [0, -20], [0, 20], [-20, -20], [-20, 20], [20, -20], [20, 20]);
```

## 2. 电路原理图结构体

### 主要任务及说明

1. 设计一个数组
   1. 数组保存 #svgSch 中的元器件名称（对应 appendComponent 的输入参数）、元器件位置
2. 提供调用接口
   1. 添加全局函数
      1. 调用 appendComponent 在特定位置画出对应元器件
      2. 返回画元器件时创建的 \<g\> 对应的jQuery对象
   2. 添加jQuery对象成员函数
      1. 约定调用该成员函数的对象一定是上一步返回的jQuery对象
      2. 移动到特定位置
      3. 返回该jQuery对象
3. 说明
   1. 调用函数后，数组中的设置应及时更新
   2. 调用函数时，不需要关心函数内部的实现
   3. 预期目标中，函数名仅作实例，可更改成更合适的

### 预期目标1：画出元器件

```javascript
// 将以下代码复制到 js/test/test.js 中，应在 #svgSch 左上角画出一个电源，电源右边画出一个地，并返回对应的jQuery对象。
drawComponent('vcc', 50, 0);
drawComponent('gnd', 50, 200);
```

### 预期目标2：移动

```javascript
// 将以下代码复制到 js/test/test.js 中，应在 #svgSch 左上角画出一个电源。
let componentVcc = drawComponent('vcc', -1000, -1000); // 在 #svgSch 视野外画出一个电源，返回对应的jQuery对象
componentVcc.moveTo(50, 50);                           // 移动到 #svgSch 左上角（绝对位置）
```
```javascript
// 将以下代码复制到 js/test/test.js 中，应在 #svgSch 左上角画出一个电源。
let componentVcc = drawComponent('vcc', 100, 100);     // 在 #svgSch 视野内画出一个电源，返回对应的jQuery对象
componentVcc.moveBy(-50, -50);                         // 移动到 #svgSch 左上角（相对位置）
```
```javascript
// 以下代码可以返回元器件的位置。
componentVcc.getMove().x;                              // 返回x
componentVcc.getMove().y;                              // 返回y
```

### 预期目标3：旋转

```javascript
// 以下代码可以顺时针旋转元器件。
componentVcc.rotateBy(90);                             // 顺时针旋转，返回componentVcc
```
```javascript
// 以下代码可以逆时针旋转元器件。
componentVcc.rotateBy(-90);                            // 逆时针旋转，返回componentVcc
```
```javascript
// 以下代码甚至可以旋转元器件到固定角度。
componentVcc.rotateTo(45);                             // 旋转，返回componentVcc
```
```javascript
// 以下代码可以返回元器件的旋转角度。
componentVcc.getRotate();                              // 返回旋转角度
```

### 预期目标4：选择

```javascript
// 以下代码可以选择元器件。
componentVcc.selectedTo(true);                         // 选择，返回componentVcc
```
```javascript
// 以下代码可以取消选择元器件。
componentVcc.selectedTo(false);                        // 取消选择，返回componentVcc
```
```javascript
// 以下代码可以取反选择元器件。
componentVcc.selectedBy();                             // 若选择则取消选择，否则选择，并返回componentVcc
```
```javascript
// 以下代码可以返回元器件是否被选择。
componentVcc.isSelected();                             // 返回是否被选择
```

### 预期目标5：删除

```javascript
// 以下代码可以删除元器件。
componentVcc.removeIt();                               // 删除元器件，返回componentVcc（虽然没什么用）
```

### 预期目标6：其它

```javascript
// 以下代码可以返回元器件名。
componentVcc.getName();                                // 返回元器件名
```

### 预期目标7

```javascript
// 将以下代码复制到 js/test/test.js 中，应从 #svgButton 左上角开始，依次画出电源和地，并返回对应的jQuery对象。
drawButton('vcc');
drawButton('gnd');
```

## 3. 事件

### 主要任务及说明

1. 实现vcc相关事件
   1. 在#svgButton画出vcc（调用 drawButton）
   1. 添加相关事件，实现以下功能
      1. 在按钮处左键按下，在 #svgSch 某处画出vcc（调用 drawComponent）
      1. 在#svgSch处鼠标移动，vcc移动到鼠标位置（调用 moveTo）
      1. 在#svgSch处鼠标弹起，vcc固定到当前鼠标位置，即vcc不再跟随鼠标
      1. 其它未提到的事件均忽略，如在按钮处左键弹起等
1. 推广到元器件库中所有元器件
1. 继续添加相关事件，实现以下功能
   1. 在#svgSch的vcc处按下，选择vcc
   1. 在#svgSch处鼠标移动，选择的vcc移动到鼠标位置（调用 moveBy）
   1. 在#svgSch处鼠标弹起，选择的vcc固定到当前鼠标位置
   1. 按Esc键取消选择
   1. 按Del键删除（调用 removeIt）
1. 说明
   1. 实现思路参考状态机
   1. 事件添加方法参考main.js（添加了resize事件、ready事件、mousemove事件）和[jQuery API 文档](http://api.jquery.com/)

### 预期目标

无测试代码，网页行为与预期相符即可。

## 4. CSS

### 预期目标1：元器件选择/取消选择样式切换

```javascript
// 以下代码可以将元器件样式切换成选择状态。
componentVcc.addClass('component-selected');           // 返回componentVcc
```
```javascript
// 以下代码可以将元器件样式切换成未选择状态。
componentVcc.removeClass('component-selected');        // 返回componentVcc
```

### 预期目标2：元器件光标样式切换

```javascript
// 以下代码可以在指向所有元器件时，显示小手光标。
$('#svgComponents').addClass('components-canbeselected');
```
```javascript
// 以下代码可以仅在指向所有元器件的连接点时，显示小手光标。
$('#svgComponents').removeClass('components-canbeselected');
```
