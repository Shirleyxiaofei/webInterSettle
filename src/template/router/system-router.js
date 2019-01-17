import Main from '@/system-page/Main.vue';
import util from '@/libs/util.js';

let routeMap = new Map();

import userManagement from '@/system-page/authority/user.vue';
import roleManagement from '@/system-page/authority/role.vue';
import workgroupManagement from '@/system-page/authority/workGroup.vue';
import organizationManagement from '@/system-page/authority/organization.vue';
import errorpageIndex from '@/system-page/error-page/error-page.vue';

routeMap.set('user-management', userManagement);
routeMap.set('role-management', roleManagement);
routeMap.set('workgroup-management', workgroupManagement);
routeMap.set('organization-management', organizationManagement);
routeMap.set('errorpage_index', errorpageIndex);

routeMap.set('form', Main);
routeMap.set('errorpage', Main);

routeMap

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () =>
        import('@/system-page/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () =>
        import('@/system-page/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () =>
        import('@/system-page/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () =>
        import('@/system-page/error-page/500.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () =>
        import('@/system-page/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [{
        path: 'home',
        title: {
            i18n: 'home'
        },
        name: 'home_index',
        component: () =>
            import('@/system-page/home/home.vue')
    },
    {
        path: 'ownspace',
        title: '个人中心',
        name: 'ownspace_index',
        component: () =>
            import('@/system-page/own-space/own-space.vue')
    },
    {
        path: 'selfEdit',
        title: '个人信息',
        name: 'selfEdit',
        component: () =>
            import('@/system-page/own-space/self-edit.vue')
    },
    {
        path: 'role/edit/:id',
        title: '角色编辑',
        name: 'role_edit',
        component: () =>
            import('@/system-page/authority/roleEdit.vue')
    },
    {
        path: 'workGroup/edit/:id',
        title: '工作组编辑',
        name: 'work_group_edit',
        component: () =>
            import('@/system-page/authority/workGroupEdit.vue')
    },
    {
        path: 'userDetail/edit/:id',
        title: '用户编辑',
        name: 'user_detail_edit',
        component: () =>
            import('@/system-page/authority/userEdit.vue')
    },
    {
        path: '/pages/service-manage/deploy-detail',
        title: '应用部署',
        name: 'deploy-detail',
        component: () =>
            import('@/pages/service-manage/deploy-detail.vue')
    },
    {
        path: '/pages/service-manage/service-detail',
        title: '服务详情',
        name: 'service-detail',
        component: () =>
            import('@/pages/service-manage/service-detail.vue')
    },
    {
        path: '/entity/cscp_project_info_item/:id',
        title: 'cscp_project_info_item',
        name: 'cscp_project_info_item',
        component: resolve => {
            require(['@/views/entity/cscp_project_info_item.vue'], resolve);
        }
    },
    {
        path: '/entity/cscp_app_info_item/:id',
        title: 'cscp_app_info_item',
        name: 'cscp_app_info_item',
        component: resolve => {
            require(['@/views/entity/cscp_app_info_item.vue'], resolve);
        }
    },
    {
        path: '/entity/cscp_build_info_item/:id',
        title: 'cscp_build_info_item',
        name: 'cscp_build_info_item',
        component: resolve => {
            require(['@/views/entity/cscp_build_info_item.vue'], resolve);
        }
    },
    {
        path: '/entity/cscp_build_prefix_item/:id',
        title: 'cscp_build_prefix_item',
        name: 'cscp_build_prefix_item',
        component: resolve => {
            require(['@/views/entity/cscp_build_prefix_item.vue'], resolve);
        }
    },
    {
        path: '/entity/cscp_build_suffix_item/:id',
        title: 'cscp_build_suffix_item',
        name: 'cscp_build_suffix_item',
        component: resolve => {
            require(['@/views/entity/cscp_build_suffix_item.vue'], resolve);
        }
    },
    {
        path: '/entity/cscp_micro_service_item/:id',
        title: 'cscp_micro_service_item',
        name: 'cscp_micro_service_item',
        component: resolve => {
            require(['@/views/entity/cscp_micro_service_item.vue'], resolve);
        }
    },
    {
        path: '/entity/cscp_micro_service_version_item/:id',
        title: 'cscp_micro_service_version_item',
        name: 'cscp_micro_service_version_item',
        component: resolve => {
            require(['@/views/entity/cscp_micro_service_version_item.vue'], resolve);
        }
    },
    {
        path: '/entity/cscp_micro_service_version_param_item/:id',
        title: 'cscp_micro_service_version_param_item',
        name: 'cscp_micro_service_version_param_item',
        component: resolve => {
            require(['@/views/entity/cscp_micro_service_version_param_item.vue'], resolve);
        }
    },
    {
        path: '/entity/cscp_chart_item/:id',
        title: 'cscp_chart_item',
        name: 'cscp_chart_item',
        component: resolve => {
            require(['@/views/entity/cscp_chart_item.vue'], resolve);
        }
    },
    {
        path: '/entity/cscp_chart_param_item/:id',
        title: 'cscp_chart_param_item',
        name: 'cscp_chart_param_item',
        component: resolve => {
            require(['@/views/entity/cscp_chart_param_item.vue'], resolve);
        }
    },
    {
        path: '/pages/service-manage/upGradeApp-detail',
        title: '应用升级',
        name: 'upGradeApp-detail',
        component: () =>
            import('@/pages/service-manage/upGradeApp-detail.vue')
    },
    {
        path: '/pages/service-manage/rollbackApp-detail',
        title: '应用回滚',
        name: 'rollbackAppp-detail',
        component: () =>
            import('@/pages/service-manage/rollbackApp-detail.vue')
    }
    ]
};



// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里

var xmlhttp;
var menus;

export var getMenus = function () {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = onMenuResponse;
    xmlhttp.open('GET', util.baseUrl + '/api/system/cscpMenus/', false);
    xmlhttp.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
    xmlhttp.send(null);
}

function makeMenuTree(data) {
    var all = new Map();;
    var menus = [];
    console.log("@@@@");
    console.log(data);
    console.log("%%%%%");
    for (var i = 0; i < data.length; i++) {
        var tmpData = new Object;
        tmpData.id = data[i].id;
        tmpData.parentId = data[i].parentId;
        tmpData.path = data[i].url;
        tmpData.title = data[i].title;
        tmpData.name = data[i].name;
        tmpData.icon = data[i].icon;
        tmpData.c = data[i].component;
        tmpData.component = routeMap.get(data[i].name);;

        console.log(tmpData);

        if (tmpData.parentId == 0) {
            menus.push(tmpData);
        } else {
            all.set(tmpData.id, tmpData);
        }
    }
    return setToTeee(menus, all);
}

function setToTeee(menus, all) {
    console.log("@#$#@#$#@#$#@#$#@#$#@");
    all.forEach(function (value, key, map) {
        if (value.parentId != 0) {
            setToTreeLeaf(menus, value);
            all.delete(key);
        }
    });
    console.log(menus);
    console.log("@#$#@#$#@#$#@#$#@#$#@");
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
        alert("Problem retrieving XML data");
        return;
    }
    console.log(xmlhttp, 888888);
    menus = eval('(' + xmlhttp.response + ')');
    console.log(menus, 90);
    menus = makeMenuTree(menus);
    console.log(666);
    console.log("@@@@@@@@@@@@@ this is result 999999 @@@@@@@@@@");
    console.log(menus, 99);
    /*var com = () =>
        import ('@/system-page/authority/user.vue');
    menus = [{
            path: '/form',
            icon: 'key',
            name: 'form',
            title: '权限管理',
            component: Main,
            children: [{
                    path: 'user-management',
                    title: '用户管理',
                    name: 'user-management',
                    icon: 'ios-body',
                    component: com
                }, {
                    path: 'role-management',
                    title: '角色管理',
                    name: 'role-management',
                    icon: 'person-stalker',
                    component: () =>
                        import ('@/system-page/authority/role.vue')
                }, {
                    path: 'workGroup',
                    title: '工作组管理',
                    name: 'workgroup-management',
                    icon: 'ios-body',
                    component: () =>
                        import ('@/system-page/authority/workGroup.vue')
                }, {
                    path: 'organization',
                    title: '机构管理',
                    name: 'organization-management',
                    icon: 'ios-body',
                    component: () =>
                        import ('@/system-page/authority/organization.vue')
                }

            ]
        },
        {
            path: '/error-page',
            icon: 'android-sad',
            title: '错误页面',
            name: 'errorpage',
            component: Main,
            children: [{
                path: 'index',
                title: '错误页面',
                name: 'errorpage_index',
                component: () =>
                    import ('@/system-page/error-page/error-page.vue')
            }]
        }
    ];
    */
}

getMenus();

menus.push({
    path: '/pages/project-manage',
    icon: 'ios-list-outline',
    title: '项目管理',
    name: 'project-manage',
    component: Main,
    children: [
        {
            path: 'projects',
            title: '项目列表',
            name: 'projects',
            component: () =>
                import('@/pages/project-manage/project-table.vue')
        },
        {
            path: 'apps',
            title: '应用列表',
            name: 'apps',
            component: () =>
                import('@/pages/project-manage/app-table.vue')
        }
    ]
})

menus.push({
    path: '/pages/service-manage',
    icon: 'ios-list-outline',
    title: '服务管理',
    name: 'service-manage',
    component: Main,
    children: [
        {
            path: 'services',
            title: '服务列表',
            name: 'services',
            component: () =>
                import('@/pages/service-manage/service-table.vue')
        },
        {
            path: 'service-test',
            title: '测试',
            name: 'service-test',
            component: () =>
                import('@/pages/service-manage/micro_service_bak.vue')
        }
    ]
})

export const appRouter = menus;


// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];