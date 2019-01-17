<style lang="less">
@import "./home.less";
@import "../../styles/common.less";
</style>
<template>
  <div class="home-main">
    <Row :gutter="10" class="margin-top-10">
      <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
        <Card>
          <p slot="title" class="card-title">2018年12月话单量统计</p>
          <div class="data-source-row">
            <billed-volume></billed-volume>
          </div>
        </Card>
      </Col>
      <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
        <Card>
          <p slot="title" class="card-title">2018年12月错单量统计</p>
          <div class="data-source-row">
            <data-source-pie></data-source-pie>
          </div>
        </Card>
      </Col>
      <Col :md="24" :lg="12">
        <Card>
          <p slot="title" class="card-title">2018年话单量统计</p>
          <div class="data-source-row">
            <user-flow></user-flow>
          </div>
        </Card>
      </Col>
      <Col :md="24" :lg="12">
        <Card>
          <p slot="title" class="card-title">当前预警情况</p>
          <div>
            <div class="data-source-row" style="height:50%">
              <div class="currrent-alarm">
                <Button style="color:red" type="text" @click="modal1 = true">Google Web工具包未指定的跨站脚本脚本</Button>
                <Modal
                  v-model="modal1"
                  title="Common Modal dialog box title"
                  @on-ok="ok"
                  @on-cancel="cancel"
                >
                  <Button type="primary">下载</Button>
                </Modal>
              </div>
            </div>
          </div>
          <div>
            <div class="ivu-card-head ivu-card-head-1">
              <p slot="title" class="card-title">公告</p>
            </div>
            <div class="data-source-row" style="height:50%">
              <div class="currrent-alarm">
                <Button
                  style="color:#57a3f3"
                  type="text"
                  @click="modal1 = true"
                >Google Web工具包未指定的跨站脚本脚本</Button>
                <Modal
                  v-model="modal1"
                  title="Common Modal dialog box title"
                  @on-ok="ok"
                  @on-cancel="cancel"
                >
                  <Button type="primary">下载</Button>
                </Modal>
              </div>
            </div>
          </div>
        </Card>
      </Col>
      <!-- <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
        <Card>
          <p slot="title" class="card-title">当前预警情况</p>
          <div class="data-source-row">
            <current-warning></current-warning>
          </div>
        </Card>
      </Col>-->
    </Row>
  </div>
</template>

<script>
import cityData from "./map-data/get-city-value.js";
import homeMap from "./components/map.vue";
import dataSourcePie from "./components/dataSourcePie.vue";
import billedVolume from "./components/billedVolume.vue";
import currentWarning from "./components/currentWarning.vue";
import serviceRequests from "./components/serviceRequests.vue";
import userFlow from "./components/userFlow.vue";
import countUp from "./components/countUp.vue";
import inforCard from "./components/inforCard.vue";
import mapDataTable from "./components/mapDataTable.vue";
import toDoListItem from "./components/toDoListItem.vue";
import util from "@/libs/util.js";

export default {
  name: "home",
  components: {
    homeMap,
    dataSourcePie,
    billedVolume,
    currentWarning,
    serviceRequests,
    userFlow,
    countUp,
    inforCard,
    mapDataTable,
    toDoListItem
  },
  data() {
    return {
      value6: "",
      modal1: false,
      count: {
        createUser: 496,
        visit: 3264,
        collection: 24389305,
        transfer: 39503498
      },
      cityData: cityData,
      showAddNewTodo: false,
      newToDoItemValue: ""
    };
  },
  computed: {
    avatorPath() {
      return localStorage.avatorImgPath;
    }
  },
  methods: {
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    addNewToDoItem() {
      this.showAddNewTodo = true;
    },
    addNew() {
      if (this.newToDoItemValue.length !== 0) {
        this.toDoList.unshift({
          title: this.newToDoItemValue
        });
        setTimeout(() => {
          this.newToDoItemValue = "";
        }, 200);
        this.showAddNewTodo = false;
      } else {
        this.$Message.error("请输入待办事项内容");
      }
    },
    cancelAdd() {
      this.showAddNewTodo = false;
      this.newToDoItemValue = "";
    },
    clickTest() {
      util.ajax.get("/api/cscpAppInfos").then(response => {
        console.log(response.data);
      });
    }
  }
};
</script>
