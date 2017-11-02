
// jQuery不支持直接创建svg图形，定义一个函数来创建svg图像对应的jQuery对象。
var ns = 'http://www.w3.org/2000/svg';
var $s = function (str) {
  return $(document.createElementNS(ns, str));
}

// 使用方法形如 $s('rect').a().b()...;
