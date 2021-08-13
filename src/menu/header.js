// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  // { path: '/demo/page1', title: '邮件询单', icon: 'folder-o' },
  // { path: '/page2', title: '采购报价询单', icon: 'folder-o' },
  // { path: '/demo/page3', title: '邮件管理', icon: 'folder-o' },
  // { path: '/demo/page4', title: '用户管理', icon: 'folder-o' },
  // { path: '/demo/page5', title: '公司管理', icon: 'folder-o' },
  {
    title: '用户管理',
    icon: 'folder-o',
    children: [
      { path: '/User/customer', title: '客户管理' },
      { path: '/User/supplier', title: '供应商管理' }
    ]
  },
  // {
  //     title: '质量管理',
  //     icon: 'folder-o',
  //     children: [
  //         { path: '/demo/Quality/index', title: '检测列表' },
  //     ]
  // },
  {
    title: '设置',
    icon: 'folder-o',
    children: [
      { path: '/Set/role_Role', title: '角色管理' },
      { path: '/Set/permission', title: '权限管理' }
    ]
  },
  {
    title: '枚举',
    icon: 'folder-o',
    children: [
      { path: '/Enum/index', title: '枚举列表' }
    ]
  },
  {
    title: '组织架构',
    icon: 'folder-o',
    children: [
      { path: '/Organize/index', title: '组织列表' }
    ]
  },
  {
    title: '产品',
    icon: 'folder-o',
    children: [
      { path: '/Prod/index', title: '产品列表' },
      { path: '/Prod/prodcate', title: '分类管理', id: 131 },
      { path: '/Prod/declare', title: '申报要素' }
    ]
  },
  {
    title: '询单',
    icon: 'folder-o',
    children: [
      { path: '/Inquery/index', title: '询单' },
      { path: '/Inquery/source', title: '询单来源' },
      { path: '/Inquery/SalerAllocList', title: '询单销售分配' },
      { path: '/Set/order', title: '询单采购分配' },
      { path: '/Set/market', title: '国家销售分配' }
    ]
  },
  {
    title: '质检',
    icon: 'folder-o',
    children: [
      { path: '/Quality/index', title: '质检列表' },
      { path: '/Quality/cost', title: '检测项目' }
    ]
  },
  {
    title: '仓库',
    icon: 'folder-o',
    children: [
      { path: '/Warehouse/index', title: '仓库' },
      { path: '/Warehouse/unit', title: '计量单位' },
      { path: '/Warehouse/xunit', title: '虚计量单位' },
      { path: '/Warehouse/instore', title: '入库管理' },
      { path: '/Warehouse/profit_loss_review', title: '盘盈/亏审核' },
      { path: '/Warehouse/allot_review', title: '调拨审核' },
      { path: '/Warehouse/sample', title: '取样列表' }
    ]
  },
  {
    title: '采购合同',
    icon: 'folder-o',
    children: [
      { path: '/procure/notice', title: '通知单列表' },
      { path: '/procure/contract', title: '合同列表' },
      { path: '/procure/invoice', title: '收票列表' }
    ]
  },
  {
    title: '财务管理',
    icon: 'folder-o',
    children: [
      { path: '/finance/fee', title: '费用审核' },
      { path: '/finance/pay', title: '付款管理' },
      { path: '/finance/account', title: '往来账' },
      { path: '/finance/sale_invoice', title: '销售合同开票' },
      { path: '/finance/Purchasing_fees', title: '采购费用审核' },
      { path: '/finance/purchase_receipt_review', title: '采购收票审核'},
    ]
  },
  {
    title: '其他管理',
    icon: 'money',
    children: [
      { path: '/commission/expression', title: '佣金公式' }
    ]
  }
]
