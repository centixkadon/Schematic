
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
// 将以下代码复制到 js/test/test.js 中，应在schComponents结构体中添加相应的线（或者其他svg元素）构成的元器件地和电源数组。
appendToSchComponents("gnd").add("line",0,0,0,10).add("line",-15,10,15,10).add("line",-10,15,10,15).add("line",-5,20,5,20);
appendToSchComponents("vcc").add("line",-10,-10,10,-10,0,-10,0,0);
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

### 预期目标1

```javascript
// 将以下代码复制到 js/test/test.js 中，应在 #svgSch 左上角画出一个电源，电源下方画出一个地，并返回对应的jQuery对象。
drawComponent('vcc', 50, 0);
drawComponent('gnd', 50, 200);
```

### 预期目标2

```javascript
// 将以下代码复制到 js/test/test.js 中，应在 #svgSch 左上角画出一个电源。
let componentVcc = drawComponent('vcc', -1000, -1000); // 在 #svgSch 视野外画出一个电源
componentVcc.moveTo(50, 0);                            // 移动到 #svgSch 左上角（绝对位置）
```
```javascript
// 将以下代码复制到 js/test/test.js 中，应在 #svgSch 左上角画出一个电源。
let componentVcc = drawComponent('vcc', -1000, -1000); // 在 #svgSch 视野外画出一个电源
componentVcc.moveBy(1050, 1000);                       // 移动到 #svgSch 左上角（相对位置）
```
