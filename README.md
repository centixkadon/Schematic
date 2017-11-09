# Schematic Designer

电路原理图设计软件
[![language](https://img.shields.io/badge/language-HTML%20%7C%20JavaScript-brightgreen.svg)]()

## 一、使用说明

待更新

## 二、进度

- [ ] 元器件库结构体
  - [ ] 新建元器件库结构体相关文件：xxx.js yyy.js
  - [ ] 结构体设计
  - [ ] 在jQuery对象中添加成员函数.xxx(yyy)，调用之后可以在对应DOM对象下使用svg画出对应元器件
  - [ ] 提供接口函数xxx(yyy, zzz1, ...)，调用之后可以添加元器件
- [ ] 电路原理图结构体
- [ ] 遍历元器件库，画出按钮
- [ ] 添加按钮事件
- [ ] 连线
- [ ] 拖拽处理
- [ ] JSON文件存取
- [ ] 网页布局、样式使用
- [ ] 添加具体的元器件（大量重复性劳动）
- [ ] 电路原理图设计软件研发小组Github分部集合情况
  - [x] 李明已加入
  - [x] 戚李阳已加入
- [ ] 
未完待续

### 说明

- 完成后自行将\[ \]改成\[x\]
- 函数最好给出调用示例

## 三、目录结构

表格是一些重要的简略说明，有必要详细说明的附在后续几个小标题中。

| 目录 | 说明 |
| --- | --- |
| assets/ | 可大量拷贝的静态资源 |
| assets/image/ | 图像资源 |
| assets/js/ | 自己编写的javascript脚本库 |
| external/ | 外部依赖库 |
| external/bootstrap/ | 著名的CSS框架 |
| external/jquery/ | 简化javascript的DOM操作 |
| js/ | 自己编写的针对该特定项目的javascript脚本 |
| js/test/\*.js | 可在此处新建测试脚本（需要添加到index.html中） |
| js/main.js | 相当于main函数（仅在此处调用各个js文件的函数） |
| Examples/ | 之前编写的样例，现迁移至Github |
| index.html | HTML主页 |
| README.md | 说明文档 |
| .gitignore | git commit时忽略此文件中对应的文件 |

### js/test/\*.js 与 js/main.js 的区别

相比其它js脚本文件， js/test/\*.js 与 js/main.js 都会按 index.html 中的顺序运行，其它js文件则只有函数，不应直接运行。但是 js/main.js 会同步到Github仓库，而git commit时会忽略 js/test/ 中的所有文件（由 .gitignore 指定）。所以Github仓库中的 js/test/ 不包含任何文件，需要在各自的本地仓库新建。新建时建议取名为 js/test/test.js ，否则需要在 index.html 加入新文件。当然也可以直接在 js/test/ 中新建html文件和js文件来测试，这种修改就完全不会对服务器产生影响。其结果就是服务器上的 index.html 只运行 js/main.js，本地可能会额外运行 js/test/\*.js，供测试用。

### js/ 与 assets/js/ 的区别

简单说明就是：assets/js/ 拷贝到其它项目可能也有用，js/ 拷贝到其它项目几乎没有用。

