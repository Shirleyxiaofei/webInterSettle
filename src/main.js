/* eslint-disable */
import Vue from 'vue';
import iView from 'iview';
import { router } from './router/index';
import { appRouter } from './router/system-router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import util from './libs/util';
import axios from 'axios';
import { initDynamicRouter } from '@/router/dynamic-router.js';
import Cookies from 'js-cookie';
import CtsiButton from './components/ctsi-button.vue';
import CtsiDicSelect from './components/ctsi-dic-select.vue';

import JSEncrypt from 'jsencrypt';

axios.defaults.withCredentials = true;

Vue.use(VueI18n);
Vue.use(iView);

window.addEventListener('beforeunload', e => {
    localStorage.isFresh = true;
});

Vue.component('ctsi-button', CtsiButton);
Vue.component('ctsi-dic-select', CtsiDicSelect);


Vue.prototype.$util = util;

export let vm = new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted() {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist', []);
        // iview-admin检查更新
        // util.checkUpdate(this);
    },
    created() {
        //************************************* */
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});