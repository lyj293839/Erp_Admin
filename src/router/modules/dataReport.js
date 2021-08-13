import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
    path: '/dataReport',
    name: 'dataReport',
    meta,
    redirect: { name: 'dataReport-index' },
    component: layoutHeaderAside,
    children: (pre => [
        {
            path: 'index',
            name: `${pre}index`,
            component: () => import('@/pages/dataReport/index'),
            meta: {
                ...meta,
                title: '客户-询单、订单报表管理',
                cache: true
            }
        },{
            path: 'saleorder',
            name: `${pre}saleorder`,
            component: () => import('@/pages/dataReport/saleorder'),
            meta: {
                ...meta,
                title: '客户订单-管理',
                cache: true
            }
        }
    ])('dataReport-')
}
