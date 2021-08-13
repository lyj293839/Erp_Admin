import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
    path: '/User',
    name: 'User',
    meta,
    redirect: { name: 'User-index' },
    component: layoutHeaderAside,
    children: (pre => [
        {
            path: 'customer',
            name: `${pre}customer`,
            component: () => import('@/pages/User/customer/index'),
            meta: {
                ...meta,
                title: '客户管理',
                cache: true,
            },
        },
        {
            path: 'customerAdd',
            name: `${pre}customerAdd`,
            component: () => import('@/pages/User/customer/add'),
            meta: {
                ...meta,
                title: '客户新增',
                cache: true,
            },
        },
        {
            path: 'customerForm',
            name: `${pre}customerForm`,
            component: () => import('@/pages/User/customer/form'),
            meta: {
                ...meta,
                title: '客户编辑',
                cache: true,
            },
        },
        {
            path: 'supplier',
            name: `${pre}supplier`,
            component: () => import('@/pages/User/supplier/index'),
            meta: {
                ...meta,
                title: '供应商管理',
                cache: true,
            }
        },
        {
            path: 'supplierAdd',
            name: `${pre}supplierAdd`,
            component: () => import('@/pages/User/supplier/add'),
            meta: {
                ...meta,
                title: '供应商新增',
                cache: true,
            }
        },
        {
            path: 'supplierForm',
            name: `${pre}supplierForm`,
            component: () => import('@/pages/User/supplier/form'),
            meta: {
                ...meta,
                title: '供应商编辑',
                cache: true,
            }
        },
        {
            path: 'addNew',
            name: `${pre}addNew`,
            component: () => import('@/pages/User/customer/addNew'),
            meta: {
                ...meta,
                title: '客户页面',
                cache: true,
            }
        },
        {
            path: 'supplier_addNew',
            name: `${pre}supplier_addNew`,
            component: () => import('@/pages/User/supplier/supplier_addNew'),
            meta: {
                ...meta,
                title: '供应商页面',
                cache: true,
            }
        },{
            path: 'edit_user',
            name: `${pre}edit_user`,
            component: () => import('@/pages/User/edit_user/index'),
            meta: {
                ...meta,
                title: '编辑账户信息',
                cache: true,
            }
        },{
            path: 'index_new',
            name: `${pre}index_new`,
            component: () => import('@/pages/User/customer/index_new'),
            meta: {
                ...meta,
                title: '客户列表',
                cache: true,
            }
        },{
            path: 'supplier_index_new',
            name: `${pre}supplier_index_new`,
            component: () => import('@/pages/User/supplier/index_new'),
            meta: {
                ...meta,
                title: '供应商列表',
                cache: true,
            }
        },{
            path: 'party',
            name: `${pre}party`,
            component: () => import('@/pages/User/party/index'),
            meta: {
                ...meta,
                title: '乙方管理',
                cache: true,
            }
        },{
            path: 'party_add',
            name: `${pre}party_add`,
            component: () => import('@/pages/User/party/add'),
            meta: {
                ...meta,
                title: '乙方页面',
                cache: true,
            }
        },
    ])('User-')
}
