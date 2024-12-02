
``` js
{
  tree: {
    name: '填报机构',
    field: 'deptId',
    expandLevel: 1,
    api: '/system/dept/service/listByRoleId/' + this.$store.getters.currentRole.roleId,
    props: {
      label: 'label'
    }
  },
  search: [
    { field: 'year', label: "年份", type: 'year', default: new Date().getFullYear() + '' },
    { field: 'status', label: "审核状态", type: 'select', option: MetroPartyKhRecordStatusValueNameMapping }
  ],
  button: [
    { name: '导出明细', click: (tableSelect) => this.export(tableSelect.map(item => item.khRecordId)) },
    { name: '导出列表', click: (tableSelect) => this.exportList(tableSelect.map(item => item.khRecordId)) },
  ],
  table: {
    border: true,
    select: true,
    api: '/partyBuilding/kh/record/table',
    col: [
      { field: 'year', name: '年份', width: 55, align: 'center' },
      { field: 'deptName', name: "填报机构" },
      { field: 'khTemplateName', name: "考核模板", width: 150, align: 'center' },
      { type: 'score', field: 'self', name: "自评分", width: 100, align: 'center' },
      { type: 'score', field: 'reviewLevel3', name: "三级党委评分", width: 100, align: 'center' },
      { type: 'score', field: 'reviewLevel2', name: "二级党委评分", width: 100, align: 'center' },
      { type: 'score', field: 'reviewLevel1', name: "一级党委评分", width: 100, align: 'center' },
      { type: 'score', field: 'reviewMutual', name: "互评评分", width: 100, align: 'center' },
      {
        field: 'statusName', name: '审核状态', type: 'link', align: 'center',
        click: ({ row }) => this.$refs.recordReviewListDialog.open(row.khRecordId)
      },
      { field: 'createUsername', name: '填报人', width: 100, align: 'center' },
      { field: 'createTime', name: '填报时间', width: 170, align: 'center' },
      {
        name: '操作', type: 'button', button: [
          { name: '查看', click: ({ row }) => this.$refs.recordScore.open(row, 'review_show') },
          { name: '导出明细', click: ({ row }) => this.export([row.khRecordId]) }
        ], width: 150, align: 'center'
      }
    ]
  }
},
```