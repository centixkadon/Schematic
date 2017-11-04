
// js对html的操作被称作DOM操作，修改已有标记如下：
let div1 = document.getElementById('div1'); // 选择id属性为'div1'的标记
                                            // 上句中let用于定义变量（var也可以，略有区别，推荐let）
                                            // document.getElementById(str)就是一个函数
                                            // 字符串可以用单引号或双引号，js中推荐单引号，因为可以引用双引号
                                            // 句末推荐加分号。
div1.innerHTML = 'js添加的字体';             // 修改<></>标记中夹着的文本。


// 添加新<div>标记如下：
let div2 = document.getElementById('div2');             // 选择id属性为'div2'的标记
let div2a = document.createElement('div');              // 新建<div>标记
div2a.innerHTML = 'js添加的标记';                        // 修改
div2.appendChild(div2a);                                // 添加到div2中

// 添加新<button>标记如下：
let btn1 = document.createElement('button');
btn1.innerHTML = 'js添加的按钮';
btn1.classList.add('btn');                              // 添加class属性
btn1.classList.add('btn-success');                      // 这两句等价于：btn1.className = 'btn btn-success';
div2.appendChild(btn1);

// 因为DOM操作本质上是操作HTML文本，所以添加新标记也可以是这样：
document.getElementById('div3').innerHTML =
  '<button class="btn btn-info">直接修改HTML添加的按钮</button>';


// 这样写起来还是太麻烦了，所以有了jQuery库。它是一系列函数，可以简化DOM操作。
