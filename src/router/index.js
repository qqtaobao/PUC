import { createRouter, createWebHashHistory } from 'vue-router';
import publics from './public';
import localStorage from 'store';
const router = createRouter({ history: createWebHashHistory(), routes: [...publics], });
router.beforeEach((to, from, next) => {
    if (to.path !== '/login' && !localStorage.get('token')) { // 判断是否存在用户token  不存在则重新登录
        next({ path: '/login' });
    } else {
        next()
    }
});
export default router;