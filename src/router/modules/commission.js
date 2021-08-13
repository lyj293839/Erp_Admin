import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
    path: '/commission',
    name: 'commission',
    meta,
    redirect: { name: 'commission-index' },
    component: layoutHeaderAside,
    children: (pre => [
        {
            path: 'expression',
            name: `${pre}expression`,
            component: () => import('@/pages/commission/expression/index'),
            meta: {
                ...meta,
                title: '佣金公式',
                cache: true
            }
        },
        {
            path: 'Receipt',
            name: `${pre}Receipt`,
            component: () => import('@/pages/commission/receipt/Receipt'),
            meta: {
                ...meta,
                title: '批量收款',
                cache: true,
            }
        },
        {
            path: 'Receipt_new',
            name: `${pre}Receipt_new`,
            component: () => import('@/pages/commission/receipt/Receipt_new'),
            meta: {
                ...meta,
                title: '批量收款',
                cache: true,
            }
        },
        {
            path: 'Receipt_w',
            name: `${pre}Receipt_w`,
            component: () => import('@/pages/commission/receipt/Receipt_w'),
            meta: {
                ...meta,
                title: '往来账收款',
                cache: true,
            }
        },
        {
            path: 'Receipt_list',
            name: `${pre}Receipt_list`,
            component: () => import('@/pages/commission/receipt/Receipt_list'),
            meta: {
                ...meta,
                title: '收款列表',
                cache: true,
            }
        },
        {
            path: 'exchange_rate',
            name: `${pre}exchange_rate`,
            component: () => import('@/pages/commission/rate/exchange_rate'),
            meta: {
                ...meta,
                title: '汇率管理',
                cache: true,
            }
        },
        {
            path: 'documentary',
            name: `${pre}documentary`,
            component: () => import('@/pages/commission/documentary/index'),
            meta: {
                ...meta,
                title: '跟单管理',
                cache: true,
            }
        },
        {
            path: 'leading_in',
            name: `${pre}leading_in`,
            component: () => import('@/pages/commission/documentary/leading_in'),
            meta: {
                ...meta,
                title: '跟单导入',
                cache: true,
            }
        },
        {
            path: 'account_manage',
            name: `${pre}account_manage`,
            component: () => import('@/pages/commission/account_manage/index'),
            meta: {
                ...meta,
                title: '账号管理',
                cache: true,
            }
        },
        {
            path: 'subscription',
            name: `${pre}subscription`,
            component: () => import('@/pages/commission/subscription/index'),
            meta: {
                ...meta,
                title: '认款',
                cache: true,
            }
        },
        {
            path: 'paymentsync',
            name: `${pre}paymentsync`,
            component: () => import('@/pages/commission/paymentsync/index'),
            meta: {
                ...meta,
                title: '支付同步',
                cache: true,
            }
        },
    ])('commission-')
}
