import layoutHeaderAside from '@/layout/header-aside'

const meta = { auth: true }

export default {
  path: '/Quality',
  name: 'Quality',
  meta,
  redirect: { name: 'Quality-index' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'index',
      name: `${pre}index`,
      component: () => import('@/pages/Quality/index/index'),
      meta: {
        ...meta,
        title: '检测订单',
        cache: true
      }
    },
    {
      path: 'cost',
      name: `${pre}cost`,
      component: () => import('@/pages/Quality/cost/index'),
      meta: {
        ...meta,
        title: '检测项目',
        cache: true
      }
    },
    {
      path: 'sg',
      name: `${pre}sg`,
      component: () => import('@/pages/Quality/sg/index'),
      meta: {
        ...meta,
        title: '谱图管理',
        cache: true
      }
    },
    {
      path: 'COA',
      name: `${pre}COA`,
      component: () => import('@/pages/Quality/COA/index'),
      meta: {
        ...meta,
        title: 'COA管理',
        cache: true
      }
    },
    {
      path: 'coa_create',
      name: `${pre}coa_create`,
      component: () => import('@/pages/Quality/coa_create/index'),
      meta: {
        ...meta,
        title: 'COA生成',
        cache: true
      }
    }
  ])('Quality-')
}
