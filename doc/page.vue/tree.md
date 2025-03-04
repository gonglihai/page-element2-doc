# tree 左侧树

## 配置属性 Attributes
| 属性名      | 说明                         | 类型                        | 默认值    | 可选值 |
| ----------- | ---------------------------- | --------------------------- | --------- | ------ |
| name        | 名称                         | string                      | -         | -      |
| width       | 宽度                         | string                      | `'300px'` | -      |
| expand      | 默认展开全部                 | boolean                     | false     | -      |
| expandLevel | 展开级别, 控制树的第几级展开 | number                      | 1         | -      |
| addRoot     | 是否像数据添加根节点         | boolean                     | false     | -      |
| rootName    | 添加的根节点显示名称         | string                      | `'全部'`  | -      |
| props       | 属性名映射                   | object                      | -         | -      |
| data        | 静态数据                     | object                      | -         | -      |
| api         | 数据请求地址                 | string / function / Promise | -         | -      |
| response    | 响应处理器                   | function                    | -         | -      |



## 方法 Methods

通过 `this.$refs.page.$tree.xxx` 调用，`page` 为 `<VPage ref="page" />` 的 ref 的值。

| 方法名            | 说明                               | 参数 |
| ----------------- | ---------------------------------- | ---- |
| clean             | 清理, 清空树选中的数据, 清空树查询 | -    |
| setTreeDataSource | 重新绑定/请求树的数据              | -    |



## 插槽 Slot
| 插槽名            | 说明       | 参数                                                         |
| ----------------- | ---------- | ------------------------------------------------------------ |
| tree-search-start | 树搜索框前 | -                                                            |
| tree-search-end   | 树搜索框后 | -                                                            |
| tree-node         | 树节点     | [node, data](https://element.eleme.cn/#/zh-CN/component/tree#scoped-slot) |


