// 菜单 侧边栏
export default [
  // { path: '/index', title: '首页', icon: 'home' },
  {
    id: 42,
    title: '询单管理',
    title_en:'Inquiry management',
    icon: 'reorder',
    children: [
      { path: '/Inquery/inquery', title: '询单录入',title_en:'Input inquiry', id: 414 },
      // { path: '/Inquery/inqueryStock', title: '备货询单',title_en:'Input Stock', id: 414 },
      { path: '/Inquery/source', title: '询单来源',title_en:'Inquiry source', id: 404 },
      { path: '/Inquery/SalerAllocList', title: '询单销售分配',title_en:'Assignment of inquiry for sales', id: 409 },
      { path: '/Set/order', title: '询单采购分配',title_en:'Assignment of inquiry for buyer', id: 32 },
      { path: '/Set/market', title: '国家销售分配',title_en:'Sales in charge for market of specified country ', id: 31 },
      { path: '/Inquery/assigned_quantity', title: '询单分配数量设置',title_en:'Allocation quantity setting',is_name:true, name:'inquiry_set.manage'},
      { path: '/Inquery/group_settings', title: '项目组设置',title_en:'Project group settings', is_name:true, name:'userSettingIndex'},
    ]
  },
  {
    id: 458,
    title: '销售合同',
    title_en:'Sales contract',
    icon: 'archive',
    children: [
      { path: '/sales/sales', title: '销售合同',title_en:'Sales contract', id: 459 },
      { path: '/sales/index_internal', title: '内部销售合同',title_en:'Internal sales contract', is_name:true, name:'sales_contract_nb.manage' },
      { path: '/sales/sales_children', title: '销售子合同',title_en:'Sales children contract',is_name:true, name:'sales_contract_count.details' },
      { path: '/sales/ss_generate', title: '生成合同',title_en:'Generate contract', id: 461 },
      { path: '/sales/notice', title: '待通知发货',title_en:'Delivery after receipt of noticiation', id: 470 },
      { path: '/sales/notice_check', title: '开票通知审核',title_en:'Approval of Involice notification', id: 5 },
      { path: '/sales/notice_verify_check', title: '开票主管审核',title_en:'Check by billing Supervisor',is_name:true, name:'invoice.notice_verify_list' },
      // { path: '/sales/change', title: '合同变更', id: 482 }
      { path: '/sales/Red_invoice', title: '红字发票',title_en:'Red ink invoice', is_name:true, name:'invoice.credit_note' },
      { path: '/sales/ship_notice', title: '发货通知',title_en:'Delivery notification', id: 570 },
      { path: '/sales/count', title: '销售合同统计',title_en:'Sales contract statistics', id: 592 },
      { path: '/sales/sales_statistics', title: '销售额统计',title_en:'Sales statistics', is_name:true, name:'sales_contract_count.sales_statistics' },
      { path: '/sales/batch_party_a', title: '合同添加甲方',title_en:'Add Party A', is_name:true, name:'sales_contract.batch_party_a' },
      { path: '/sales/contract_import', title: '自动生成合同导入',title_en:'Generate contract import', is_name:true, name:'sales_contract.auto_contract' },
      { path: '/sales/due_data_change', title: '收款账期审核',title_en:'Accounting period audit', is_name:true, name:'due_data_change.verify_manage' },
      { path: '/sales/audit_allocation', title: '合同审核分配',title_en:'Audit allocation',is_name:true, name:'sales_contract_set.manage' },
    ]
  },
  {
    id: 493,
    title: '采购合同',
    icon: 'archive',
    children: [
      { path: '/procure/notice', title: '通知单', id: 72 },
      { path: '/procure/contract', title: '采购合同', id: 4 },
      { path: '/procure/invoice', title: '收票管理', id: 490 },
      { path: '/procure/package_list', title: '采购打包管理', id: 490 },
      { path: '/procure/return_invoice', title: '采购退票', id: 535 },
      { path: '/procure/huichuan', title: '采购合同回传', is_name:true, name:'ProcurementContract.huichuan' },
      { path: '/procure/checkInvoice', title: '采购合同销票', is_name:true, name:'ProcurementContractInvioceHexiao' },
      // { path: '/procure/apply', title: '付款申请审核', id: 494 }
    ]
  },
  {
    id: 510,
    title: '质检管理',
    icon: 'wrench',
    children: [
      { path: '/Quality/index', title: '质检订单', id: 237 },
      { path: '/Quality/cost', title: '检测项目', id: 22 },
      { path: '/Quality/sg', title: '谱图管理', is_name:true, name:'sg.index' },
      { path: '/Quality/COA', title: 'COA管理', is_name:true, name:'coa.index' },
      { path: '/Quality/coa_create', title: 'COA生成', is_name:true, name:'coa' },
    ]
  },
  {
    id: 501,
    title: '仓库管理',
    icon: 'institution',
    children: [
      { path: '/Warehouse/instore', title: '入库管理', id: 26 },
      { path: '/Warehouse/returns', title: '退货管理', id: 541 },
      { path: '/Warehouse/inventory', title: '库存管理', id: 30 },
      { path: '/Warehouse/ship', title: '发货管理', id: 6 },
      { path: '/Warehouse/profit_loss_review', title: '盘盈/亏审核', id: 521 },
      { path: '/Warehouse/allot_review', title: '调拨审核', id: 519 },
      { path: '/Warehouse/sample', title: '取样管理', id: 29 },
      { path: '/Warehouse/index', title: '仓库管理', id: 25 },
      { path: '/Warehouse/freight', title: '运费管理', id: 623 },
      { path: '/Warehouse/unit', title: '计量单位', id: 28 },
      { path: '/Warehouse/xunit', title: '虚计量单位', id: 19 },
      { path: '/Warehouse/ship_logs', title: '批次发货记录', id: 630 },
      { path: '/Warehouse/Documents', title: '报关单导入', is_name:true, name:'ship.customs_declaration_list'},
      // { path: '/Warehouse/transfer', title: '中转管理', id: 6 },
    ]
  },
  {
    id: 511,
    title: '产品管理',
    icon: 'product-hunt',
    children: [
      { path: '/Prod/index', title: '产品管理', id: 131 },
      { path: '/Prod/prod_category', title: '产品类别管理', id: 131 },
      { path: '/Prod/prodcate', title: '分类管理', id: 131 },
      { path: '/Prod/check', title: '产品急审', id: 560 },
      { path: '/Prod/declare', title: '申报要素', id: 192 },
      { path: '/Prod/import', title: '规格导入', id: 186 },
      { path: '/Prod/sup_import', title: '供应商产品导入',is_name:true, name:'prod.providedSupplierProdUploadIndex'},
      { path: '/Prod/forwarder', title: '货代MSDS', is_name:true, name:'ffmsds.manager'},
    ]
  },
  {
    id: 446,
    title: '用户管理',
    icon: 'users',
    children: [
      { path: '/User/index_new', title: '客户管理', id: 447 },
      // { path: '/User/supplier', title: '供应商管理', id: 453 },
      { path: '/User/supplier_index_new', title: '供应商管理', id: 453 },
      // { path: '/User/party', title: '乙方管理', id: 453 }
    ]
  },
  {
      is_name:true,
      name:'stat.mangage',
      title: '报表管理',
      icon: 'file-excel-o',
      children: [
          { path: '/dataReport/index', title: '客户-询单、订单报表管理',is_name:true, name:'recentio.manage'},
          { path: '/dataReport/saleorder', title: '客户订单-管理',is_name:true, name:'statsaleorder.manage'},
      ]
  },
  {
    id: 36,
    title: '财务管理',
    icon: 'credit-card',
    children: [
      { path: '/finance/account', title: '往来账', id: 221 },
      { path: '/finance/sale_invoice', title: '开票管理', id: 505 },
      { path: '/finance/sale_invoice_internal', title: '内部开票管理', is_name:true, name:'invoice_nb.billing_management' },
      { path: '/finance/return_sales_money', title: '销售退款管理', id: 571 },
      { path: '/finance/fee', title: '销售费用审核', id: 308 },
      { path: '/finance/pay', title: '销售费用付款', id: 311 },
      { path: '/finance/Purchasing_fees', title: '采购费用审核', id: 494 },
      { path: '/finance/payment', title: '采购费用付款', id: 506 },
      { path: '/finance/return_money', title: '采购费用退款', id: 573 },
      { path: '/finance/purchase_receipt_review', title: '采购收票审核', id:540},
      { path: '/finance/statistics_lists', title: '采购收票统计', id:582},
      { path: '/finance/ProcurementContract_statistics_lists', title: '采购合同统计', id:583},
      { path: '/finance/K3', title: 'K3', id:550},
      { path: '/procure/package_list', title: '采购打包管理', id:36},
      { path: '/finance/Customs', title: '报关数据', id:550},
    ]
  },
  {
    id: 503,
    title: '结算管理',
    icon: 'money',
    children: [
      { path: '/commission/Receipt_list', title: '收款登记', id: 482 },
      { path: '/commission/expression', title: '佣金公式', id: 504 },
      { path: '/commission/documentary', title: '跟单管理', is_name:true, name:'documentary.manage' },
      { path: '/commission/account_manage', title: '账号管理', is_name:true, name:'account.index' },
      { path: '/commission/subscription', title: '认款管理', is_name:true, name:'transactionpipe.index' },
      { path: '/commission/paymentsync', title: '支付同步', is_name:true, name:'paymentsync.index' },
      // { path: '/commission/exchange_rate', title: '汇率管理', id: 504 },
      // { path: '/commission/Receipt_list', title: '采购退款登记', id: 482 },
      // { path: '/commission/Receipt_list', title: '销售退款登记', id: 482 }
    ]
  },
  {
    id: 472,
    title: '系统设置',
    icon: 'cog',
    children: [
      { path: '/Set/role_Role', title: '角色管理', id: 473 },
      { path: '/Set/permission', title: '权限管理', id: 478 },
      {
        icon: 'asterisk',
        path: '/Enum/index',
        title: '枚举管理',
        id: 35
      },
      {
        icon: 'sitemap',
        path: '/Organize/index',
        title: '组织架构',
        id: 496
      }
    ]
  }
]
