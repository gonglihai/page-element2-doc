# search 查询条件

## 配置示例

``` js
{
  search: [
    { field: 'input1', name: '输入框' },
    { field: 'select1', name: '下拉框', type: 'select',
      option: [         // 静态选项
        { id: '1', name: '选项1' },
        { id: '2', name: '选项2' },
      ],
      api: '/getOption' // api 方式获取选项
      multiple: true,   // 多选
    },
    { field: 'date1', name: '日期', type: 'date' },
    { field: 'date2', name: '日期范围', type: 'date-range' },
    { field: 'date3', name: '年', type: 'year' },
    { field: 'date4', name: '年月', type: 'year-month' },
  ]
}
```
## 属性

| 属性名 | 说明                             | 默认值 | 示例值                                               |
| ------ | -------------------------------- | ------ | ---------------------------------------------------- |
| field  | 查询条件 form 对象内, 字段的键名 |        |                                                      |
| name   | 查询条件的标签名                 |        |                                                      |
| type   | 字段类型                         |        | `select`, `date`, `date-range`, `year`, `year-month` |

## type 字段类型

### `input` 输入框

### `select` 下拉框

### `date` 日期选择器

## 插槽 solt
