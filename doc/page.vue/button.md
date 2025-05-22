# button 操作按钮

`button` 操作按钮的配置是一个数组，其中每个项代表一个按钮。以下是其配置示例：

``` js
{
  button: [
    { name: '添加', click: console.log, color: 'primary', icon: 'el-icon-plus' },
    { name: '编辑', click: (tableSelect, button) => console.log('点击了编辑按钮, 当前表格选中的数据: ', tableSelect, '当前按钮配置: ', button), selectCount: 1, icon: 'el-icon-edit' },
    { name: '删除', confirmClick: () => alert('点击了删除'), selectMin: 1, color: 'danger', icon: 'el-icon-close' },
  ]
}
```



## 配置属性

| 属性名       | 说明                                                         | 类型               | 默认值 | 可选值                                                       |
| ------------ | ------------------------------------------------------------ | ------------------ | ------ | ------------------------------------------------------------ |
| name         | 按钮显示文字                                                 | string             | -      | -                                                            |
| color        | 按钮的颜色<br/>颜色取自 Element UI Button 组件的 [type 属性](https://element.eleme.cn/#/zh-CN/component/button#attributes) | string             | -      | `'primary'` 蓝色<br/>`'success'` 绿色<br/>`'info'` 灰色<br/>`'warning'` 黄色<br/>`'danger'` 红色<br/>`'text'`文字按钮 |
| icon         | 图标                                                         | string             | -      | 见 [图标集合](https://element.eleme.cn/#/zh-CN/component/icon#tu-biao-ji-he) |
| click        | 点击事件。函数参数依次为 数据表格选中的数据、当前按钮的配置信息。 | function           | -      | -                                                            |
| confirmClick | 确认点击事件。点击按钮后会弹出二次确认框，用户确认后才会调用函数。函数的参数与 `click` 属性保持一致。 | function           | -      | -                                                            |
| hidden       | 是否隐藏按钮, 见 [hidden 说明](#hidden-是否隐藏按钮)         | boolean / function | false  | -                                                            |
| selectMin    | 指定数据表格的最少选中数量，若选中的条数不足，则进行提示。   | number             | -      | -                                                            |
| selectMax    | 指定数据表格的最多选中数量，若选中的条数超出，则进行提示。   | number             | -      | -                                                            |
| selectCount  | 指定数据表格的选中数量，若选中的条数超出或不足，则进行提示。 | number             | -      | -                                                            |



### hidden 是否隐藏按钮

`hidden` 可配置为布尔值或函数类型：

- 当为布尔值时：

  - `true` 代表隐藏按钮。

  - `false` 代表显示按钮。

- 当为函数时，组件会调用该函数，函数的参数与 `click` 函数的参数一致（即数据表格选中的数据和当前按钮的配置信息）。该函数需要返回布尔值：

  - `true` 代表隐藏按钮。

  - `false` 代表显示按钮。

这种方式可以用于按钮权限的判断。



## 插槽
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

