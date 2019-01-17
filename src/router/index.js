import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';
import { routers, otherRouter, appRouter } from './system-router';
import { initDynamicRouter } from "@/router/dynamic-router.js";
import store from '@/store';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);

function addDynamicRouters() {
    let menus = initDynamicRouter();
    if (menus.length > 0) {
        // 刷新界面菜单
        store.commit('updateAppRouter', menus.filter(item => item.children.length > 0));
        store.commit('updateMenulist', menus.filter(item => item.children.length > 0));
        let tagsList = [];
        store.state.app.routers.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        console.log('生成面包屑', tagsList)
        store.commit('setTagsList', tagsList);
        return false;
    } else {
        return true;
    }
}

// router.beforeEach((to, from, next) => {
//     iView.LoadingBar.start();
//     Util.title(to.meta.title);
//     if (localStorage.isFresh == "true") {
//         let isGoToLogin = addDynamicRouters();
//         localStorage.isFresh = false;
//         sessionStorage.addedRouter = true;
//         if (isGoToLogin) {
//             next({
//                 name: 'login'
//             })
//         } else {
//             if (sessionStorage.currentRouteName && sessionStorage.currentRouteName != 'null') {
//                 next({
//                     name: sessionStorage.currentRouteName
//                 });
//             } else {
//                 next({
//                     name: 'home_index'
//                 });
//             }
//         }
//     } else {
//         if (to.name == "login") {
//             Util.userLogout();
//             next();
//         } else {
//             let isGoToLogin = false;
//             if (!sessionStorage.currentRouteName) {
//                 if (!sessionStorage.addedRouter) {
//                     isGoToLogin = addDynamicRouters();
//                 }
//             }
//             if (isGoToLogin) {
//                 next({
//                     name: 'login'
//                 })
//             } else {
//                 if (localStorage.token) {
//                     next();
//                 } else {
//                     if (to.name == "login") {
//                         Util.userLogout();
//                         next();
//                     } else {
//                         next({
//                             name: 'login'
//                         })
//                     }
//                 }
//             }
//         }
//     }
// });

router.afterEach((to) => {
    Util.openNewPage(router.app, to.name, to.params, to.query);
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
