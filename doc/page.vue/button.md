# button 操作按钮

`button` 操作按钮的配置是一个数组，其中每个项代表一个按钮。以下是其配置示例：

``` js
{
  button: [
    { name: '添加', click: console.log, color: 'primary', icon: 'el-icon-plus' },
    { name: '编辑', click: this.edit, selectCount: 1, icon: 'el-icon-edit' },
    { 
      name: '删除', selectMin: 1, color: 'danger', icon: 'el-icon-close',
      internal: 'delete', // 内置删除事件
      api: '/del', field: 'id', requestField: 'ids', fieldType: 'string'
    },
  ]
}
```



## 配置属性 Attributes

| 属性名      | 说明                                                         | 类型               | 默认值 | 可选值                                                       |
| ----------- | ------------------------------------------------------------ | ------------------ | ------ | ------------------------------------------------------------ |
| name        | 按钮显示文字                                                 | string             | -      | -                                                            |
| color       | 按钮的颜色<br/>颜色取自 Element UI Button 组件的 [type 属性](https://element.eleme.cn/#/zh-CN/component/button#attributes) | string             | -      | `'primary'` 蓝色<br/>`'success'` 绿色<br/>`'info'` 灰色<br/>`'warning'` 黄色<br/>`'danger'` 红色<br/>`'text'`文字按钮 |
| icon        | 图标                                                         | string             | -      | 见 [图标集合](https://element.eleme.cn/#/zh-CN/component/icon#tu-biao-ji-he) |
| click       | 点击事件, 见 [click 说明](#click-点击事件-属性)              | string / function  | -      | -                                                            |
| hidden      | 是否隐藏按钮, 见 [hidden 说明](#hidden-是否隐藏按钮-属性)    | boolean / function | false  | -                                                            |
| selectMin   | 指定数据表格的最少选中数量，若选中的条数不足，则进行提示。   | number             | -      | -                                                            |
| selectMax   | 指定数据表格的最多选中数量，若选中的条数超出，则进行提示。   | number             | -      | -                                                            |
| selectCount | 指定数据表格的选中数量，若选中的条数超出或不足，则进行提示。 | number             | -      | -                                                            |
| internal    | 内置事件处理, 见 [internal 说明](#internal-内置事件处理-属性) | string             | -      | `'delete'` 内置删除                                          |



## `click` 点击事件 属性

`click` 可配置为 字符串 或 函数 类型：

- 当为字符串类型时，会触发对应名称的事件。
- 当为函数类型时，会直接调用该函数。

事件或函数接收两个参数：

1. 数据表格选中的数据。
2. 当前按钮的配置信息。



``` html
<template>
  <!-- 这里绑定 buttonAdd 事件到 buttonAddClick 函数 -->
  <VPage :page="pageOption" @buttonAdd="buttonAddClick"></VPage>
</template>
<script>
export default {
  data() {
    return {
      pageOption: {
        button: [
          // click 类型为 字符串, 点击触发 buttonAdd 事件
          { name: '添加', click: 'buttonAdd' },
          // click 类型为 函数, 点击调用 buttonEditClick 函数
          { name: '编辑', click: this.buttonEditClick }
        ]
      }
    }
  },
  methods: {
    buttonAddClick(tableSelectRow, button) {
      console.log('点击了添加按钮', tableSelectRow, button)
    },
    buttonEditClick(tableSelectRow, button) {
      console.log('点击了编辑按钮', tableSelectRow, button)
    },
  }
}
</script>
```

> 以上代码演示了 `click` 配置为字符串和函数两种类型的处理方式。



## `hidden` 是否隐藏按钮 属性

`hidden` 可配置为布尔值或函数类型：

- 当为布尔值时：

  - `true` 代表隐藏按钮。

  - `false` 代表显示按钮。

- 当为函数时，组件会调用该函数，函数的参数与 `click` 函数的参数一致（即数据表格选中的数据和当前按钮的配置信息）。该函数需要返回布尔值：

  - `true` 代表隐藏按钮。

  - `false` 代表显示按钮。

这种方式可以用于按钮权限的判断。



## `internal` 内置事件处理 属性

当前仅内置 `'delete'` 事件用于删除操作。

用户点击按钮后，会弹出确认删除的对话框，用户确认后调用 [request 请求中 delete 方法](../起步/request%20请求.html#请求接口) 发起请求，待请求完成后刷新数据表格。



`'delete'` 删除操作支持以下四个配置参数：

- `api`：指定删除请求的接口地址。
- `field`：指定用于标识删除项的字段，默认为 `'id'`。
- `requestField`：指定请求时提交的数据字段名称，默认为 `'ids'`。
- `fieldType`：指定 `field` 的数据类型，用于格式化请求数据。默认为 `'string'`，示例值：
  - `'string'`：表示 `field` 是一个逗号分隔的字符串。
  - `'array'`：表示 `field` 是一个数组。

<br/>

> 默认情况下，`delete` 请求被认为不能携带请求体，因此 `fieldType` 会始终被设置为 `'string'`，即逗号分隔的字符串格式。



## 事件 Events
| 事件名 | 说明                                                         | 参数                         |
| ------ | ------------------------------------------------------------ | ---------------------------- |
| -      | 当 `click` 属性配置为字符串时，点击将触发对应名称的事件，并传递该字符串值作为事件名。 | 数据表格选中的数据, 按钮配置 |



## 插槽 Slot
| 插槽名       | 说明     |
| ------------ | -------- |
| button-start | 按钮之前 |
| button-end   | 按钮之后 |

插槽示例

``` html
<VPage :page="pageOption">
  <template v-slot:button-start>
    <div>按钮之前 button-start</div>
  </template>
  <template v-slot:button-end>
    <div>按钮之后 button-end</div>
  </template>
</VPage>
```

