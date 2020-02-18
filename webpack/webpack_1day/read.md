webpack4的基本配置：
```
"scripts": {
    "dev": "webpack --mode development",
    "build": "webpack --mode production",
}
```
如果项目编译需要的时间比较长，想要看到编译的进度等信息，则可以这样设置：
```
"scripts": {
    "dev": "webpack --mode development --progress --profile --colors -w",
},
```
相关参数：

> colors：打包信息带彩色提示，比如：会用红色显示耗时较长的步骤;

> profile：输出性能数据，可以看到每一步的耗时

> progress：输出当前编译的进度，以百分比的形式呈现