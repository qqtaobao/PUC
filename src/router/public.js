
const routers = [
    {
        path: '/login',
        name: 'login',
        component: () => import( /* webpackChunkName: 'login' */ '@/views/public/login.vue'),
    },
    {
        path: '/',
        name: '/',
        component: () => import('@/layout/index.vue'),
        redirect: '/home',
        meta: {
            isKeepAlive: true,
        },
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import( /* webpackChunkName: 'Home' */ '@/views/public/Home.vue'),
                meta: {
                    title: 'message.router.home',
                    isLink: '',
                    isHide: false,
                    isKeepAlive: true,
                    isAffix: true,
                    isIframe: false,
                    roles: ['admin', 'common'],
                    icon: 'iconfont icon-shouye',
                },
            },
            {
                path: '/setting',
                name: 'setting',
                component: () => import( /* webpackChunkName: 'setting' */ '@/views/public/setting.vue'),
                meta: {
                    title: 'message.router.setting',
                    isLink: '',
                    isHide: false,
                    isKeepAlive: true,
                    isAffix: true,
                    isIframe: false,
                    roles: ['admin', 'common'],
                    icon: 'iconfont icon-shouye',
                },
            }
        ]
    }
]
export default routers;