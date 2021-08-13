import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
    path: '/Inquery',
    name: 'Inquery',
    meta,
    redirect: { name: 'Inquery-index' },
    component: layoutHeaderAside,
    children: (pre => [
        {
            path: 'inquery',
            name: `${pre}inquery`,
            component: () => import('@/pages/Inquery/index/inquery'),
            meta: {
                ...meta,
                title: '询单',
                title_en:'Inquiry',
                cache: true,
            }
        },
        {
            path: 'inquery2',
            name: `${pre}inquery2`,
            component: () => import('@/pages/Inquery/index/inquery2'),
            meta: {
                ...meta,
                title: '询单2',
                title_en:'Inquiry two',
                cache: true,
            }
        },
        {
            path: 'inquery3',
            name: `${pre}inquery3`,
            component: () => import('@/pages/Inquery/index/inquery3'),
            meta: {
                ...meta,
                title: '询单3',
                title_en:'Inquiry three',
                cache: true,
            }
        },
        {
            path: 'inquery4',
            name: `${pre}inquery4`,
            component: () => import('@/pages/Inquery/index/inquery4'),
            meta: {
                ...meta,
                title: '询单4',
                title_en:'Inquiry four',
                cache: true,
            }
        },
        {
            path: 'inquery5',
            name: `${pre}inquery5`,
            component: () => import('@/pages/Inquery/index/inquery5'),
            meta: {
                ...meta,
                title: '询单5',
                title_en:'Inquiry five',
                cache: true,
            }
        },
        {
            path: 'inquery6',
            name: `${pre}inquery6`,
            component: () => import('@/pages/Inquery/index/inquery6'),
            meta: {
                ...meta,
                title: '询单6',
                title_en:'Inquiry six',
                cache: true,
            }
        },
        {
            path: 'inquery7',
            name: `${pre}inquery7`,
            component: () => import('@/pages/Inquery/index/inquery7'),
            meta: {
                ...meta,
                title: '询单7',
                title_en:'Inquiry seven',
                cache: true,
            }
        },
        {
            path: 'inquery8',
            name: `${pre}inquery8`,
            component: () => import('@/pages/Inquery/index/inquery8'),
            meta: {
                ...meta,
                title: '询单8',
                title_en:'Inquiry eight',
                cache: true,
            }
        },
        {
            path: 'inquery9',
            name: `${pre}inquery9`,
            component: () => import('@/pages/Inquery/index/inquery9'),
            meta: {
                ...meta,
                title: '询单9',
                title_en:'Inquiry nine',
                cache: true,
            }
        },
        {
            path: 'inquery10',
            name: `${pre}inquery10`,
            component: () => import('@/pages/Inquery/index/inquery10'),
            meta: {
                ...meta,
                title: '询单10',
                title_en:'Inquiry ten',
                cache: true,
            }
        },
        {
            path: 'inqueryStock',
            name: `${pre}inqueryStock`,
            component: () => import('@/pages/Inquery/index/inqueryStock'),
            meta: {
                ...meta,
                title: '备货询单',
                title_en:'Inquiry Stock',
                cache: true,
            }
        },
        {
            path: 'add',
            name: `${pre}add`,
            component: () => import('@/pages/Inquery/index/add'),
            meta: {
                ...meta,
                title: '新建询单',
                title_en:'New enquiry list',
                cache: true,
            }
        },
        {
            path: 'add_edit',
            name: `${pre}add_edit`,
            component: () => import('@/pages/Inquery/index/add_edit'),
            meta: {
                ...meta,
                title: '修改询单',
                title_en:'Amendment of enquiry list',
                cache: true,
            }
        },
        {
            path: 'import',
            name: `${pre}import`,
            component: () => import('@/pages/Inquery/index/imports'),
            meta: {
                ...meta,
                title: '询单导入',
                title_en:'Inquiry import',
                cache: true,
            }
        },
        {
            path: 'source',
            name: `${pre}source`,
            component: () => import('@/pages/Inquery/source/index'),
            meta: {
                ...meta,
                title: '询单来源',
                title_en:'Inquiry source',
                cache: true,
            }
        },{
            path: 'SalerAllocList',
            name: `${pre}SalerAllocList`,
            component: () => import('@/pages/Inquery/SalerAllocList/index'),
            meta: {
                ...meta,
                title: '询单销售分配',
                title_en:'Assignment of inquiry for sales',
                cache: true,
            }
        },{
            path: 'assigned_quantity',
            name: `${pre}assigned_quantity`,
            component: () => import('@/pages/Inquery/assigned_quantity/index'),
            meta: {
                ...meta,
                title: '询单分配数量设置',
                title_en:'Allocation quantity setting',
                cache: true,
            }
        },{
            path: 'group_settings',
            name: `${pre}group_settings`,
            component: () => import('@/pages/Inquery/group_settings/index'),
            meta: {
                ...meta,
                title: '项目组设置',
                title_en:'Project group settings',
                cache: true,
            }
        }

    ])('Inquery-')
}
