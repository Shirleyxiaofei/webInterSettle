<style lang="less">
@import "./main.less";
</style>
<template>
    <div class="main" >
        <div >
            <div class="main-header">
            	
                <div class="header-middle-con">
                	<!--头部logo-->
                	<div class="logo-img">
	            		<img src="../images/logo.png"/>
            		</div>
            		<!--面包屑-->
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                </div>
              
                <div  class="header-avator-con">
                	<!--全屏模式-->
                    <full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>
                    
                    <theme-switch></theme-switch>

                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{ userName }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="selfDetail">个人信息</DropdownItem>
                                    <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
                        </Row>
                    </div>
                </div>
                
            </div>
            <!--tabs 默认隐藏-->
            <div class="tags-con" v-if="tabs_show">
                <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
            </div>
        </div>

        <!-- 菜单 -->
        <menu-bar></menu-bar>

        <div ref="singlePageCon" class="single-page-con" style="height: calc(100% - 152px)">
            <div class="single-page">
                <keep-alive :include="cachePage">
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>

    </div>
</template>
<script>
import MenuBar from './main-components/menu-bar'
import shrinkableMenu from "./main-components/shrinkable-menu/shrinkable-menu.vue";
import tagsPageOpened from "./main-components/tags-page-opened.vue";
import breadcrumbNav from "./main-components/breadcrumb-nav.vue";
import fullScreen from "./main-components/fullscreen.vue";
import messageTip from "./main-components/message-tip.vue";
import themeSwitch from "./main-components/theme-switch/theme-switch.vue";
import Cookies from "js-cookie";
import util from "@/libs/util.js";
import { initDynamicRouter } from "@/router/dynamic-router.js";
export default {
  components: {
    MenuBar,
    shrinkableMenu,
    tagsPageOpened,
    breadcrumbNav,
    fullScreen,
    messageTip,
    themeSwitch
  },
  data() {
    return {
      tabs_show:false,
      shrink: false,
      userName: "",
      isFullScreen: false,
      openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
      tokenInterval: null
    };
  },
  computed: {
    menuList() {
      return this.$store.state.app.menuList;
    },
    pageTagsList() {
      return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
    },
    currentPath() {
      return this.$store.state.app.currentPath; // 当前面包屑数组
    },
    avatorPath() {
      return localStorage.avatorImgPath;
    },
    cachePage() {
      return this.$store.state.app.cachePage;
    },
    lang() {
      return this.$store.state.app.lang;
    },
    menuTheme() {
      return this.$store.state.app.menuTheme;
    }
  },
  methods: {
    pushVue() {
      this.$router.push({
        name: "user-management"
      });
    },
    init() {
      let pathArr = util.setCurrentPath(this, this.$route.name);
      //this.$store.commit("updateMenulist");
      if (pathArr.length >= 2) {
        this.$store.commit("addOpenSubmenu", pathArr[1].name);
      }
      this.userName = Cookies.get("user");
      let messageCount = 3;
      this.messageCount = messageCount.toString();
      this.checkTag(this.$route.name);
      this.$store.commit("setMessageCount", 3);
    },
    toggleClick() {
      this.shrink = !this.shrink;
    },
    handleClickUserDropdown(name) {
      if (name === "ownSpace") {
        util.openNewPage(this, "ownspace_index");
        this.$router.push({
          name: "ownspace_index"
        });
      } else if (name === "loginout") {
        // 退出登录
        this.$store.commit("logout", this);
        this.$store.commit("clearOpenedSubmenu");
        Cookies.set("user", "");
        this.$router.push({
          name: "login"
        });
      } else if (name === "selfDetail") {
        util.openNewPage(this, "selfEdit");
        // var userId = Cookies.get('userId');
        var userId = localStorage.userId;
        console.log("@#@#@#@#@#@#@#");
        console.log(userId);
        this.$router.push({
          name: "selfEdit",
          params: {
            id: userId
          }
        });
      }
    },
    checkTag(name) {
      let openpageHasTag = this.pageTagsList.some(item => {
        if (item.name === name) {
          return true;
        }
      });
      if (!openpageHasTag) {
        //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
        util.openNewPage(
          this,
          name,
          this.$route.params || {},
          this.$route.query || {}
        );
      }
    },
    handleSubmenuChange(val) {
      // console.log(val)
    },
    beforePush(name) {
      // if (name === 'accesstest_index') {
      //     return false;
      // } else {
      //     return true;
      // }
      return true;
    },
    fullscreenChange(isFullScreen) {
      // console.log(isFullScreen);
    },
    refreshToken() {
      this.$util.ajaxMethodWidthParams(this.$util.baseUrl + '/api/system/refreshToken?rememberme='+localStorage['rememberme'], 'get', {})
        .then((response) => {
          console.log(response);
          localStorage.token = response.token;
        }).catch((error) => {
           console.log(error.response);
        });
    }
  },
  watch: {
    $route(to) {
      this.$store.commit("setCurrentPageName", to.name);
      let pathArr = util.setCurrentPath(this, to.name);
      if (pathArr.length > 2) {
        this.$store.commit("addOpenSubmenu", pathArr[1].name);
      }
      this.checkTag(to.name);
      localStorage.currentPageName = to.name;
    },
    lang() {
      util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
    }
  },
  mounted() {
    this.init();
  },
  created() {
      // 显示打开的页面的列表
      this.$store.commit("setOpenedList");

      if(!sessionStorage.lastAjaxTime){
        sessionStorage.lastAjaxTime = new Date().getTime();
      }
      this.tokenInterval = setInterval(() => {
        if(new Date().getTime() - sessionStorage.lastAjaxTime > 30 * 60 * 1000){
          //如果时间间隔为半小时，停止刷新token
          clearInterval(this.tokenInterval);
        }else{
          this.refreshToken();
        }
      }, 60000);
  },
  updated() {
  	if(this.$route.name !== 'login'){
      sessionStorage.currentRouteName = this.$route.name;
    }
  },
    beforeRouteLeave(to, from, next)  {
      if(to.name === 'login'){
        clearInterval(this.tokenInterval);
        console.log('清除tokenInterval');
      }
      next();
    }
};
</script>