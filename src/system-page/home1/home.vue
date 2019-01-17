<style lang="less">
@import "./home.less";
@import "../../styles/common.less";
</style>
<template>
  <div class="home-main">
    <Row :gutter="10" class="margin-top-10">
      <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
        <Card>
          <p slot="title" class="card-title">
            <Icon type="android-map"></Icon>2018年12月话单量统计
          </p>
          <div class="data-source-row">
            <billed-volume></billed-volume>
            <Table style="margin-top:-30px" :columns="columns1" :data="data1" :show-header="false"></Table>
          </div>
        </Card>
      </Col>
      <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
        <Card>
          <p slot="title" class="card-title">
            <Icon type="ios-pulse-strong"></Icon>2018年12月错单量统计
          </p>
          <div class="data-source-row">
            <data-source-pie></data-source-pie>
          </div>
        </Card>
      </Col>
      <Col :md="24" :lg="12">
        <Card>
          <p slot="title" class="card-title">
            <Icon type="android-wifi"></Icon>2018年话单量统计
          </p>
          <div class="data-source-row">
            <user-flow></user-flow>
          </div>
        </Card>
      </Col>
      <Col :md="24" :lg="12">
        <Card>
          <div>
            <div class="ivu-card-head">
              <p slot="title" class="card-title">当前预警情况</p>
            </div>
            <div class="data-source-row" style="height:50%">
              <div class="currrent-alarm">
                <Button type="text" @click="modal1 = true">Google Web工具包未指定的跨站脚本脚本</Button>
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
            <div class="ivu-card-head">
              <p slot="title" class="card-title">公告</p>
            </div>
            <div class="data-source-row" style="height:50%">
              <div class="currrent-alarm">
                <Button type="text" @click="modal1 = true">Google Web工具包未指定的跨站脚本脚本</Button>
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
    </Row>
  </div>
</template>

<script>
import cityData from "./map-data/get-city-value.js";
import homeMap from "./components/map.vue";
import dataSourcePie from "./components/dataSourcePie.vue";
import billedVolume from "./components/billedVolume.vue";
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
    serviceRequests,
    userFlow,
    countUp,
    inforCard,
    mapDataTable,
    toDoListItem
  },
  data() {
    return {
      toDoList: [
        {
          title: "去iView官网学习完整的iView组件"
        },
        {
          title: "去iView官网学习完整的iView组件"
        },
        {
          title: "去iView官网学习完整的iView组件"
        },
        {
          title: "去iView官网学习完整的iView组件"
        },
        {
          title: "去iView官网学习完整的iView组件"
        }
      ],
      columns1: [
        {
          title: "Name",
          key: "name",
          width: 95
        },
        {
          title: "Age",
          key: "age",
          width: 120
        },
        {
          title: "Address",
          key: "inter",
          width: 130
        },
        {
          title: "Address",
          key: "ouzhou"
        },
        {
          title: "Address",
          key: "amer"
        }
      ],
      data1: [
        {
          name: "来话时长",
          age: 320,
          inter: 232,
          ouzhou: 301,
          amer: 334,
          date: "2016-10-03"
        },
        {
          name: "来话次数",
          age: 220,
          inter: 182,
          ouzhou: 191,
          amer: 234,
          date: "2016-10-01"
        },
        {
          name: "转话时长",
          age: 150,
          inter: 232,
          ouzhou: 201,
          amer: 154,
          date: "2016-10-02"
        },
        {
          name: "转话次数",
          age: 98,
          inter: 77,
          ouzhou: 101,
          amer: 99,
          date: "2016-10-04"
        }
      ],
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
<style lang="less" scoped>
/deep/ .ivu-table td,
.ivu-table th {
  height: 22px;
}
</style>

