## 左侧树

``` js
{
  tree: {
    name: '填报机构',     // 树名称
    field: 'deptId',     // 表格查询字段
    expandLevel: 1,      // 默认展开级别, 展开第一级
    api: '/getTreeData', // api 获取地址
    props: {             // 字段映射
      value: 'id',       // 值映射 api 响应数据的那个字段
      label: 'label'     // 名称映射 api 响应数据的那个字段
    }
  },
}
```