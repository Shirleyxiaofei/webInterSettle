<style lang="less">
@import "../../styles/common.less";
@import "../../views/tables/components/table.less";
</style>

<template>
  <div>
    <Row>
      <Input v-model="searchUsername" :placeholder="$t('cscpLogOperation.searchUsername.holder')" style="width: 200px" />
      <span @click="handleSearch" style="margin: 0 10px;">
        <Button type="primary" icon="search">{{$t('searchText')}}</Button>
      </span>
      <Button @click="handleCancel" type="ghost">{{$t('cancelText')}}</Button>
    </Row>
    <Row class="margin-top-10 searchable-table-con1" style="width:100%">
      <Table :columns="columns" :data="dataList"></Table>
      <Row type="flex" justify="end" align="middle">
        <Page :total="dataCount" :page-size="pageSize" @on-change="handlePageChange" show-elevator show-total style="padding: 10px;"></Page>
      </Row>
    </Row>
  </div>
</template>

<script>
  import Util from '@/libs/util.js';

  export default {
    name: "searchable-table",

    data() {
      return {
        dataCount: 0,
        currentPageNum: 0,
        pageSize: 15,
        columns: [{
            key: "id",
            title: this.$t('cscpLogOperation.id.label')
          },
          {
            key: "uri",
            title: this.$t('cscpLogOperation.uri.label')
          },
          {
            key: "ip",
            title: this.$t('cscpLogOperation.ip.label')
          },
          {
            key: "time",
            title: this.$t('cscpLogOperation.time.label')
          },
          {
            key: "params",
            title: this.$t('cscpLogOperation.params.label')
          },
          {
            key: "message",
            title: this.$t('cscpLogOperation.message.label')
          },
          {
            key: "error",
            title: this.$t('cscpLogOperation.error.label')
          },
          {
            key: "status",
            title: this.$t('cscpLogOperation.status.label')
          }
        ],
        searchUsername: "",
        dataList: []
      };
    },
    methods: {
      init() {
        this.search({
          size: this.pageSize,
          sort: "time,desc"
        });

      },
      search(argumentObj) {
        let self = this;

        Util.ajax
          .get("/api/system/cscpLogOperationsByCriteria", {
            params: argumentObj
          })
          .then(function (response) {
            self.dataList = response.data.data;
            self.dataCount = response.data.recordsTotal;

          })
          .catch(function (error) {
            console.log(error);
          });
      },

      handleSearch() {
        this.search({
          size: this.pageSize,
          "username.contains": this.searchUsername
        });
      },
      handleCancel() {
        this.searchUsername = null;
        this.init();
      },
      handlePageChange(pageNum) {
        this.currentPageNum = pageNum;

        this.search({
          size: this.pageSize,
          page: pageNum - 1,
          "username.contains": this.searchUsername

        });
      }
    },
    mounted() {
      this.init();
    }
  };
</script>