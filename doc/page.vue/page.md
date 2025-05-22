# Page.vue



## 配置属性

| 属性名 | 说明                                                | 类型   | 组件 refs 映射 |
| ------ | --------------------------------------------------- | ------ | -------------- |
| tree   | [tree 左侧树属性](./tree#配置属性-attributes)       | object | $tree          |
| search | [search 查询条件属性](./search#配置属性-attributes) | array  | $search        |
| button | [button 操作按钮属性](./button#配置属性-attributes) | array  | $button        |
| table  | [table 表格属性](./table#配置属性-attributes)       | object | $table         |



> __组件 refs 映射 说明:__
>
> `tree`、`search`、`button`、`table` 等组件均挂载在 `VPage` 组件下，默认可通过 `this.$refs.page.$refs.table` 访问。但由于调用路径较长，通过计算属性将这些组件直接挂载到 `page` 的根上，使其可以通过 `this.$refs.page.$tree` 等访问，从而简化调用路径。
>
> ----
>
> `page` 为 `<VPage ref="page" />` 的 `ref` 的值。



## 方法

| 方法名      | 说明                                                         | 参数                      |
| ----------- | ------------------------------------------------------------ | ------------------------- |
| tableReload | 刷新表格                                                     | params 发起请求附带的参数 |
| clear       | 清理 tree 树, search 查询条件 的值, dataTable 表格重新发起请求 | -                         |



## 事件

| 事件名 | 说明              | 参数                    |
| ------ | ----------------- | ----------------------- |
| search | 查询/重置按钮点击 | searchData 查询条件参数 |

