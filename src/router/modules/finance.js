import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
  path: '/finance',
  name: 'finance',
  meta,
  redirect: { name: 'finance-index' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'fee',
      name: `${pre}fee`,
      component: () => import('@/pages/finance/fee/index'),
      meta: {
        ...meta,
        title: '费用审核',
        cache: true
      }
    },
      {
          path: 'K3',
          name: `${pre}K3`,
          component: () => import('@/pages/finance/K/index'),
          meta: {
              ...meta,
              title: 'K3',
              cache: true
          }
      },
      {
          path: 'Customs',
          name: `${pre}Customs`,
          component: () => import('@/pages/finance/Customs/index'),
          meta: {
              ...meta,
              title: '报关数据',
              cache: true
          }
      },
    {
      path: 'return_sales_money',
      name: `${pre}return_sales_money`,
      component: () => import('@/pages/finance/return/sales_money'),
      meta: {
        ...meta,
        title: '销售退款管理',
        cache: false
      }
    },
      {
          path: 'return_sales_money_detail',
          name: `${pre}return_sales_money_detail`,
          component: () => import('@/pages/finance/return/sales_money_detail'),
          meta: {
              ...meta,
              title: '销售退款详情',
              cache: true
          }
      },
    {
      path: 'return_purchaser_money',
      name: `${pre}return_purchaser_money`,
      component: () => import('@/pages/finance/return/purchaser_money'),
      meta: {
        ...meta,
        title: '采购退款管理',
        cache: true
      }
    },
    {
      path: 'Purchasing_fees',
      name: `${pre}Purchasing_fees`,
      component: () => import('@/pages/finance/Purchasing_fees/index'),
      meta: {
        ...meta,
        title: '采购费用审核',
        cache: true
      }
    },
    {
      path: 'payment',
      name: `${pre}payment`,
      component: () => import('@/pages/finance/Purchasing_fees/payment'),
      meta: {
        ...meta,
        title: '采购费用付款',
        cache: true
      }
    },
    {
        path: 'return_money',
        name: `${pre}return_money`,
        component: () => import('@/pages/finance/Purchasing_fees/return_money'),
        meta: {
            ...meta,
            title: '采购费用退款',
            cache: true
        }
    },
    {
        path: 'return_money_detail',
        name: `${pre}return_money_detail`,
        component: () => import('@/pages/finance/Purchasing_fees/return_money_detail'),
        meta: {
            ...meta,
            title: '采购费用退款详情',
            cache: true
        }
    },
    {
      path: 'pay',
      name: `${pre}pay`,
      component: () => import('@/pages/finance/pay/index'),
      meta: {
        ...meta,
        title: '付款管理',
        cache: true
      }
    },
    {
      path: 'account',
      name: `${pre}account`,
      component: () => import('@/pages/finance/account/index'),
      meta: {
        ...meta,
        title: '往来账',
        cache: true
      }
    },
    {
      path: 'account_old',
      name: `${pre}account_old`,
      component: () => import('@/pages/finance/account/old'),
      meta: {
        ...meta,
        title: '往来账_old',
        cache: true
      }
    },
    {
      path: 'sale_invoice',
      name: `${pre}sale_invoice`,
      component: () => import('@/pages/finance/sale_invoice/index'),
      meta: {
        ...meta,
        title: '销售合同开票',
        cache: true
      }
    },
    {
      path: 'sale_invoice_detail',
      name: `${pre}sale_invoice_detail`,
      component: () => import('@/pages/finance/sale_invoice/detail'),
      meta: {
        ...meta,
        title: '销售合同开票详情',
        cache: true
      }
    },
    {
      path: 'sale_invoice_refund',
      name: `${pre}sale_invoice_refund`,
      component: () => import('@/pages/finance/sale_invoice/refund'),
      meta: {
        ...meta,
        title: '销售合同退票详情',
        cache: true
      }
    },
    {
      path: 'purchase_receipt_review',
      name: `${pre}purchase_receipt`,
      component: () => import('@/pages/finance/Purchasing_fees/receipt_review'),
      meta: {
        ...meta,
        title: '采购收票审核',
        cache: true
      }
    },
    {
        path: 'statistics_lists',
        name: `${pre}statistics_lists`,
        component: () => import('@/pages/finance/purchase_invoice/statistics_lists'),
        meta: {
            ...meta,
            title: '采购收票统计',
            cache: true
        }
    },
  {
      path: 'ProcurementContract_statistics_lists',
      name: `${pre}ProcurementContract_statistics_lists`,
      component: () => import('@/pages/finance/purchase_contract/statistics_lists'),
      meta: {
          ...meta,
          title: '采购合同统计',
          cache: true
      }
  },
    {
      path: 'doimport',
      name: `${pre}doimport`,
      component: () => import('@/pages/finance/sale_invoice/Doimport'),
      meta: {
        ...meta,
        title: '导入',
        cache: true
      }
    },{
      path: 'sale_invoice_internal',
      name: `${pre}sale_invoice_internal`,
      component: () => import('@/pages/finance/sale_invoice_internal/index'),
      meta: {
        ...meta,
        title: '内部开票管理',
        cache: true
      }
    },{
      path: 'sale_invoice_internal_detail',
      name: `${pre}sale_invoice_internal_detail`,
      component: () => import('@/pages/finance/sale_invoice_internal/detail'),
      meta: {
        ...meta,
        title: '内部开票详情',
        cache: true
      }
    },{
      path: 'doimport_internal',
      name: `${pre}doimport_internal`,
      component: () => import('@/pages/finance/sale_invoice_internal/Doimport'),
      meta: {
        ...meta,
        title: '内部导入',
        cache: true
      }
    },

  ])('finance-')
}
