import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
  path: '/Warehouse',
  name: 'Warehouse',
  meta,
  redirect: { name: 'Warehouse-index' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'index',
      name: `${pre}index`,
      component: () => import('@/pages/Warehouse/index/index'),
      meta: {
        ...meta,
        title: '仓库',
        cache: true
      }
    },
    {
      path: 'unit',
      name: `${pre}unit`,
      component: () => import('@/pages/Warehouse/unit/index'),
      meta: {
        ...meta,
        title: '计量单位',
        cache: true
      }
    },
    {
      path: 'xunit',
      name: `${pre}xunit`,
      component: () => import('@/pages/Warehouse/xunit/index'),
      meta: {
        ...meta,
        title: '虚计量单位',
        cache: true
      }
    },
    {
      path: 'instore',
      name: `${pre}instore`,
      component: () => import('@/pages/Warehouse/instore/index'),
      meta: {
        ...meta,
        title: '入库管理',
        cache: true
      }
    },
    {
      path: 'instore_form2',
      name: `${pre}instore_form2`,
      component: () => import('@/pages/Warehouse/instore/instore_form2'),
      meta: {
        ...meta,
        title: '入库',
        cache: true
      }
    },
    {
      path: 'instoreForm',
      name: `${pre}instoreForm`,
      component: () => import('@/pages/Warehouse/instore/form'),
      meta: {
        ...meta,
        title: '采购入库',
        cache: true
      }
    },
    {
      path: 'inventory',
      name: `${pre}inventory`,
      component: () => import('@/pages/Warehouse/inventory/index'),
      meta: {
        ...meta,
        title: '库存管理',
        cache: true
      }
    },
    {
      path: 'ship',
      name: `${pre}ship`,
      component: () => import('@/pages/Warehouse/ship/index'),
      meta: {
        ...meta,
        title: '发货管理',
        cache: true
      }
    },
    {
      path: 'packing_list',
      name: `${pre}packing_list`,
      component: () => import('@/pages/Warehouse/ship/packing_list'),
      meta: {
        ...meta,
        title: '装箱单',
        cache: true
      }
    },
    {
      path: 'packing_list_kh',
      name: `${pre}packing_list_kh`,
      component: () => import('@/pages/Warehouse/ship/packing_list_kh'),
      meta: {
        ...meta,
        title: '凯化装箱单',
        cache: true
      }
    },
    {
      path: 'ship_detail',
      name: `${pre}ship_detail`,
      component: () => import('@/pages/Warehouse/ship_detail/index'),
      meta: {
        ...meta,
        title: '发货详情',
        cache: true
      }
    },
    {
      path: 'profit_loss_review',
      name: `${pre}profit_loss_review`,
      component: () => import('@/pages/Warehouse/profit_loss_review/index'),
      meta: {
        ...meta,
        title: '盘盈/亏审核',
        cache: true
      }
    },
    {
      path: 'allot_review',
      name: `${pre}allot_review`,
      component: () => import('@/pages/Warehouse/allot_review/index'),
      meta: {
        ...meta,
        title: '调拨审核',
        cache: true
      }
    },
    {
      path: 'sample',
      name: `${pre}sample`,
      component: () => import('@/pages/Warehouse/sample/index'),
      meta: {
        ...meta,
        title: '取样管理',
        cache: true
      }
    },
    {
      path: 'returns',
      name: `${pre}returns`,
      component: () => import('@/pages/Warehouse/returns/index'),
      meta: {
        ...meta,
        title: '退货管理',
        cache: true
      }
    },
    {
      path: 'inventory1',
      name: `${pre}inventory1`,
      component: () => import('@/pages/Warehouse/inventory/index_new'),
      meta: {
        ...meta,
        title: '老库存管理',
        cache: true
      }
    },
    {
      path: 'test',
      name: `${pre}test`,
      component: () => import('@/pages/Warehouse/inventory/test'),
      meta: {
        ...meta,
        title: '检测',
        cache: true
      }
    },
    {
      path: 'freight',
      name: `${pre}freight`,
      component: () => import('@/pages/Warehouse/freight/index'),
      meta: {
        ...meta,
        title: '运费管理',
        cache: true
      }
    },
    {
      path: 'ship_logs',
      name: `${pre}ship_logs`,
      component: () => import('@/pages/Warehouse/ship_logs/index'),
      meta: {
        ...meta,
        title: '批次发货记录',
        cache: true
      }
    },{
      path: 'Documents',
      name: `${pre}Documents`,
      component: () => import('@/pages/Warehouse/Documents/index'),
      meta: {
        ...meta,
        title: '报关单导入',
        cache: true
      }
    },{
      path: 'transfer',
      name: `${pre}transfer`,
      component: () => import('@/pages/Warehouse/transfer/index'),
      meta: {
        ...meta,
        title: '中转管理',
        cache: true
      }
    },
  ])('Warehouse-')
}
