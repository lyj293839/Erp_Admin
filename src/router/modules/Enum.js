import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
    path: '/Enum',
    name: 'Enum',
    meta,
    redirect: { name: 'Enum-index' },
    component: layoutHeaderAside,
    children: (pre => [
        {
            path: 'index',
            name: `${pre}index`,
            component: () => import('@/pages/Enum/index/index'),
            meta: {
                ...meta,
                title: '枚举'
            }
        },
        {
            path: 'Currency',
            name: `${pre}Currency`,
            component: () => import('@/pages/Enum/Currency/index'),
            meta: {
                ...meta,
                title: 'Currency'
            }
        },
        {
            path: 'Danger',
            name: `${pre}Danger`,
            component: () => import('@/pages/Enum/Danger/index'),
            meta: {
                ...meta,
                title: 'Danger'
            }
        },
        {
            path: 'Dangerlevel',
            name: `${pre}Dangerlevel`,
            component: () => import('@/pages/Enum/Dangerlevel/index'),
            meta: {
                ...meta,
                title: 'Dangerlevel'
            }
        },
        {
            path: 'Dangertype',
            name: `${pre}Dangertype`,
            component: () => import('@/pages/Enum/Dangertype/index'),
            meta: {
                ...meta,
                title: 'Dangertype'
            }
        },
        {
            path: 'Invoicetype',
            name: `${pre}Invoicetype`,
            component: () => import('@/pages/Enum/Invoicetype/index'),
            meta: {
                ...meta,
                title: 'Invoicetype'
            }
        },
        {
            path: 'Packagelevel',
            name: `${pre}Packagelevel`,
            component: () => import('@/pages/Enum/Packagelevel/index'),
            meta: {
                ...meta,
                title: 'Packagelevel'
            }
        },
        {
            path: 'Spectag',
            name: `${pre}Spectag`,
            component: () => import('@/pages/Enum/Spectag/index'),
            meta: {
                ...meta,
                title: 'Spectag'
            }
        },
        {
            path: 'Trancondition',
            name: `${pre}Trancondition`,
            component: () => import('@/pages/Enum/Trancondition/index'),
            meta: {
                ...meta,
                title: 'Trancondition'
            }
        },
        {
            path: 'ExpressCompany',
            name: `${pre}ExpressCompany`,
            component: () => import('@/pages/Enum/ExpressCompany/index'),
            meta: {
                ...meta,
                title: 'ExpressCompany'
            }
        }, {
            path: 'CustomerLevel',
            name: `${pre}CustomerLevel`,
            component: () => import('@/pages/Enum/CustomerLevel/index'),
            meta: {
                ...meta,
                title: 'CustomerLevel'
            }
        }, {
            path: 'SupplierLevel',
            name: `${pre}SupplierLevel`,
            component: () => import('@/pages/Enum/SupplierLevel/index'),
            meta: {
                ...meta,
                title: 'SupplierLevel'
            }
        }, {
            path: 'SupplierTag',
            name: `${pre}SupplierTag`,
            component: () => import('@/pages/Enum/SupplierTag/index'),
            meta: {
                ...meta,
                title: 'SupplierTag'
            }
        }, {
            path: 'SupplierType',
            name: `${pre}SupplierType`,
            component: () => import('@/pages/Enum/SupplierType/index'),
            meta: {
                ...meta,
                title: 'SupplierType'
            }
        }, {
            path: 'OperationType',
            name: `${pre}OperationType`,
            component: () => import('@/pages/Enum/OperationType/index'),
            meta: {
                ...meta,
                title: 'OperationType'
            }
        }, {
            path: 'SettlementType',
            name: `${pre}SettlementType`,
            component: () => import('@/pages/Enum/SettlementType/index'),
            meta: {
                ...meta,
                title: 'SettlementType'
            }
        }, {
            path: 'QuoteFormulaType',
            name: `${pre}QuoteFormulaType`,
            component: () => import('@/pages/Enum/QuoteFormulaType/index'),
            meta: {
                ...meta,
                title: 'QuoteFormulaType'
            }
        }, {
            path: 'Usertype',
            name: `${pre}Usertype`,
            component: () => import('@/pages/Enum/Usertype/index'),
            meta: {
                ...meta,
                title: 'Usertype'
            }
        },{
            path: 'ChemicalType',
            name: `${pre}ChemicalType`,
            component: () => import('@/pages/Enum/ChemicalType/index'),
            meta: {
                ...meta,
                title: 'ChemicalType'
            }
        },{
            path: 'ChemicalAppearance',
            name: `${pre}ChemicalAppearance`,
            component: () => import('@/pages/Enum/ChemicalAppearance/index'),
            meta: {
                ...meta,
                title: 'ChemicalAppearance'
            }
        },{
            path: 'StorageCondition',
            name: `${pre}StorageCondition`,
            component: () => import('@/pages/Enum/StorageCondition/index'),
            meta: {
                ...meta,
                title: 'StorageCondition'
            }
        },{
            path: 'ProdNotice',
            name: `${pre}ProdNotice`,
            component: () => import('@/pages/Enum/ProdNotice/index'),
            meta: {
                ...meta,
                title: 'ProdNotice'
            }
        },{
            path: 'InquiryStatus',
            name: `${pre}InquiryStatus`,
            component: () => import('@/pages/Enum/InquiryStatus/index'),
            meta: {
                ...meta,
                title: 'InquiryStatus'
            }
        },{
            path: 'InquiryCancelReason',
            name: `${pre}InquiryCancelReason`,
            component: () => import('@/pages/Enum/InquiryCancelReason/index'),
            meta: {
                ...meta,
                title: 'InquiryCancelReason'
            }
        },{
            path: 'Testprodcate',
            name: `${pre}Testprodcate`,
            component: () => import('@/pages/Enum/Testprodcate/index'),
            meta: {
                ...meta,
                title: 'Testprodcate'
            }
        },{
            path: 'ResponsibleLevel',
            name: `${pre}ResponsibleLevel`,
            component: () => import('@/pages/Enum/ResponsibleLevel/index'),
            meta: {
                ...meta,
                title: 'ResponsibleLevel'
            }
        },{
            path: 'AdditionalCostType',
            name: `${pre}AdditionalCostType`,
            component: () => import('@/pages/Enum/AdditionalCostType/index'),
            meta: {
                ...meta,
                title: 'AdditionalCostType'
            }
        },{
            path: 'ContractProductType',
            name: `${pre}ContractProductType`,
            component: () => import('@/pages/Enum/ContractProductType/index'),
            meta: {
                ...meta,
                title: 'ContractProductType'
            }
        },{
            path: 'TradeMode',
            name: `${pre}TradeMode`,
            component: () => import('@/pages/Enum/TradeMode/index'),
            meta: {
                ...meta,
                title: 'TradeMode'
            }
        },{
            path: 'DeliveryType',
            name: `${pre}DeliveryType`,
            component: () => import('@/pages/Enum/DeliveryType/index'),
            meta: {
                ...meta,
                title: 'DeliveryType'
            }
        },{
            path: 'Cycle',
            name: `${pre}Cycle`,
            component: () => import('@/pages/Enum/Cycle/index'),
            meta: {
                ...meta,
                title: 'Cycle'
            }
        },{
            path: 'ContractNumberPrefix',
            name: `${pre}ContractNumberPrefix`,
            component: () => import('@/pages/Enum/ContractNumberPrefix/index'),
            meta: {
                ...meta,
                title: 'ContractNumberPrefix'
            }
        },{
            path: 'SaleSettlementMethod',
            name: `${pre}SaleSettlementMethod`,
            component: () => import('@/pages/Enum/SaleSettlementMethod/index'),
            meta: {
                ...meta,
                title: 'SaleSettlementMethod'
            }
        },{
            path: 'PurchaseSettlementMethod',
            name: `${pre}PurchaseSettlementMethod`,
            component: () => import('@/pages/Enum/PurchaseSettlementMethod/index'),
            meta: {
                ...meta,
                title: 'PurchaseSettlementMethod'
            }
        },{
            path: 'InvoiceInfo',
            name: `${pre}InvoiceInfo`,
            component: () => import('@/pages/Enum/InvoiceInfo/index'),
            meta: {
                ...meta,
                title: 'InvoiceInfo'
            }
        },
        {
            path: 'PackageType',
            name: `${pre}PackageType`,
            component: () => import('@/pages/Enum/PackageType/index'),
            meta: {
                ...meta,
                title: 'PackageType'
            }
        },
        {
            path: 'PayBank',
            name: `${pre}PayBank`,
            component: () => import('@/pages/Enum/PayBank/index'),
            meta: {
                ...meta,
                title: 'PayBank'
            }
        },
        {
            path: 'InventoryType',
            name: `${pre}InventoryType`,
            component: () => import('@/pages/Enum/InventoryType/index'),
            meta: {
                ...meta,
                title: 'InventoryType'
            }
        },
        {
            path: 'PayType',
            name: `${pre}PayType`,
            component: () => import('@/pages/Enum/PayType/index'),
            meta: {
                ...meta,
                title: 'PayType'
            }
        },
        {
            path: 'ProcurementWarehouse',
            name: `${pre}ProcurementWarehouse`,
            component: () => import('@/pages/Enum/ProcurementWarehouse/index'),
            meta: {
                ...meta,
                title: 'ProcurementWarehouse'
            }
        },
        {
            path: 'rate',
            name: `${pre}rate`,
            component: () => import('@/pages/Enum/rate/index'),
            meta: {
                ...meta,
                title: 'rate'
            }
        },

    ])('Enum-')
}
