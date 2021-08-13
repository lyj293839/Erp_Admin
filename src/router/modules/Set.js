import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
    path: '/Set',
    name: 'Set',
    meta,
    redirect: { name: 'Set-index' },
    component: layoutHeaderAside,
    children: (pre => [
        {
            path: 'role_Role',
            name: `${pre}role_Role`,
            component: () => import('@/pages/Set/role_Role/index'),
            meta: {
                ...meta,
                title: '角色管理',
                cache: true
            }
        },
        {
            path: 'permission',
            name: `${pre}permission`,
            component: () => import('@/pages/Set/permission/index'),
            meta: {
                ...meta,
                title: '权限管理',
                cache: true
            }
        },
        {
            path: 'market',
            name: `${pre}market`,
            component: () => import('@/pages/Set/market/index'),
            meta: {
                ...meta,
                title: '国家销售分配',
                title_en:'Sales in charge for market of specified country',
                cache: true
            }
        },
        {
            path: 'order',
            name: `${pre}order`,
            component: () => import('@/pages/Set/order/index'),
            meta: {
                ...meta,
                title: '询单采购分配',
                title_en:'Assignment of inquiry for buyer',
                cache: true
            }
        },
        {
            path: 'notice',
            name: `${pre}notice`,
            component: () => import('@/pages/Set/notice/index'),
            meta: {
                ...meta,
                title: '通知列表',
                cache: true
            }
        },
        {
            path: 'iframe',
            name: `${pre}iframe`,
            component: () => import('@/pages/iframe/index'),
            meta: {
                ...meta,
                title: 'iframe',
                cache: true
            }
        },
    ])('Set-')
}
