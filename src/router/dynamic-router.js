import Main from '@/system-page/Main.vue';
import util from '@/libs/util.js';
import { mapActions } from 'vuex';


import userManagement from '@/system-page/authority/user.vue';
import roleManagement from '@/system-page/authority/role.vue';
import workgroupManagement from '@/system-page/authority/workGroup.vue';
import organizationManagement from '@/system-page/authority/organization.vue';
import loggingLogin from '@/system-page/logging/cscp_log_login.vue';
import loggingOperation from '@/system-page/logging/cscp_log_operation.vue';

let routeMap = new Map();
let xmlhttp;
let menus = [];
let vm_ = null;

export let initDynamicRouter = (vm) => {
    vm_ = vm;
    routeMap.set('user-management', userManagement);
    routeMap.set('role-management', roleManagement);
    routeMap.set('workgroup-management', workgroupManagement);
    routeMap.set('organization-management', organizationManagement);
    //routeMap.set('errorpage_index', errorpageIndex);
    routeMap.set('form', Main);
    //routeMap.set('errorpage', Main);
    routeMap.set('logging-login', loggingLogin);
    routeMap.set('logging-operation', loggingOperation);
    routeMap.set('logging-management', Main);
    xmlhttp = new XMLHttpRequest();
    //  2.监听Ajax引擎对象的改变
    xmlhttp.onreadystatechange = onMenuResponse;
    //设置请求url地址false代表同步
    xmlhttp.open('GET', util.baseUrl + '/api/system/cscpMenus', false);
    xmlhttp.setRequestHeader('Authorization', localStorage.token);
    xmlhttp.send(null);

    if (vm !== null) {
        //添加动态路由
        // 添加主界面路由
        vm.$store.commit('updateAppRouter', menus.filter(item => item.children.length > 0));
        // 刷新界面菜单
        vm.$store.commit('updateMenulist', menus.filter(item => item.children.length > 0));

        let tagsList = [];

        vm.$store.state.app.routers.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        vm.$store.commit('setTagsList', tagsList);
    } else {
        return menus;
    }

}

function makeMenuTree(data) {
    //console.log(JSON.stringify(data));

    var all = new Map();;
    var menus = [];
    for (var i = 0; i < data.length; i++) {
        var tmpData = new Object;
        tmpData.id = data[i].id;
        tmpData.parentId = data[i].parentId;
        if (!data[i].url) {
            //          console.log('选中有url的数据',data[i].name);
        }
        tmpData.path = data[i].url;
        tmpData.title = data[i].title;
        tmpData.name = data[i].name;
        tmpData.icon = data[i].icon;
        tmpData.type = data[i].type;
        tmpData.permissionCode = data[i].permissionCode;
        tmpData.c = data[i].component;
        //tmpData.type = data[i].type;
        //tmpData.permissionCode = data[i].permissionCode;
        tmpData.component = routeMap.get(data[i].name);

        //全局保存按钮权限数据
        if (tmpData.type == "button" && tmpData.permissionCode) {
            if (localStorage['btnPermissionCode']) {
                localStorage['btnPermissionCode'] += tmpData.permissionCode + ';';
            } else {
                localStorage['btnPermissionCode'] = tmpData.permissionCode + ';';
            }
        }

        if (tmpData.type == "menu" || tmpData.type == "dir") {
            if (tmpData.parentId == 0) {
                menus.push(tmpData);
            } else {
                all.set(tmpData.id, tmpData);
            }

        }
    }
    return setToTeee(menus, all);
}

function setToTeee(menus, all) {
    all.forEach(function (value, key, map) {
        if (value.parentId != 0) {
            setToTreeLeaf(menus, value);
            all.delete(key);
        }
    });
    //  console.log('折叠菜单',menus);
    return menus;
}

function setToTreeLeaf(tree, node) {
    for (var i = 0; i < tree.length; i++) {
        if (tree[i].id == node.parentId) {
            if (tree[i].children == null) {
                tree[i].children = [];
            }
            tree[i].children.push(node);
            return true;
        }
        if (tree[i].children != null) {
            var children = setToTreeLeaf(tree[i].children, node);
            if (children == true) {
                return true;
            }
        }
    }
    return false;
}

function onMenuResponse() {
    if (xmlhttp.readyState != 4) return;
    if (xmlhttp.status != 200) {
        //alert("Problem retrieving XML data");
        return;
    }
    //  console.log('第一次ajax返回数据',xmlhttp.response);
    menus = eval('(' + xmlhttp.response + ')');
    menus = makeMenuTree(menus);
    console.log('获取动态菜单', menus);
}