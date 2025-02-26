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
| data             | 静态数据                                                     | array                  | -         | -                                 |
| api              | 动态数据 api 请求接口 uri 地址。当 api 变更时, 会重新获取数据。 | string                 | -         | -                                 |
| param            | 请求固定参数。见 [param 说明](#param-请求固定参数)           | object                 | -         | -                                 |
| paramFilter      | 请求参数过滤函数。见 [paramFilter 说明](#paramfilter-请求参数过滤函数) | function               | -         | -                                 |
| props            | 属性名映射。分页请求参数、响应数据与总数属性名映射。见 [props 说明](#props-属性名映射) | object                 | -         | -                                 |
| response         | 响应处理函数。见 [response 说明](#response-响应处理函数)     | function               | -         | -                                 |
| size             | 表格尺寸，可在全局配置内配置，`tableSize`                    | string                 | `'small'` | `'medium'` / `'small'` / `'mini'` |
| border           | 是否显示边框。<br/>当 `col` 包含多级表头时, 会强制显示边框   | boolean                | true      | -                                 |
| stripe           | 斑马纹                                                       | boolean                | false     | -                                 |
| rowKey           | 见 [Table Attributes](https://element.eleme.cn/#/zh-CN/component/table#table-attributes) 内 `row-key` | function(row) / String | -         | -                                 |
| defaultExpandAll | 是否默认展开所有行,  见 [Table Attributes](https://element.eleme.cn/#/zh-CN/component/table#table-attributes) 内 `default-expand-all` | boolean                | -         | -                                 |
| col              | 列配置, 见 [col 列配置](#col-列配置)                         | array                  | -         | -                                 |

### param 请求固定参数

表格请求参数目前有三个来源/处理方式，按照顺序分别是：

1. **`param` 固定参数**

   配置、预先定义的、写死的参数。

2. **`search` 查询条件组件**

   查询条件表单的参数，其中同名参数会覆盖掉固定参数中的值。

3. **`paramFilter` 参数过滤函数**

   当 固定参数和查询条件表单无法满足需求时，对请求参数进行最终的过滤处理。



> 正常情况下，`paramFilter` 参数过滤函数很少被使用。



### paramFilter 请求参数过滤函数

`paramFilter` 有一个参数，它是对 `search` 查询条件表单的值和固定参数合并后的对象。该函数不需要返回值。



### props 属性名映射

`props` 是一个对象，包含以下配置：

```js
{
  page: 'pageNo',    // 请求参数，页码的属性名。可以在全局配置中配置，config.page.pageNumber
  limit: 'pageSize', // 请求参数，页大小的属性名。可以在全局配置中配置，config.page.pageSize
  data: 'rows',      // 响应，数据的属性名
  total: 'total',    // 响应，数据总条数的属性名
}
```

>   [!NOTE]
>
> `data` 和 `total` 两个字段的值是 [response 响应处理函数](#response-响应处理函数) 所需要返回的对象属性的属性名。



### response 响应处理函数

与全局配置中的 `dataTableResponse` 函数一致，对响应进行处理，返回数据表格所需的数据格式。

函数参数为 `response` 请求响应，需返回一个对象，包含以下两个属性：

- `rows`：数据行数组，类型：`array`；
- `total`：数据总条数，类型：`number`。

>  [!NOTE]
>
> `rows` 和 `total` 属性名可在 [props 属性名映射](#props-属性名映射) 修改。 



## col 列配置

| 属性名   | 说明                                                         | 类型            | 默认值   | 可选值                                                       |
| -------- | ------------------------------------------------------------ | --------------- | -------- | ------------------------------------------------------------ |
| field    | 表格每行数据对象中值对应的键名, 对应列内容的属性名           | string          | -        | -                                                            |
| name     | 表头列名                                                     | string          | -        | -                                                            |
| children | 多级表头中，下级表头的配置集合。配置此项后，`field` 属性将不再需要。 | array           | -        | -                                                            |
| fmt      | 列内容格式化, 见 [fmt 说明](#fmt-列内容格式化)               | function        | -        | -                                                            |
| type     | 列类型                                                       | string          | `'text'` | <div style="width: 155px">`'text'` 文本<br/>`'switch'` [开关](#type-switch-开关)<br/>`'tag'` [标签](#type-tag-标签)<br/>`'button'` [按钮](#type-button-按钮)<br/>`'link'` [链接](#type-link-链接)</div> |
| show     | 列是否显示                                                   | boolean         | true     | -                                                            |
| width    | 宽度                                                         | string          | -        | -                                                            |
| minWidth | 对应列的最小宽度                                             | string          | -        | -                                                            |
| sortable | 是否可以排序, 配置 children 多级表头后失效                   | boolean         | false    | -                                                            |
| fixed    | 列是否固定在左侧或者右侧，`true` 表示固定在左侧              | string, boolean | false    | `true` / `'left'` / `'right'`                                |
| align    | 对齐方式                                                     | string          | `'left'` | `'left'` / `'center'` / `'right'`                            |
| class    | 列的 className                                               | string          | -        | -                                                            |



### fmt 列内容格式化

`fmt` 是一个函数，接受四个参数，分别是：

- `value`：根据行数据中 `field` 字段对应的值
- `row`：当前行的数据
- `index`：当前行的序号
- `col`：列的配置
- `scope`：Element UI 中 [Table-column Scoped](https://element.eleme.cn/#/zh-CN/component/table#table-column-scoped-slot)

该函数需要返回一个值，作为单元格显示的内容。



### `type = 'switch'` 开关

| 属性名        | 说明                                                         | 类型                      | 默认值 | 可选值                                                       |
| ------------- | ------------------------------------------------------------ | ------------------------- | ------ | ------------------------------------------------------------ |
| activeValue   | 打开时的值                                                   | boolean / string / number | true   | -                                                            |
| inactiveValue | 关闭时的值                                                   | boolean / string / number | false  | -                                                            |
| valueType     | 快捷设定打开/关闭状态的值类型，设定后 `activeValue` 和 `inactiveValue` 将失效。 | string                    | -      | <div style="width: 140px">`'bit'` 1 0<br/> `'boolean'` true false</div> |
| change        | 开关切换事件, 见 [change 说明](#change-开关切换事件)         | function                  | -      | -                                                            |
| api           | 请求的 API 地址, 见 [api 说明](#api-请求的-api-地址)         | string                    | -      | -                                                            |
| idKey         | 行数据中取值的字段名                                         | string                    | `'id'` | -                                                            |
| valueKey      | 请求的 value 的参数名                                        | string                    | field  | -                                                            |
| hidden        | 是否隐藏开关, 传入参数为 scope, col, 返回 true 时隐藏开关    | boolean / function        | -      | -                                                            |



#### change 开关切换事件

当开关的值切换时，调用 `change` 属性所配置的函数。

函数参数：

- `newValue`：开关改变后的新值；

- `col`：当前列配置；

- `scope`：Element UI 列的 `scope` 对象。



#### api 请求的 API 地址

当配置 `api` 属性后，`change` 事件触发时，会向后端发起 `POST` 请求，请求地址为 `col.api` 的值。

`POST` 请求体如下：

```js
{
  [idKey]: idValue,
  [valueKey]: newVal
}
```

请求中会用到 `idKey` 和 `valueKey` 两个属性：

- **idKey**：用于标识数据行的唯一标识符（通常是主键字段）。如果列配置中未指定 `idKey`，则默认使用 `"id"` 作为字段名。例如：`idKey: "userId"`，则 `idValue` 为当前行中 `"userId"` 字段的值。
- **valueKey**：指定要更新的字段名称。可以通过列配置中的 `valueKey` 来设置，如果未指定，则使用 `field` 配置的值作为字段名称。



::: details 查看示例

##### 场景

假设我们有一个用户管理页面，其中显示了用户的列表，用户数据包括 `userId`（用户的唯一标识符）和 `disabled`（用户状态）。现在我们希望在开关切换时，自动发起 `POST` 请求更新用户的状态。

##### 数据结构

假设表格数据行的结构如下:

``` js
[
  {
    userId: 101,     // 用户id
    disabled: false, // 用户状态是否禁用
    // ... 其他字段
  },
  // ... 其他行
]
```

##### 列配置

```js
{
  type: 'switch',          // 使用开关类型
  api: '/api/user/update', // post 请求地址
  idKey: 'userId',         // 主键字段名
  field: 'disabled',       // 值绑定的字段
  valueKey: 'disabled',    // 要更新的字段名, 不配置则取 field 的值
}
```

##### 切换后发起请求的请求体

当用户在界面上切换状态时，发起的请求体如下：

``` js
{
  userId: 101,   // 主键，当前行的 userId
  disabled: true // 更新后的状态值
}
```

这里的 `userId` 表示为 idKey 配置的值，`disabled` 是为 valueKey 配置的值。

:::



### `type = 'tag'` 标签





### `type = 'button'` 按钮





### `type = 'link'` 链接





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