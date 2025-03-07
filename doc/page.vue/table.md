# table 数据表格

`table` 数据表格的配置是一个对象。以下是其配置示例：

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

## 配置属性

| 属性名           | 说明                                                         | 类型                   | 默认值               | 可选值                            |
| ---------------- | ------------------------------------------------------------ | ---------------------- | -------------------- | --------------------------------- |
| select           | 是否开启复选框                                               | boolean                | true                 | -                                 |
| rowClickSelect   | 行点击选中                                                   | boolean                | false                | -                                 |
| data             | 静态数据                                                     | array                  | -                    | -                                 |
| api              | 动态数据 api 请求接口 uri 地址。当 api 变更时, 会重新获取数据。 | string                 | -                    | -                                 |
| param            | 请求固定参数。见 [param 说明](#param-请求固定参数)           | object                 | -                    | -                                 |
| paramFilter      | 请求参数过滤函数。见 [paramFilter 说明](#paramfilter-请求参数过滤函数) | function               | -                    | -                                 |
| size             | 表格尺寸                                                     | string                 | `'small'`            | `'medium'` / `'small'` / `'mini'` |
| border           | 是否显示边框。<br/>当 `col` 包含多级表头时, 会强制显示边框   | boolean                | true                 | -                                 |
| stripe           | 斑马纹                                                       | boolean                | false                | -                                 |
| rowKey           | 见 [Table Attributes](https://element.eleme.cn/#/zh-CN/component/table#table-attributes) 内 `row-key` | function(row) / String | -                    | -                                 |
| defaultExpandAll | 是否默认展开所有行,  见 [Table Attributes](https://element.eleme.cn/#/zh-CN/component/table#table-attributes) 内 `default-expand-all` | boolean                | -                    | -                                 |
| col              | 列配置, 见 [col 列配置](#col-列配置)                         | array                  | -                    | -                                 |
| pagination       | 是否开启分页                                                 | boolean                | true                 | -                                 |
| pageSizes        | 页码选项                                                     | array                  | `[20, 50, 100, 200]` | -                                 |
| pageNumber       | 请求参数, 页码字段名                                         | string                 | `'pageNo'`           | -                                 |
| pageSize         | 请求参数, 页大小字段名                                       | string                 | `'pageSize'`         | -                                 |
| response         | 响应处理函数。见 [response 说明](#response-响应处理函数)     | function               | -                    | -                                 |
| dataField        | 响应, 数据行的字段名                                         | string                 | `'rows'`             | -                                 |
| totalField       | 响应, 数据数量的字段名                                       | string                 | `'total'`            | -                                 |
| orderField       | 当某一列排序 `sortable` 设置为 `'custom'` 后, 请求参数, 排序字段名 | string                 | `'orderBy'`          | -                                 |
| orderBy          | 排序顺序方式数组, 第一位为正序, 第二位为倒序                 | array                  | `['asc', 'desc']`    | -                                 |



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



### response 响应处理函数

与全局配置中的 `response` 函数一致，对响应进行处理，返回数据表格所需的数据格式。

函数参数为 `response` 请求响应，需返回一个对象，包含以下两个属性：

- `rows`：数据行数组，类型：`array`；
- `total`：数据总条数，类型：`number`。

>  [!NOTE]
>
> `rows` 和 `total` 属性名可通过 `dataField` 和  `totalField` 配置



## col 列配置

| 属性名   | 说明                                                         | 类型                | 默认值   | 可选值                                                       |
| -------- | ------------------------------------------------------------ | ------------------- | -------- | ------------------------------------------------------------ |
| field    | 表格每行数据对象中值对应的键名, 对应列内容的属性名           | string              | -        | -                                                            |
| name     | 表头列名                                                     | string              | -        | -                                                            |
| children | 多级表头中，下级表头的配置集合。配置此项后，`field` 属性将不再需要。 | array               | -        | -                                                            |
| fmt      | 列内容格式化, 见 [fmt 说明](#fmt-列内容格式化)               | function            | -        | -                                                            |
| type     | 列类型                                                       | string              | `'text'` | <div style="width: 155px">`'text'` 文本<br/>`'switch'` [开关](#type-switch-开关)<br/>`'tag'` [标签](#type-tag-标签)<br/>`'button'` [按钮](#type-button-按钮)<br/>`'link'` [链接](#type-link-链接)</div> |
| show     | 列是否显示                                                   | boolean             | true     | -                                                            |
| width    | 宽度                                                         | string              | -        | -                                                            |
| minWidth | 对应列的最小宽度                                             | string              | -        | -                                                            |
| sortable | 是否开启排序, 见 [sortable 说明](#sortable-是否开启排序)     | boolean, `'custom'` | false    | -                                                            |
| fixed    | 列是否固定在左侧或者右侧，`true` 表示固定在左侧              | string, boolean     | false    | `true` / `'left'` / `'right'`                                |
| align    | 对齐方式                                                     | string              | `'left'` | `'left'` / `'center'` / `'right'`                            |
| class    | 列的 className                                               | string              | -        | -                                                            |



### fmt 列内容格式化

`fmt` 是一个函数，接受四个参数，分别是：

- `value`：根据行数据中 `field` 字段对应的值
- `row`：当前行的数据
- `index`：当前行的序号
- `col`：列的配置
- `scope`：Element UI 中 [Table-column Scoped](https://element.eleme.cn/#/zh-CN/component/table#table-column-scoped-slot)

该函数需要返回一个值，作为单元格显示的内容。



### sortable 是否开启排序

当该配置项为布尔类型时，`true` 表示使用内部排序，`false` 表示不进行排序。若配置为 `'custom'`，表示外部排序，请求中会携带排序参数。

请求中携带的排序参数名由 `table.orderField` 控制。



>  [!WARNING]
>
>  若已配置 `children` 进行多级表头设置，则该字段无效。





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

| 属性名  | 说明                                                         | 类型                      | 默认值 | 可选值                                                       |
| ------- | ------------------------------------------------------------ | ------------------------- | ------ | ------------------------------------------------------------ |
| tag     | 标签的颜色, [el-tag 的 type 属性](https://element.eleme.cn/#/zh-CN/component/tag#attributes) | array / object / function | -      | <div style="width: 95px">`'success'` 绿<br/>`'info'` 灰<br/>`'warning'` 黄<br/>`'danger'` 红</div> |
| content | 标签显示内容                                                 | array / object / function | -      | -                                                            |



#### 标签 tag 和 content 配置类型

`tag` 和 `content` 的值支持 [数组](#配置为数组)、[对象](#配置为对象) 或 [函数](#配置为函数)，可根据不同需求选择合适的方式配置。



##### 配置为数组

当 `tag` 配置为数组时，**数组的索引对应数据表格列的值，索引处的值表示标签颜色**。



::: details 示例：配置值类型为数组

```js
// 假设此为表格数据
// status 代表用户状态：0-正常，1-删除，2-离职，3-冻结。
// name   代表用户姓名。
[
  { status: 0, name: '张三' },
  { status: 1, name: '李四' },
  { status: 2, name: '王五' },
  // ... 其他数据
]

// 表格列配置
{
  col: [
    // 状态列
    { 
      field: 'status', 
      name: '状态', 
      type: 'tag', 
      // 状态值对应的标签颜色：
      // 0-正常（success，绿色）
      // 1-删除（danger，红色） 
      // 2-离职（info，灰色）
      // 3-冻结（warning，黄色）
      tag: ['success', 'danger', 'info', 'warning'],
      content: ['正常', '删除', '离职', '冻结']
    },
    { field: 'name', name: '姓名' },
  ]
}
```

:::



##### 配置为对象

当 `tag` 配置为对象时，**对象的属性名对应数据表格列的值，属性值表示标签颜色**。



::: details 示例：配置值类型为对象

```js
// 假设此为表格数据
// status 代表用户状态：'active'-正常，'deleted'-删除，'resigned'-离职，'frozen'-冻结。
// name   代表用户姓名。
[
  { status: 'active', name: '张三' },
  { status: 'deleted', name: '李四' },
  { status: 'resigned', name: '王五' },
  // ... 其他数据
]

// 表格列配置
{
  col: [
    // 状态列
    { 
      field: 'status', 
      name: '状态', 
      type: 'tag', 
      // 状态值对应的标签颜色：
      tag: {
        'active': 'success', // 'active'-正常（info，灰色）
        'deleted': 'danger', // 'deleted'-删除（success，绿色）
        'resigned': 'info',  // 'resigned'-离职（warning，黄色）
        'frozen': 'warning', // 'frozen'-冻结（danger，红色）
      },
      // 列的值对应的状态名
      content: {
        'active': '正常',
        'deleted': '删除',
        'resigned': '离职',
        'frozen': '冻结',
      }
    },
    { field: 'name', name: '姓名' },
  ]
}
```

:::



##### 配置为函数

当 `tag` 配置为函数时，**该函数接收两个参数：一个是表格列配置（`col`），另一个是 Element UI 中的 [Table-column Scoped](https://element.eleme.cn/#/zh-CN/component/table#table-column-scoped-slot)**。

该函数需要返回对应的标签颜色：`'success'`（绿色）、`'info'`（灰色）、`'warning'`（黄色）、`'danger'`（红色）。

<hr/>



### `type = 'button'` 按钮

| 属性名 | 说明                                               | 类型  | 默认值 | 可选值 |
| ------ | -------------------------------------------------- | ----- | ------ | ------ |
| button | 按钮配置集合, 见 [按钮项配置属性](#按钮项配置属性) | array | -      | -      |

#### 按钮项配置属性

| 属性名       | 说明                                                         | 类型               | 默认值      | 可选值                                                       |
| ------------ | ------------------------------------------------------------ | ------------------ | ----------- | ------------------------------------------------------------ |
| name         | 按钮显示文字                                                 | string             | -           | -                                                            |
| color        | 颜色<br/>颜色取自 Element UI Button 组件的 [type 属性](https://element.eleme.cn/#/zh-CN/component/button#attributes) | string             | `'primary'` | `'primary'` 蓝色<br/>`'success'` 绿色<br/>`'info'` 灰色<br/>`'warning'` 黄色<br/>`'danger'` 红色<br/>`'text'`文字按钮 |
| icon         | 图标                                                         | string             | -           | 见 [图标集合](https://element.eleme.cn/#/zh-CN/component/icon#tu-biao-ji-he) |
| click        | 点击事件。函数的参数依次为 [Table-column Scoped](https://element.eleme.cn/#/zh-CN/component/table#table-column-scoped-slot)、`col` 列配置以及 `button` 按钮配置。 | function           | -           | -                                                            |
| hidden       | 是否隐藏按钮。函数的参数与 `click` 属性保持一致，需要返回一个布尔值，以控制按钮的显示与隐藏。 | boolean / function | `false`     | `true` 隐藏按钮<br/>`false` 显示按钮                         |
| confirmClick | 确认点击事件。点击按钮后会弹出二次确认框，用户确认后才会调用函数。函数的参数与 `click` 属性保持一致。 | function           | -           | -                                                            |



### `type = 'link'` 链接

| 属性名 | 说明                                                         | 类型     | 默认值      | 可选值                                                       |
| ------ | ------------------------------------------------------------ | -------- | ----------- | ------------------------------------------------------------ |
| color  | 颜色<br/>颜色取自 Element UI Link 组件的 [type 属性](https://element.eleme.cn/#/zh-CN/component/link#attributes) | string   | `'primary'` | `'primary'` 蓝色<br/>`'success'` 绿色<br/>`'info'` 灰色<br/>`'warning'` 黄色<br/>`'danger'` 红色<br/>`'text'`文字按钮 |
| click  | 点击事件。函数参数依次为 [Table-column Scoped](https://element.eleme.cn/#/zh-CN/component/table#table-column-scoped-slot)、`col` 列配置。 | function | -           | -                                                            |



## 方法

通过 `this.$refs.page.$table.xxx` 调用，`page` 为 `<VPage ref="page" />` 的 ref 的值。

| 方法名       | 说明                   | 参数             |
| ------------ | ---------------------- | ---------------- |
| clean        | 清理数据表格选中的数据 | -                |
| reloadData   | 重加载数据             | search 查询条件  |
| setTableData | 设置数据表格数据       | 数据行、数据总数 |



## 插槽
| 插槽名           | 说明                                      | 参数                     |
| ---------------- | ----------------------------------------- | ------------------------ |
| table-col-*      | 表格列内容插槽, * 为 `field` 属性配置的值 | 见 [插槽参数](#插槽参数) |
| table-page-start | 分页之前                                  | -                        |
| table-page-end   | 分页之后                                  | -                        |

#### 插槽参数

``` js
slotParam: {
  value, // 列的值
  row,   // 行数据
  index, // 行序号
  col,   // 列配置
  scope, // element-ui 表格列插槽原始参数
}
```

> [element-ui 表格列插槽原始参数](https://element.eleme.cn/#/zh-CN/component/table#table-column-scoped-slot)



## 自定义列类型

当表格的默认列类型无法满足需求时，可以通过自定义列来增强表格功能，以实现更灵活的展示效果。

**第一步：编写自定义列组件**

`table` 组件提供了 `col`（当前列的配置项）和 `scope`（[Table-column Scoped](https://element.eleme.cn/#/zh-CN/component/table#table-column-scoped-slot)）这两个 `props` 绑定，可以根据需要使用。

``` vue {10-11}
<template>
  <div>
    <!-- 你的模板内容 -->
  </div>
</template>

<script>
export default {
  props: {
    col: Object,   // 当前列的配置项
    scope: Object, // Element UI Table column scoped
  }
}
</script>
```

**或者** 引入 [TableColMixin](https://github.com/gonglihai/page-element2/blob/main/src/page/table/col/TableColMixin.js) 使用 [混入 (mixin)](https://v2.cn.vuejs.org/v2/guide/mixins.html)，快速定义这两个 `props`：

```vue {8,10}
<template>
  <div>
    <!-- 你的模板内容 -->
  </div>
</template>

<script>
import { TableColMixin } from 'page-element2';
export default {
  mixins: [TableColMixin]
}
</script>
```

> `TableColMixin` 还提供了一个 `content` 计算属性，该属性表示调用 `fmt` 函数（如果已配置）后的表格内容。



**第二步：在全局配置中引入自定义列组件**

在 `table` 配置项下新增 `colType` 对象，`colType` 的属性名为列类型，值为动态引入的组件方法：

```js {4,6}
// VPageConfig.js
{
  table: {
    colType: {
      // 导入你的组件, 使用时, type 为 'customType'
      customType: () => import('./你的目录/组件名.vue')
    }
  }
}
```



**第三步：在配置中使用自定义列类型**

```js {6}
// vpage 配置
{
  table: {
    col: [
      // 使用自定义的列类型
      { type: 'customType', name: '自定义列' },
      // ...
    ]
  }
}
```

这样，你可以在表格中使用自定义列组件，增强表格的功能和可扩展性。



> **这里有个一个示例**: [自定义表格列类型](https://page-element2-example.glh.red/#/advanced/CustomTableColType)
