<template>
  <div>
    <ul class="menuList">
      <li
        class="menu-item"
        v-for="(item,index) in menu"
        :key="index"
      >
        <img
          class="item-img"
          :src="item.src"
          alt=""
        >
        <div class="item-name">{{item.name}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          src: require("@/images/set_guishuju.png"),
          name: "运营商结算归属局配置"
        },
        { src: require("@/images/set_yuzhiweihu.png"), name: "运营商阈值维护" },
        { src: require("@/images/set_zhutiguanli.png"), name: "账务主体管理" },
        {
          src: require("@/images/set_dayinpeizhi.png"),
          name: "LTE打印运营商配置"
        },
        {
          src: require("@/images/set_zhangmuleixing.png"),
          name: "账目类型管理"
        },
        {
          src: require("@/images/set_zhangwuzhouqi.png"),
          name: "账务周期管理"
        },
        { src: require("@/images/set_yewuleixing.png"), name: "业务类型管理" },
        {
          src: require("@/images/set_laixiangfeilv.png"),
          name: "来向费率配置"
        },
        { src: require("@/images/set_quxiangfeilv.png"), name: "去向费率配置" },
        { src: require("@/images/set_chengnuozhengce.png"), name: "承诺政策" },
        { src: require("@/images/set_luyouweihu.png"), name: "无费率路由维护" }
      ]
    };
  },
  components: {},
  computed: {},
  created() {},
  methods: {}
};
</script>

<style scoped>
.menu-item{
  float: left;
  min-width: 150px;
  text-align: center;
  margin: 10px;
}
.item-img {
  display: block;
  width: 50px;
  height: 50px;
  margin: 0 auto;
}
</style>
