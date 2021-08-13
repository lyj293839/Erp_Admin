import { version } from '../package'

export default {
  // 快捷键
  // 支持快捷键 例如 ctrl+shift+s
  hotkey: {
    search: {
      open: 's',
      close: 'esc'
    }
  },
  // 侧边栏默认折叠状态
  menu: {
    asideCollapse: false
  },
  // 在读取持久化数据失败时默认页面
  page: {
    opened: [
      {
        name: 'index',
        meta: {
          title: '首页',
          requiresAuth: false
        }
      }
    ]
  },
  // 版本
  releases: {
    version
  },
  // 菜单搜索
  search: {
    enable: true
  },
  // 注册的主题
  // theme: {
  //   list: [
  //     {
  //       title: '邮件询单',
  //       name: 'd2',
  //       preview: 'image/module/m1.png',
  //       href: '/page1'
  //     },
  //     {
  //       title: '采购报价询单',
  //       name: 'violet',
  //       preview: 'image/module/m2.png',
  //       href: '/page2'
  //     },
  //
  //     {
  //       title: '邮件管理',
  //       name: 'star',
  //       preview: 'image/module/m4.png',
  //       href: '/page3'
  //     },
  //     {
  //       title: '实验室',
  //       name: 'tomorrow-night-blue',
  //       preview: 'image/module/m5.png',
  //       href: '/page3'
  //     },
  //     {
  //       title: '采购',
  //       name: 'line',
  //       preview: 'image/module/m7.png',
  //       href: '/page3'
  //     },
  //     {
  //       title: '角色管理',
  //       name: 'role',
  //       preview: 'image/module/m7.png',
  //       href: '/page4'
  //     }
  //   ],
  //   module: [],
  //   names: []
  // },
    theme: {
        list: [
            {
                title: '经典',
                name: 'd2',
                preview: 'image/theme/d2/preview@2x.png'
            },
            {
                title: '深蓝',
                name: 'blue',
                preview: 'image/theme/tomorrow-night-blue/preview@2x.png'
            },
            {
                title: '流星',
                name: 'star',
                backgroundImage: 'image/theme/star/bg.jpg',
                preview: 'image/theme/star/preview@2x.png'
            },
            {
                title: '紫罗兰',
                name: 'violet',
                preview: 'image/theme/violet/preview@2x.png'
            },
            {
                title: '简约线条',
                name: 'line',
                backgroundImage: 'image/theme/line/bg.jpg',
                preview: 'image/theme/line/preview@2x.png'
            },
            // {
            //     title: 'Tomorrow Night Blue (vsCode)',
            //     name: 'tomorrow-night-blue',
            //     preview: 'image/theme/tomorrow-night-blue/preview@2x.png'
            // }
        ]
    },
  // 是否默认开启页面切换动画
  transition: {
    active: false
  },
  // 在读取持久化数据失败时默认用户信息
  user: {
    info: {
      name: 'Ghost'
    }
  }
}
