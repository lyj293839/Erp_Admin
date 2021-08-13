import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
    path: '/sales',
    name: 'sales',
    meta,
    redirect: { name: 'sales-index' },
    component: layoutHeaderAside,
    children: (pre => [
        {
            path: 'sales',
            name: `${pre}sales`,
            component: () => import('@/pages/sales/sales/index'),
            meta: {
                ...meta,
                title: '销售合同列表',
                title_en:'Sales contract',
                cache: true,
            }
        },
        {
            path: 'sales_children',
            name: `${pre}sales_children`,
            component: () => import('@/pages/sales/sales/children'),
            meta: {
                ...meta,
                title: '销售子合同列表',
                title_en:'Sales children contract',
                cache: true,
            }
        },
        {
            path: 'due_data_change',
            name: `${pre}due_data_change`,
            component: () => import('@/pages/sales/sales/due_data_change'),
            meta: {
                ...meta,
                title: '收款账期审核',
                title_en:'Accounting period audit',
                cache: true,
            }
        },
        {
            path: 'batch_party_a',
            name: `${pre}batch_party_a`,
            component: () => import('@/pages/sales/sales/batch_party_a'),
            meta: {
                ...meta,
                title: '合同添加甲方',
                title_en:'Add Party A',
                cache: true,
            }
        },
        {
            path: 'list_check',
            name: `${pre}list_check`,
            component: () => import('@/pages/sales/sales/list_check'),
            meta: {
                ...meta,
                title: '销售合同列表-审核',
                title_en:'Sales contract',
                cache: true,
            }
        },
        {
            path: 'add',
            name: `${pre}add`,
            component: () => import('@/pages/sales/sales/add'),
            meta: {
                ...meta,
                title: '新建销售合同',
                title_en:'New sales contract',
                cache: true,
            }
        },
        {
            path: 'detail',
            name: `${pre}detail`,
            component: () => import('@/pages/sales/sales/detail'),
            meta: {
                ...meta,
                title: '销售合同详情',
                title_en:'Sales contract details',
                cache: true,
            }
        },
        {
            path: 'alter',
            name: `${pre}alter`,
            component: () => import('@/pages/sales/sales/alter'),
            meta: {
                ...meta,
                title: '销售合同修改',
                title_en:'Modification of sales contract',
                cache: true,
            }
        },
        {
            path: 'check',
            name: `${pre}check`,
            component: () => import('@/pages/sales/sales/check'),
            meta: {
                ...meta,
                title: '销售合同审核',
                title_en:'Sales contract review',
                cache: true,
            }
        },
        {
            path: 'generate',
            name: `${pre}generate`,
            component: () => import('@/pages/sales/sales/generate'),
            meta: {
                ...meta,
                title: '生成销售合同',
                title_en:'Generate sales contract',
                cache: true,
            }
        },
        {
            path: 'preemption',
            name: `${pre}preemption`,
            component: () => import('@/pages/sales/sales/preemption'),
            meta: {
                ...meta,
                title: '预占',
                title_en:'Preoccupy',
                cache: true,
            }
        },
        {
            path: 'invoice',
            name: `${pre}invoice`,
            component: () => import('@/pages/sales/sales/invoice'),
            meta: {
                ...meta,
                title: '开票申请',
                title_en:'Application for opening an invoice',
                cache: true,
            }
        },
        {
            path: 'costApplication',
            name: `${pre}costApplication`,
            component: () => import('@/pages/sales/sales/costApplication'),
            meta: {
                ...meta,
                title: '费用申请',
                title_en:'Cost application',
                cache: true,
            }
        },
        {
            path: 'procure',
            name: `${pre}procure`,
            component: () => import('@/pages/sales/sales/procure'),
            meta: {
                ...meta,
                title: 'Purchasing requisition',
                title_en:'',
                cache: true,
            }
        },

        {
            path: 'ss_generate',
            name: `${pre}ss_generate`,
            component: () => import('@/pages/sales/generate'),
            meta: {
                ...meta,
                title: '生成合同列表',
                title_en:'Generate contract list',
                cache: true,
            }
        },{
            path: 'notice',
            name: `${pre}notice`,
            component: () => import('@/pages/sales/sales/notice'),
            meta: {
                ...meta,
                title: '待通知发货列表',
                title_en:'Delivery after receipt of noticiation',
                cache: true,
            }
        },{
            path: 'notice_detail',
            name: `${pre}notice_detail`,
            component: () => import('@/pages/sales/sales/notice_detail'),
            meta: {
                ...meta,
                title: '发货通知详情',
                title_en:'Delivery notice details',
                cache: true,
            }
        },
        {
            path: 'notice_check',
            name: `${pre}notice_check`,
            component: () => import('@/pages/sales/sales/notice_check'),
            meta: {
                ...meta,
                title: "开票通知审核",
                title_en:'Approval of Involice notification',
                cache: true,
            }
        },
        {
            path: 'Red_invoice',
            name: `${pre}Red_invoice`,
            component: () => import('@/pages/sales/sales/Red_invoice'),
            meta: {
                ...meta,
                title: "红字发票",
                title_en:'Red ink invoice',
                cache: true,
            }
        },
        {
            path: 'Red_invoice_detail',
            name: `${pre}Red_invoice_detail`,
            component: () => import('@/pages/sales/sales/Red_invoice_detail'),
            meta: {
                ...meta,
                title: "红字发票详情",
                title_en:'Red ink invoice',
                cache: true,
            }
        },
        {
            path: 'notice_verify_check',
            name: `${pre}notice_verify_check`,
            component: () => import('@/pages/sales/sales/notice_verify_check'),
            meta: {
                ...meta,
                title: "开票主管审核",
                title_en:'Approval of Involice notification',
                cache: true,
            }
        },
        {
            path: 'notice_check_detail',
            name: `${pre}notice_check_detail`,
            component: () => import('@/pages/sales/sales/notice_check_detail'),
            meta: {
                ...meta,
                title: "开票通知审核详情",
                title_en:'Invoice notice review details',
                cache: true,
            }
        },
        {
            path: 'notice_verify_check_detail',
            name: `${pre}notice_verify_check_detail`,
            component: () => import('@/pages/sales/sales/notice_verify_check_detail'),
            meta: {
                ...meta,
                title: "开票主管审核详情",
                title_en:'Invoice notice review details',
                cache: true,
            }
        },
        {
            path: 'change',
            name: `${pre}change`,
            component: () => import('@/pages/sales/sales/change'),
            meta: {
                ...meta,
                title: "合同变更",
                title_en:'Contract changes',
                cache: true,
            }
        },
        {
            path: 'change_check',
            name: `${pre}change_check`,
            component: () => import('@/pages/sales/sales/change_check'),
            meta: {
                ...meta,
                title: "合同变更审核",
                title_en:'Contract change review',
                cache: true,
            }
        },
        {
            path: 'ship_notice',
            name: `${pre}ship_notice`,
            component: () => import('@/pages/sales/sales/ship_notice'),
            meta: {
                ...meta,
                title: "发货通知",
                title_en:'Delivery notification',
                cache: true,
            }
        },{
            path: 'ship_notice_detail',
            name: `${pre}ship_notice_detail`,
            component: () => import('@/pages/sales/sales/ship_notice_detail'),
            meta: {
                ...meta,
                title: "发货通知详情",
                title_en:'Delivery notification Detail',
                cache: true,
            }
        },{
            path: 'count',
            name: `${pre}count`,
            component: () => import('@/pages/sales/sales/count'),
            meta: {
                ...meta,
                title: "销售合同统计",
                title_en:'Sales contract statistics',
                cache: true,
            }
        },{
            path: 'sales_statistics',
            name: `${pre}sales_statistics`,
            component: () => import('@/pages/sales/sales/sales_statistics'),
            meta: {
                ...meta,
                title: "销售额统计",
                title_en:'Sales statistics',
                cache: true,
            }
        },{
            path: 'revise',
            name: `${pre}revise`,
            component: () => import('@/pages/sales/sales/revise'),
            meta: {
                ...meta,
                title: '修改销售合同',
                title_en:'Revise sales contract',
                cache: true,
            }
        },{
            path: 'contract_import',
            name: `${pre}contract_import`,
            component: () => import('@/pages/sales/sales/contract_import'),
            meta: {
                ...meta,
                title: '自动生成合同导入',
                title_en:'Generate contract import',
                cache: true,
            }
        },{
            path: 'index_internal',
            name: `${pre}index_internal`,
            component: () => import('@/pages/sales/sales/index_internal'),
            meta: {
                ...meta,
                title: '内部销售合同',
                title_en:'Internal sales contract',
                cache: true,
            }
        },{
            path: 'detail_internal',
            name: `${pre}detail_internal`,
            component: () => import('@/pages/sales/sales/detail_internal'),
            meta: {
                ...meta,
                title: '内部销售合同详情',
                title_en:'Internal sales contract',
                cache: true,
            }
        },{
            path: 'audit_allocation',
            name: `${pre}audit_allocation`,
            component: () => import('@/pages/sales/sales/audit_allocation'),
            meta: {
                ...meta,
                title: '合同审核分配',
                title_en:'Audit allocation',
                cache: true,
            }
        },
        
    ])('sales-')
}