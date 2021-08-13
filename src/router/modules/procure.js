import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
    path: '/procure',
    name: 'procure',
    meta,
    redirect: { name: 'procure-index' },
    component: layoutHeaderAside,
    children: (pre => [
        {
            path: 'notice',
            name: `${pre}notice`,
            component: () => import('@/pages/procure/notice/index'),
            meta: {
                ...meta,
                title: '通知单列表',
                cache: true,
            }
        },
        {
            path: 'contract',
            name: `${pre}contract`,
            component: () => import('@/pages/procure/contract/index'),
            meta: {
                ...meta,
                title: '合同列表',
                cache: true,
            }
        },
        {
            path: 'contract_check',
            name: `${pre}contract_check`,
            component: () => import('@/pages/procure/contract_check/index'),
            meta: {
                ...meta,
                title: '合同列表-审核',
                cache: true,
            }
        },
        {
            path: 'invoice',
            name: `${pre}invoice`,
            component: () => import('@/pages/procure/invoice/index'),
            meta: {
                ...meta,
                title: '收票列表',
                cache: true,
            }
        }, {
            path: 'package',
            name: `${pre}package`,
            component: () => import('@/pages/procure/invoice/package'),
            meta: {
                ...meta,
                title: '采购合同打包管理',
                cache: true,
            }
        }, {
            path: 'package_list',
            name: `${pre}package_list`,
            component: () => import('@/pages/procure/invoice/package_list'),
            meta: {
                ...meta,
                title: '合同打包列表',
                cache: true,
            }
        },{
            path: 'return_invoice',
            name: `${pre}return_invoice`,
            component: () => import('@/pages/procure/return_invoice/index'),
            meta: {
                ...meta,
                title: '采购退票',
                cache: true,
            }
        },
        {
            path: 'return_invoice_detail',
            name: `${pre}return_invoice_detail`,
            component: () => import('@/pages/procure/return_invoice/refund'),
            meta: {
                ...meta,
                title: '采购退票详情',
                cache: true,
            }
        },
        {
            path: 'agree',
            name: `${pre}agree`,
            component: () => import('@/pages/procure/agree/agree'),
            meta: {
                ...meta,
                title: '合同详情',
                cache: true,
            }
        },
        {
            path: 'generate_agree',
            name: `${pre}generate_agree`,
            component: () => import('@/pages/procure/agree/generate_agree'),
            meta: {
                ...meta,
                title: '生成合同',
                cache: true,
            }
        },
        {
            path: 'check',
            name: `${pre}check`,
            component: () => import('@/pages/procure/agree/check'),
            meta: {
                ...meta,
                title: '审核',
                cache: true,
            }
        },
        {
            path: 'agreeNew',
            name: `${pre}agreeNew`,
            component: () => import('@/pages/procure/agree/agreeNew'),
            meta: {
                ...meta,
                title: '新增合同',
                cache: true,
            }
        },
        {
            path: 'packRequiery',
            name: `${pre}packRequiery`,
            component: () => import('@/pages/procure/agree/packRequiery'),
            meta: {
                ...meta,
                title: '分装要求',
                cache: true,
            }
        },
        {
            path: 'repurchase',
            name: `${pre}repurchase`,
            component: () => import('@/pages/procure/agree/repurchase'),
            meta: {
                ...meta,
                title: '重新采购',
                cache: true,
            }
        },
        {
            path: 'costApplication',
            name: `${pre}costApplication`,
            component: () => import('@/pages/procure/agree/costApplication'),
            meta: {
                ...meta,
                title: '费用申请',
                cache: true,
            }
        },
        {
            path: 'collection',
            name: `${pre}collection`,
            component: () => import('@/pages/procure/agree/collection'),
            meta: {
                ...meta,
                title: '收票详情',
                cache: true,
            }
        },
        {
            path: 'apply',
            name: `${pre}apply`,
            component: () => import('@/pages/procure/apply/index'),
            meta: {
                ...meta,
                title: '付款申请审核',
                cache: true,
            }
        },
        {
            path: 'change',
            name: `${pre}change`,
            component: () => import('@/pages/procure/change/index'),
            meta: {
                ...meta,
                title: '合同变更',
                cache: true,
            }
        },
        {
            path: 'change2',
            name: `${pre}change2`,
            component: () => import('@/pages/procure/change/index2'),
            meta: {
                ...meta,
                title: '合同变更',
                cache: true,
            }
        },
        {
            path: 'check_change',
            name: `${pre}check_change`,
            component: () => import('@/pages/procure/check_change/index'),
            meta: {
                ...meta,
                title: '合同变更审核',
                cache: true,
            }
        },
        {
            path: 'pay_apply_check',
            name: `${pre}pay_apply_check`,
            component: () => import('@/pages/procure/agree/pay_apply_check'),
            meta: {
                ...meta,
                title: '合同付款申请审核',
                cache: true,
            }
        },
        {
            path: 'pay_apply_agree',
            name: `${pre}pay_apply_agree`,
            component: () => import('@/pages/procure/agree/pay_apply_agree'),
            meta: {
                ...meta,
                title: '合同付款申请',
                cache: true,
            }
        },
        {
            path: 'huichuan',
            name: `${pre}huichuan`,
            component: () => import('@/pages/procure/huichuan/index'),
            meta: {
                ...meta,
                title: '采购合同回传',
                cache: true,
            }
        },
        {
            path: 'checkInvoice',
            name: `${pre}checkInvoice`,
            component: () => import('@/pages/procure/checkInvoice/index'),
            meta: {
                ...meta,
                title: '采购合同销票',
                cache: true,
            }
        },
        {
            path: 'checkInvoiceDetail',
            name: `${pre}checkInvoiceDetail`,
            component: () => import('@/pages/procure/checkInvoice/detail'),
            meta: {
                ...meta,
                title: '采购合同销票详情',
                cache: true,
            }
        },
        {
            path: 'checkInvoiceUnCheck',
            name: `${pre}checkInvoiceUnCheck`,
            component: () => import('@/pages/procure/checkInvoice/unCheck'),
            meta: {
                ...meta,
                title: '未查验通过的发票',
                cache: true,
            }
        },
        {
            path: 'checkInvoiceList',
            name: `${pre}checkInvoiceList`,
            component: () => import('@/pages/procure/checkInvoice/list'),
            meta: {
                ...meta,
                title: '发票关联采购合同',
                cache: true,
            }
        },
        {
            path: 'checkInvoiceRedList',
            name: `${pre}checkInvoiceRedList`,
            component: () => import('@/pages/procure/checkInvoice/redList'),
            meta: {
                ...meta,
                title: '红字列表',
                cache: true,
            }
        },
    ])('procure-')
}