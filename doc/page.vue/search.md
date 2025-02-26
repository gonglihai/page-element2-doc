# search 查询条件

`search` 查询条件配置属性是一个数组, 数组内每个项代表一个查询条件, 查询条件类型通过 `type` 属性进行区分, 下面是它的配置示例:

``` js
{
  // search 定义查询条件数组
  search: [
    { field: 'input1', label: '输入框' },                        // input 输入框
    {
      field: 'select1', label: '下拉框', type: 'select',         // select 下拉框
      option: [         // 静态选项
        { id: '1', name: '选项1' },
        { id: '2', name: '选项2' },
      ],
    },
    { field: 'date', label: '日期', type: 'date' },              // date 日期
    { field: 'dateRange', label: '日期范围', type: 'date-range' },// date-range 日期范围
    { field: 'year', label: '年', type: 'year' },                // year 年
    { field: 'yearMonth', label: '年月', type: 'year-month' },   // year-month 年月
  ],
  // button: [...],
  // table: {...}
},
```

## 配置属性

| 属性名      | 说明                                                         | 类型              | 默认值                   | 可选值                                                       |
| ----------- | ------------------------------------------------------------ | ----------------- | ------------------------ | ------------------------------------------------------------ |
| type        | 查询条件的类型                                               | string            | `'input'`                | <div style="width: 155px">`'input'` 输入框<br/>`'select'` [下拉框](#type-select-下拉框)<br/>`'date'` [日期](#type-date-日期)<br/>`'date-range'` [日期范围](#type-date-range-日期范围)<br/>`'year'` [年](#type-year-年)<br/>`'year-month'` [年月](#type-year-month-年月)</div> |
| label       | 查询条件的标题                                               | string            | -                        | -                                                            |
| field       | 查询条件对象的键名                                           | string            | -                        | -                                                            |
| placeholder | 输入提示。<br/>默认的输入提示有两种，分别是：`请输入xxx` 和 `请选择xxx`，其中 `xxx` 为 `label` 配置的值。组件会根据 `type` 自动匹配合适的默认提示。 | string            | `请输入`  <br/> `请选择` | -                                                            |
| clearable   | 是否可清空                                                   | boolean           | `true`                   | -                                                            |
| default     | 默认值, 当为 `function` 时, 函数返回的值做为下拉框的值, 函数没有参数 | string / function | -                        | -                                                            |



### `type = 'select'` 下拉框

| 属性名            | 说明                                                         | 类型    | 默认值                                                 | 可选值                                   |
| ----------------- | ------------------------------------------------------------ | ------- | ------------------------------------------------------ | ---------------------------------------- |
| option            | 静态选项数组                                                 | array   | -                                                      | -                                        |
| api               | 动态选项 api 请求接口 uri 地址, 见 [api 说明](#select-api-说明) | string  | -                                                      | -                                        |
| props             | 选项数组内对象的值与显示内容的键名映射关系, 见 [props 说明](#select-props-说明) | object  | `{ label: 'name', value: 'id', children: 'chidlren' }` | -                                        |
| group             | 选项分组                                                     | boolean | `fasle`                                                | -                                        |
| multiple          | 是否开启多选                                                 | boolean | `false`                                                | -                                        |
| multipleValueType | 多选 状态下, 值的表现形式                                    | string  | `'array'`                                              | `string` 逗号分隔字符串<br/>`array` 数组 |



#### select api 说明

当配置了 `api` 属性时，下拉框组件会调用[请求接口](../起步/request%20请求.html#请求接口)中 `get` 方法向后端发起请求，并使用响应中的 `data` 属性作为下拉框选项的数据源。

```js
// 例子
{
  search: [
    // 一个职位下拉框, 从 '/sys/position/list' 接口获取数据
    { type: 'select', label: '职位', api: '/sys/position/list' } 
  ]
}

// 服务器响应示例 json
{
  "success": true,
  "msg": "success",
  "code": 200,
  "data": [
    { "id": 1, "name": "普通员工" },
    { "id": 2, "name": "部门主管" },
    { "id": 3, "name": "市场经理" }
  ]
}
```



#### select props 说明

例如 `option` 静态选项数组配置或 `api` 请求响应的值为:

```js
[
  { dictValue: '1', dictName: '普通员工' }, 
  { dictValue: '2', dictName: '部门主管' },
  { dictValue: '3', dictName: '市场经理' },
]
```

在这种情况下，我们需要让下拉框知道 `dictValue` 是选项的值，`dictName` 是下拉框显示的内容。因此，我们可以将 `props` 配置为：

```js
{
  label: 'dictName',  // 下拉框显示的内容对应对象内名为 dictName 的键的值
  value: 'dictValue', // 下拉框的值对应对象内名为 dictValue 的键的值
}
```



### `type = 'date'` 日期

| 属性名      | 说明                                                         | 类型   | 默认值                  | 可选值 |
| ----------- | ------------------------------------------------------------ | ------ | ----------------------- | ------ |
| valueFormat | 值日期格式化, 见 [日期格式化](https://element.eleme.cn/#/zh-CN/component/date-picker#ri-qi-ge-shi) | string | `'yyyy-MM-dd HH:mm:ss'` | -      |
| format      | 显示格式化                                                   | string | `'yyyy-MM-dd'`          | -      |



### `type = 'date-range'` 日期范围

| 属性名      | 说明                                                         | 类型           | 默认值         | 可选值 |
| ----------- | ------------------------------------------------------------ | -------------- | -------------- | ------ |
| field       | 查询条件对象的键名, 这里支持数组, 见 [field 说明](#date-range-field-说明) | string / array | -              | -      |
| valueFormat | 值日期格式化, 见 [日期格式化](https://element.eleme.cn/#/zh-CN/component/date-picker#ri-qi-ge-shi) | string         | `'yyyy-MM-dd'` | -      |
| format      | 显示格式化                                                   | string         | `'yy-MM-dd'`   | -      |

#### date-range field 说明

日期范围包含开始时间和结束时间两个值，查询条件的值和结构根据 `field` 的类型来确定。

__field 为字符串时：__ 查询条件的值是一个包含开始时间和结束时间的数组。

```js
// field 为字符串
{
  type: 'date-range'
  field: 'dateRange1'
}
// 查询条件值
{
  dateRange1: ['2025-01-01', '2025-02-20']
}
```



__field 为数组时：__ 查询条件的值是两个分别表示开始时间和结束时间的键值对。

```js
// field 为数组
{
  type: 'date-range',
  field: ['startTime', 'endTime']  
}
// 查询条件值
{
  startTime: '2025-01-01',
  endTime: '2025-02-20'
}
```



### `type = 'year'` 年

| 属性名      | 说明                                                         | 类型   | 默认值   | 可选值 |
| ----------- | ------------------------------------------------------------ | ------ | -------- | ------ |
| valueFormat | 值日期格式化, 见 [日期格式化](https://element.eleme.cn/#/zh-CN/component/date-picker#ri-qi-ge-shi) | string | `'yyyy'` | -      |



### `type = 'year-month'` 年月

| 属性名      | 说明                                                         | 类型   | 默认值     | 可选值 |
| ----------- | ------------------------------------------------------------ | ------ | ---------- | ------ |
| valueFormat | 值日期格式化, 见 [日期格式化](https://element.eleme.cn/#/zh-CN/component/date-picker#ri-qi-ge-shi) | string | `'yyyyMM'` | -      |



## 方法

通过 `this.$refs.page.$search.xxx` 调用，`page` 为 `<VPage ref="page" />` 的 ref 的值。

| 方法名 | 说明                                          | 参数 |
| ------ | --------------------------------------------- | ---- |
| search | 触发 `search` 事件。                          | -    |
| reset  | 重置查询，会触发 `search` 事件。              | -    |
| clean  | 清空查询 (重置查询)，不会触发 `search` 事件。 | -    |

> 触发 `search` 事件会使数据表格重新请求数据。



## 事件
| 事件名 | 说明     | 参数             |
| ------ | -------- | ---------------- |
| search | 查询事件 | 查询条件表单的值 |



## 插槽
| 插槽名              | 说明               |
| ------------------- | ------------------ |
| search-button-start | 查询和重置按钮之前 |
| search-button-end   | 查询和重置按钮之后 |

插槽示例

``` html
<VPage :page="pageOption">
  <template v-slot:search-button-start>
    <el-button size="mini">search-button-start</el-button>
  </template>
  <template v-slot:search-button-end>
    <el-button size="mini">search-button-end</el-button>
  </template>
</VPage>
```

