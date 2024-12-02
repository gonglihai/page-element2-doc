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