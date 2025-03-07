# tree 左侧树

`tree` 左侧树的配置是一个对象。以下是其配置示例：

``` js
tree: {
  field: 'deptId',
  api: '/mook/tree.json',
},
```



## 配置属性
| 属性名        | 说明                                           | 类型                        | 默认值       | 可选值 |
| ------------- | ---------------------------------------------- | --------------------------- | ------------ | ------ |
| field         | 表格查询参数字段名                             | string                      | -            | -      |
| name          | 树名称, 搜索框的名字                           | string                      | -            | -      |
| width         | 宽度                                           | string                      | `'300px'`    | -      |
| expand        | 默认展开全部                                   | boolean                     | false        | -      |
| expandLevel   | 展开级别, 控制树的第几级展开                   | number                      | 1            | -      |
| data          | 静态数据                                       | object                      | -            | -      |
| api           | 数据请求地址, 见 [api 说明](#api-数据请求地址) | string / function / Promise | -            | -      |
| response      | 树数据请求响应处理                             | function                    | -            | -      |
| labelField    | 树节点显示字段名                               | string                      | `'name'`     | -      |
| valueField    | 树节点值字段名                                 | string                      | `'id'`       | -      |
| childrenField | 树子节点字段名                                 | string                      | `'children'` | -      |
| addRoot       | 是否向数据添加根节点                           | boolean                     | false        | -      |
| rootName      | 添加的根节点显示名称                           | string                      | `'全部'`     | -      |
| rootValue     | 添加的根节点的值                               | any                         | `undefined`  | -      |



## api 数据请求地址

`api` 支持不同的类型，通过配置 `api` 配置数据来源。

**`api` 配置支持的类型**

- **字符串 (**`string`**)**
- **函数 (**`function`**)**
- **Promise 对象 (**`Promise`**)**



### api 为字符串

当 `api` 配置为字符串时，组件会使用 `GET` 请求从该 API 地址获取数据。

请求返回后，数据会经过 局部的 `response` 和 全局配置的 `response` 处理（如果有配置）



### api 为函数

当 `api` 配置为函数时，该函数应返回以下两种数据格式之一：

- **数组(`Array`)**: 直接作为组件的数据。
- **Promise**: 异步获取数据，返回值应是包含 `data` 字段的对象。



### api 为 Promise 对象

当 `api` 直接是 `Promise` 时，组件会等待该 `Promise` 解析，并使用 `response.data` 作为数据。



## 方法

通过 `this.$refs.page.$tree.xxx` 调用，`page` 为 `<VPage ref="page" />` 的 ref 的值。

| 方法名     | 说明                               | 参数 |
| ---------- | ---------------------------------- | ---- |
| clean      | 清理, 清空树选中的数据, 清空树查询 | -    |
| reloadData | 重新绑定/请求树的数据              | -    |



## 插槽
| 插槽名            | 说明       | 参数                                                         |
| ----------------- | ---------- | ------------------------------------------------------------ |
| tree-search-start | 树搜索框前 | -                                                            |
| tree-search-end   | 树搜索框后 | -                                                            |
| tree-node         | 树节点     | [`{ node, data }`](https://element.eleme.cn/#/zh-CN/component/tree#scoped-slot) |

