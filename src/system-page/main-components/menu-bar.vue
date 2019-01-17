<template>
  <div class="menu-bar">
    <div class="menu-list">
      <!--一级菜单-->
      <div v-if="oneMenu" class="menu-item" v-for="(val,i) in menu" @click="tabsChange(val.name,i)">
        <img class="item-img" :src="val.img" alt>
        <div class="item-name">{{val.name}}</div>
      </div>
      <!--二级菜单-->
      <div
        v-if="twoMenu"
        class="menu-item menu-itemtwo"
        v-for="(val,i) in menutwo"
        @click="routerGo(val.path)"
      >
        <img v-if="val.img" class="item-img" :src="val.img" alt>
        <div class="item-name">{{val.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
// import bus from "@/bus";
export default {
  name: "MenuBar",
  data() {
    return {
      //二级菜单是否显示
      twoMenu: false,
      //一级菜单是否显示
      oneMenu: true,
      //一级以下菜单
      menutwo: [],
      menu: [
        { img: require("../../images/menu.png"), name: "我的菜单" },
        { img: require("../../images/configure.png"), name: "基础配置" },
        { img: require("../../images/bill.png"), name: "出账管理" },
        { img: require("../../images/chart.png"), name: "统计分析" },
        { img: require("../../images/setting.png"), name: "系统管理" }
      ],
      //目前写死得菜单
      menuarr: [
        {
          name: "我的菜单",
          children: [
            {
              name: "",
              img: require("@/images/setting.png"),
              path: "menuSetting"
            },
            { name: "运营商维护", path: "" },
            { name: "来向帐前查询", path: "" },
            { name: "月汇总", path: "" },
            { name: "帐后查询", path: "" }
          ]
        },
        {
          name: "基础配置",
          icon: "el-icon-setting",
          path: "",
          children: [
            {
              name: "运营商配置",
              path: "",
              children: [
                { name: "结算对象维护", path: "" },
                { name: "结算对象代码维护", path: "" },
                { name: "账目归类-运营商管理", path: "" },
                { name: "运营商组配置", path: "" },
                { name: "运营商结算归属局配置", path: "" },
                { name: "结算对象账期配置", path: "" },
                { name: "历史结算对象查询", path: "" },
                { name: "结算对象SAPCode维护", path: "" },
                { name: "国际公司结算对象名称映射", path: "" },
                { name: "欧洲运营商账务信息配置", path: "" },
                { name: "国际移动APT直2运营商配置", path: "" },
                { name: "Syniverse运营商映射表维护", path: "" },
                { name: "LTE打印运营商配置", path: "" },
                { name: "运营商阈值维护", path: "" },
                { name: "大收大支结算对象信息管理", path: "" },
                { name: "直摊国际和结算对象对照信息管理", path: "" },
                { name: "结算对象直达国际映射信息管理", path: "" }
              ]
            },
            {
              name: "国家地区信息",
              path: "",
              children: [
                { name: "省信息查询", path: "" },
                { name: "国家信息查询", path: "" },
                { name: "洲际信息查询", path: "" },
                { name: "国家时区信息配置", path: "" },
                { name: "国际移动电话字冠查询", path: "" },
                { name: "付款国家（地区）名称代码信息管理", path: "" },
                { name: "国内区号信息", path: "" }
              ]
            },
            {
              name: "类型配置",
              path: "",
              children: [
                { name: "账务主体管理", path: "" },
                { name: "账目类型归类管理", path: "" },
                { name: "账目类型管理", path: "" },
                { name: "账务周期管理", path: "" },
                { name: "业务类型管理", path: "" },
                { name: "话单业务类型与批价业务类型映射", path: "" },
                { name: "业务类型对照信息管理", path: "" },
                { name: "批价业务类型修正配置", path: "" },
                { name: "特殊结算模型配置", path: "" },
                { name: "交换机信息管理", path: "" },
                { name: "时段配置", path: "" },
                { name: "产品目录配置", path: "" },
                { name: "客户电路流量业务类型映射关系维护", path: "" },
                { name: "客户电路流量结算对象映射关系维护", path: "" }
              ]
            },
            {
              name: "固网费率配置",
              path: "",
              children: [
                { name: "去向费率配置", path: "" },
                { name: "来向费率配置", path: "" },
                { name: "承诺政策维护", path: "" },
                { name: "无费率路由维护", path: "" },
                { name: "协议到达状态维护", path: "" },
                { name: "协议到达状态统计", path: "" },
                { name: "协议状态告警级别配置", path: "" },
                { name: "去向hubbing费率查询", path: "" },
                { name: "转去费率查询", path: "" },
                { name: "转来费率查询", path: "" },
                { name: "号段警告查询", path: "" },
                { name: "号段查询", path: "" }
              ]
            },
            {
              name: "前海卡费率配置",
              path: "",
              children: [
                { name: "前海卡费率表", path: "" },
                { name: "IMSI配置表", path: "" }
              ]
            },
            {
              name: "MVNO费率配置",
              path: "",
              children: [
                { name: "MVNO运营商配置", path: "" },
                { name: "MVNO费率配置", path: "" },
                { name: "MVNO报价导入", path: "" },
                { name: "MVNO PLMN配置", path: "" },
                { name: "mvno无费率路由维护", path: "" }
              ]
            },
            { name: "CLI业务查询", path: "" },
            {
              name: "SIP-IDD",
              path: "",
              children: [
                { name: "消息日志查询", path: "" },
                { name: "SIP费率配置", path: "" },
                { name: "客户查询", path: "" },
                { name: "用户查询", path: "" },
                { name: "协议查询", path: "" }
              ]
            },
            { name: "汇率配置", path: "" },
            { name: "增值税配置", path: "" },
            { name: "结算规则", path: "" }
          ]
        },
        {
          name: "出账管理",
          icon: "el-icon-tickets",
          path: "",
          children: [
            {
              name: "Excel导入",
              path: "",
              children: [
                { name: "网元省骨干网流量", path: "" },
                { name: "网元带宽信息", path: "" },
                { name: "网元付款协议导入", path: "" },
                { name: "网元收款单导入", path: "" },
                { name: "网元付款协议导入", path: "" },
                { name: "国际短信账单文件导入", path: "" },
                { name: "CDMA1X数据Syniverse账单文件导入", path: "" },
                { name: "Syniverse话音出访账单导入", path: "" },
                { name: "Syniverse话音来访账单导入", path: "" }
              ]
            },
            {
              name: "月汇总",
              path: "",
              children: [
                { name: "国际固网月汇总", path: "" },
                { name: "国际固网查询月汇总结果", path: "" },
                { name: "国际固网月汇总稽核", path: "" },
                { name: "移动MVNO月汇总", path: "" },
                { name: "移动MVNO查询月汇总结果", path: "" },
                { name: "IPX信令月汇总", path: "" },
                { name: "IPX查询月汇总结果", path: "" }
              ]
            },
            {
              name: "结算",
              path: "",
              children: [
                { name: "国际固网固话结算", path: "" },
                { name: "移动MVNO结算", path: "" },
                { name: "IPX信令结算", path: "" },
                { name: "国际固网账后审核", path: "" },
                { name: "移动MVNO账后审核", path: "" },
                { name: "IPX信令账后审核", path: "" }
              ]
            },
            {
              name: "数据稽核",
              path: "",
              children: [
                { name: "国际固网数据稽核", path: "" },
                { name: "移动MVNO数据稽核", path: "" },
                { name: "QHK数据稽核", path: "" }
              ]
            },
            {
              name: "封账和账前审核状态查询",
              path: "",
              children: [
                { name: "国际固网封账和账前审核状态查询", path: "" },
                { name: "移动MVNO封账和账前审核状态查询", path: "" },
                { name: "国际移动封账和账前审核状态查询", path: "" },
                { name: "IPX信令封账和账前审核状态查询", path: "" }
              ]
            },
            {
              name: "固网账前账查询",
              path: "",
              children: [
                { name: "去向账前账维护", path: "" },
                { name: "转来向账前账维护", path: "" },
                { name: "hubbing账前账维护", path: "" },
                { name: "来向账前账维护", path: "" },
                { name: "受付业务来向账前账维护", path: "" },
                { name: "受付业务去向账前账维护", path: "" }
              ]
            },
            {
              name: "移动账前查询",
              path: "",
              children: [
                { name: "国际移动账前查询", path: "" },
                { name: "移动MVNO账前查询", path: "" },
                { name: "Credit Note调账查询", path: "" }
              ]
            },
            { name: "Wlan账前账查询", path: "" },
            {
              name: "对方月账录入",
              path: "",
              children: [
                { name: "国际固网对方账录入", path: "" },
                { name: "移动MVNO对方账录入", path: "" },
                { name: "LTE对方慢入月账维护", path: "" },
                { name: "国际移动对方来向账单维护", path: "" },
                { name: "第三方服务费录入", path: "" }
              ]
            },
            {
              name: "月账出账",
              path: "",
              children: [
                { name: "固网月账批量操作", path: "" },
                { name: "国际移动月账出账", path: "" },
                { name: "移动MVNO月账出账", path: "" },
                { name: "Wlan月账出账", path: "" },
                { name: "对方承诺月账出账", path: "" }
              ]
            },
            { name: "固网月账封面打印", path: "" },
            {
              name: "账后查询",
              path: "",
              children: [
                { name: "固网月账查询", path: "" },
                { name: "固网月账合并", path: "" },
                { name: "国际移动月账查询", path: "" },
                { name: "国际移动月账统计", path: "" },
                { name: "LTE月账查询", path: "" },
                { name: "移动MVNO月账查询", path: "" },
                { name: "Wlan账后账查询", path: "" }
              ]
            },
            {
              name: "账目出账及维护",
              path: "",
              children: [
                { name: "国际固网账目出账及维护", path: "" },
                { name: "国际网元账目出账及维护", path: "" },
                { name: "国际移动账目出账及维护", path: "" },
                { name: "移动MVNO账目出账及维护", path: "" },
                { name: "国内移动账目出账及维护", path: "" }
              ]
            },
            {
              name: "总账维护",
              path: "",
              children: [
                { name: "国际固网总账出账", path: "" },
                { name: "国际网元总账出账", path: "" },
                { name: "国际移动总账出账", path: "" },
                { name: "移动MVNO总账出账", path: "" },
                { name: "国内移动总账出账", path: "" },
                { name: "国际固网总账查询", path: "" },
                { name: "国际网元总账查询", path: "" },
                { name: "国际移动总账查询", path: "" },
                { name: "移动MVNO总账查询", path: "" },
                { name: "国内移动总账查询", path: "" }
              ]
            },
            {
              name: "现金流维护及销账",
              path: "",
              children: [
                { name: "现金流维护", path: "" },
                { name: "摊分现金流查询", path: "" },
                { name: "网元现金流查询", path: "" },
                { name: "销账", path: "" },
                { name: "反销账", path: "" },
                { name: "历史销账查询", path: "" },
                { name: "应收应付实收实付差额调整", path: "" }
              ]
            },
            {
              name: "网元处理",
              path: "",
              children: [
                { name: "协议维护", path: "" },
                { name: "协议出账", path: "" },
                { name: "来向账单维护", path: "" },
                { name: "优惠方案维护", path: "" },
                { name: "出账备忘信息维护", path: "" },
                { name: "成本比例配置", path: "" },
                { name: "分摊", path: "" },
                { name: "去向账目明细维护", path: "" },
                { name: "一次性安装费维护", path: "" },
                { name: "滞纳金维护", path: "" },
                { name: "网元收款单自动导出", path: "" },
                { name: "网元摊分对象配置", path: "" }
              ]
            }
          ]
        },
        {
          name: "统计分析",
          icon: "el-icon-edit-outline",
          path: "",
          children: [
            { name: "报表生成", path: "reportNew" },
            {
              name: "固网统计类报表",
              path: "",
              children: [
                {
                  name: "按目的地去话统计报表（带号段）",
                  path: "destRep_destination"
                },
                { name: "按目的地去话统计报表", path: "destRep" },
                { name: "来话统计报表", path: "directCome" },
                { name: "转话统计报表", path: "transCome" },
                { name: "呼叫次数校验报表", path: "checkCall" },
                { name: "月账前后分钟数校验报表", path: "monthCompare" },
                { name: "来向账务处理状态查询报表", path: "comeAccountStatus" },
                { name: "分摊数据统计表", path: "queryDaySum" },
                { name: "对方来话统计报表", path: "peerComeAccountIn" },
                { name: "对方去话统计报表", path: "peerGoAccountIn" },
                { name: "预处理情况统计", path: "preparedStatistic" },
                { name: "协议量完成情况表", path: "agreementStatistic" },
                { name: "欧洲运营商月账单统计报表", path: "EurCarrierAcc" },
                { name: "External Traffic Report", path: "ETR" }
              ]
            },
            {
              name: "固网月账审批比较",
              path: "",
              children: [
                { name: "来向月账比较表（IDD）", path: "" },
                { name: "受付业务月账比较报表（IDD）", path: "" }
              ]
            },
            {
              name: "固网账目明细比较统计报表",
              path: "",
              children: [
                { name: "来向草账与对方来向月账比较报表", path: "" },
                { name: "去向草账与对方去向月账比较报表", path: "" },
                {
                  name: "去向hubbing月账与对方去向hubbing月账比较报表",
                  path: ""
                },
                { name: "来向草账与去向月账比较报表", path: "" },
                { name: "去向月账与对方来向月账比较报表", path: "" }
              ]
            },
            {
              name: "财务报表",
              path: "",
              children: [
                { name: "大收大支报表", path: "" },
                { name: "集团运营商结算调整", path: "" },
                { name: "大收大支报表调整录入", path: "" },
                { name: "大收大支调整对比统计表", path: "" },
                { name: "大收大支累计统计表", path: "" },
                { name: "实时收支计算", path: "" },
                { name: "实收实付报表", path: "" },
                { name: "应收应付报表", path: "" }
              ]
            },
            {
              name: "国际移动报表",
              path: "",
              children: [
                { name: "沃达丰与和记详单导出", path: "" },
                { name: "账前账后数据稽核比较", path: "" },
                { name: "呼叫次数校验报表", path: "" },
                { name: "国际公司sponsor深圳电信漫入香港统计", path: "" },
                { name: "国际公司澳门漫出统计", path: "" }
              ]
            },
            { name: "IPX信令话单结算", path: "" }
          ]
        },
        {
          name: "系统管理",
          icon: "el-icon-menu",
          path: "",
          children: [
            {
              name: "用户管理",
              path: "",
              children: [
                // { name: '用户管理', path: 'userList' },
                { name: "用户维护及授权", path: "userList" },
                { name: "用户审核", path: "staffInspect" },
                { name: "模块浏览", path: "authority" }
              ]
            },
            {
              name: "权限管理",
              path: "",
              children: [
                // { name: '角色管理', path: 'roleMag' },
                { name: "角色维护及授权", path: "roleMag" },
                { name: "按钮权限维护及授权", path: "rolesAudit" },
                { name: "菜单管理", path: "menuMag" },
                { name: "平台管理", path: "plantformMag" },
                { name: "组织管理", path: "organizationMag" }
              ]
            }
          ]
        }
      ]
    };
  },
  mounted() {
    //  页面进入获取树状菜单
    var _this = this;
    // bus.$on("home-page", function(data) {
    //   _this.oneMenu = data.show;
    //   _this.twoMenu = !data.show;
    // });
  },
  watch: {
    homePage: function(Value, oldValue) {
      alert(1);
    }
  },
  methods: {
    tabsChange(name, i) {
      this.oneMenu = false;
      this.twoMenu = true;
      this.menutwo = this.menuarr[i].children;
    },
    routerGo(path) {
      this.$router.push({
        name: path
      });
    }
  }
};
</script>
<style lang="less" scoped>
.menu-bar {
  background-color: #477fe0;
  height: 81px;
  box-sizing: border-box;
  padding-top: 17px;
  /*background-image: url(/dist/137bec2….png);*/
  background-image: url(../../images/bg.png);
  background-size: auto 80px;
  background-position: right;
  background-repeat: no-repeat;
}
.menu-list {
  display: flex;
  margin-left: 44px;
}
.menu-item {
  width: 67px;
  height: 64px;
  background-color: rgba(255, 255, 255, 0.9);
  margin-right: 5px;
  border-radius: 8px 8px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
}
.menu-item:hover {
  background-color: #fff;
}
.item-img {
  display: block;
  width: 26px;
  height: 26px;
}
.menu-itemtwo {
  height: 40px;
  /* bottom: 0px; */
  margin-top: 24px;
  width: auto;
  padding: 5px;
}
</style>
