import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
    path: '/Prod',
    name: 'Prod',
    meta,
    redirect: { name: 'Prod-index' },
    component: layoutHeaderAside,
    children: (pre => [
        {
            path: 'index',
            name: `${pre}index`,
            component: () => import('@/pages/Prod/index/index'),
            meta: {
                ...meta,
                title: '产品列表',
                cache: true,
            }
        },
        {
            path: 'index_notice',
            name: `${pre}index_notice`,
            component: () => import('@/pages/Prod/index/index_notice'),
            meta: {
                ...meta,
                title: '库存警戒',
                cache: true,
            }
        },
        {
            path: 'prodcate',
            name: `${pre}prodcate`,
            component: () => import('@/pages/Prod/prodcate/index'),
            meta: {
                ...meta,
                title: '分类管理',
                cache: true,
            }
        },
        {
            path: 'check',
            name: `${pre}check`,
            component: () => import('@/pages/Prod/index/check'),
            meta: {
                ...meta,
                title: '产品急审',
                cache: true,
            }
        },
        {
            path: 'declare',
            name: `${pre}declare`,
            component: () => import('@/pages/Prod/declare/index'),
            meta: {
                ...meta,
                title: '申报要素',
                cache: true,
            }
        },
        {
            path: 'forwarder',
            name: `${pre}forwarder`,
            component: () => import('@/pages/Prod/forwarder/index'),
            meta: {
                ...meta,
                title: '货代MSDS',
                cache: true,
            }
        },
        {
            path: 'import',
            name: `${pre}import`,
            component: () => import('@/pages/Prod/import/index'),
            meta: {
                ...meta,
                title: '导入',
                cache: true,
            }
        },
        {
            path: 'sup_import',
            name: `${pre}sup_import`,
            component: () => import('@/pages/Prod/sup_import/index'),
            meta: {
                ...meta,
                title: '供应商产品导入',
                cache: true,
            }
        },
        {
            path: 'prodCheck',
            name: `${pre}prodCheck`,
            component: () => import('@/pages/Prod/components/prodCheck'),
            meta: {
                ...meta,
                title: '审核',
                cache: true,
            }
        },
        {
            path: 'Add1',
            name: `${pre}Add1`,
            component: () => import('@/pages/Prod/components/Add1'),
            meta: {
                ...meta,
                title: '产品',
                cache: true,
            }
        },
        {
            path: 'Add2',
            name: `${pre}Add2`,
            component: () => import('@/pages/Prod/components/Add2'),
            meta: {
                ...meta,
                title: '产品',
                cache: true,
            }
        },{
            path: 'prod_category',
            name: `${pre}prod_category`,
            component: () => import('@/pages/Prod/prod_category/index'),
            meta: {
                ...meta,
                title: '产品类别管理',
                cache: true,
            }
        }
    ])('Prod-')
}
