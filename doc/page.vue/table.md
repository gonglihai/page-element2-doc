# table 数据表格

`table` 的配置是一个对象。以下是其配置示例：
``` js
{
  table: {
    select: true,
    api: 'https://page-element2.glh.red/mook/table.json',
    col: [
      { field: "name", name: "姓名" },
      {
        name: '联系方式', children: [
          { field: "email", name: "电子邮件" },
          { field: "phone", name: "电话号码" },
        ]
      },
      { field: "city", name: "城市" },
      { field: "hobbies", name: "爱好", fmt: (value) => value.join(',') },
      {
        name: '操作', type: "button", button: [
          { name: '详情' },
          { name: '编辑', click: ({ row }) => this.edit([row]) },
          { name: '删除', confirmClick: ({ row }) => this.del([row]) },
        ]
      }
    ]
  }
}
```

## 配置属性 Attributes

| 属性名           | 说明                                                         | 类型                   | 默认值    | 可选值                            |
| ---------------- | ------------------------------------------------------------ | ---------------------- | --------- | --------------------------------- |
| select           | 是否开启复选框                                               | boolean                | true      | -                                 |
| pagination       | 是否开启分页                                                 | boolean                | true      | -                                 |
| props            | 分页请求参数、响应数据与总数字段名。见 ['props' 说明](#props-属性) | object                 | -         | -                                 |
| data             | 静态数据                                                     | array                  | -         | -                                 |
| api              | 动态数据 api 请求接口 uri 地址。当 api 变更时, 会重新获取数据。 | string                 | -         | -                                 |
| param            | 动态数据 API 请求时，请求包含固定参数。见 ['param' 说明](#param-固定参数-属性) | object                 | -         | -                                 |
| paramFilter      | 动态数据 API 请求时，参数过滤函数, 见 ['paramFilter' 说明](#paramfilter-参数过滤函数-属性) | function               | -         | -                                 |
| response         | 动态数据 API 请求时，响应处理函数, 见 ['response' 说明](#response-响应处理-属性) | function               | -         | -                                 |
| size             | 表格尺寸，可在全局配置内配置，`tableSize`                    | string                 | `'small'` | `'medium'` / `'small'` / `'mini'` |
| border           | 是否显示边框。<br/>当 `col` 包含多级表头时, 会强制显示边框   | boolean                | true      | -                                 |
| stripe           | 斑马纹                                                       | boolean                | false     | -                                 |
| rowKey           | 见 [Table Attributes](https://element.eleme.cn/#/zh-CN/component/table#table-attributes) 内 `row-key` | function(row) / String | -         | -                                 |
| defaultExpandAll | 是否默认展开所有行,  见 [Table Attributes](https://element.eleme.cn/#/zh-CN/component/table#table-attributes) 内 `default-expand-all` | boolean                | -         | -                                 |
| col              | 列配置, 见 [col 列配置](#col-列配置)                         | array                  | -         | -                                 |



## 'props' 属性

`props` 是一个对象，包含以下配置：

```js
{
  page: 'pageNo',    // 请求参数，页码的字段名。可以在全局配置中配置，config.page.pageNumber
  limit: 'pageSize', // 请求参数，页大小的字段名。可以在全局配置中配置，config.page.pageSize
  data: 'rows',      // 响应，数据的字段名
  total: 'total',    // 响应，数据总条数的字段名
}
```

> `data` 和 `total` 两个字段的值是 ['response' 响应处理](#response-响应处理-属性) 所需要返回的对象属性的字段名。



## 'param' 固定参数 属性

表格请求参数目前有三个来源/处理方式，按照顺序分别是：

1. **`param` 固定参数**

    配置、预先定义的、写死的参数。

2. **`search` 查询条件组件**

    查询条件表单的参数，其中同名参数会覆盖掉固定参数中的值。

3. **`paramFilter` 参数过滤函数**

    当 固定参数和查询条件表单无法满足需求时，对请求参数进行最终的过滤处理。



> 正常情况下，`paramFilter` 参数过滤函数很少被使用。



## 'paramFilter' 参数过滤函数 属性

`paramFilter` 有一个参数，它是对 `search` 查询条件表单的值和固定参数合并后的对象。该函数不需要返回值。



## 'response' 响应处理 属性

与全局配置中的 `dataTableResponse` 函数一致，对响应进行处理，返回数据表格所需的数据格式。

函数参数为 `response` 请求响应，需返回一个对象，包含以下两个属性：

- `rows`：数据行数组，类型：`array`；
- `total`：数据总条数，类型：`number`。

>  `rows` 和 `total` 字段名可在 [props](#props-属性) 内配置修改。



## col 列配置

| 属性名   | 说明                                                         | 类型            | 默认值   | 可选值                                                       |
| -------- | ------------------------------------------------------------ | --------------- | -------- | ------------------------------------------------------------ |
| field    | 表格每行数据对象中值对应的键名, 对应列内容的字段名           | string          | -        | -                                                            |
| name     | 表头列名                                                     | string          | -        | -                                                            |
| children | 多级表头中，下级表头的配置集合。配置此项后，`field` 属性将不再需要。 | array           | -        | -                                                            |
| fmt      | 列内容格式化, 见 [fmt 说明](#fmt-列内容格式化-属性)          | function        | -        | -                                                            |
| type     | 列类型                                                       | string          | `'text'` | <div style="width: 155px">`'text'` 文本<br/>`'switch'` 开关<br/>`'tag'` 标签<br/>`'button'` 按钮<br/>`'link'` 链接</div> |
| show     | 列是否显示                                                   | boolean         | true     | -                                                            |
| width    | 宽度                                                         | string          | -        | -                                                            |
| minWidth | 对应列的最小宽度                                             | string          | -        | -                                                            |
| sortable | 是否可以排序, 配置 children 多级表头后失效                   | boolean         | false    | -                                                            |
| fixed    | 列是否固定在左侧或者右侧，`true` 表示固定在左侧              | string, boolean | false    | `true` / `'left'` / `'right'`                                |
| align    | 对齐方式                                                     | string          | `'left'` | `'left'` / `'center'` / `'right'`                            |
| class    | 列的 className                                               | string          | -        | -                                                            |



## 'fmt' 列内容格式化 属性

`fmt` 是一个函数，接受四个参数，分别是：

- `value`：根据行数据中 `field` 字段对应的值
- `row`：当前行的数据
- `index`：当前行的序号
- `col`：列的配置
- `scope`：Element UI 中 [Table-column Scoped](https://element.eleme.cn/#/zh-CN/component/table#table-column-scoped-slot)

该函数需要返回一个值，作为单元格显示的内容。



## 方法 Methods
// todo

## 事件 Events
// todo

## 插槽 Slot
// todo

## 数据表格
``` js
{
  table: {
    border: true,       // 表格边框
    select: true,       // 行内复选框
    api: '/xxx/list',   // 数据来源
    col: [              // 表格列
      { field: 'code', name: '编号', width: 55, align: 'center' },  // 普通文字列
      { field: 'enabled', name: '是否启用', type: 'switch' },       // 开关
      { field: 'detail', name: '详情', type: 'link' },              // 连接
      { name: '操作', type: 'button',                               // 按钮
        button: [
          { name: '编辑', click: ({ row }) => console.log('点击了编辑') },
          { name: '删除', click: ({ row }) => console.log('点击了删除') }
        ]
      }
    ]
  }
}
```