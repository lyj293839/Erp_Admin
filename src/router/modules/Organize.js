import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
    path: '/Organize',
    name: 'Organize',
    meta,
    redirect: { name: 'Organize-index' },
    component: layoutHeaderAside,
    children: (pre => [
        {
            path: 'index',
            name: `${pre}index`,
            component: () => import('@/pages/Organize/index/index'),
            meta: {
                ...meta,
                title: '组织架构',
                cache: true,
            }
        },
        {
            path: 'edit',
            name: `${pre}edit`,
            component: () => import('@/pages/Organize/index/edit'),
            meta: {
                ...meta,
                title: '公司编辑',
                cache: true,
            }
        },
        {
            path: 'edit_new',
            name: `${pre}edit_new`,
            component: () => import('@/pages/Organize/index/edit_new'),
            meta: {
                ...meta,
                title: '新公司编辑',
                cache: true,
            }
        },
    ])('Organize-')
}
