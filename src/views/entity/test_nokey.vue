<style lang="less">
@import "../../styles/common.less";
@import "../tables/components/table.less";
</style>

<template>
    <div>          
        <Row>
                    <Input v-model="searchColVarc" :placeholder="$t('testNokey.searchColVarc.holder')" style="width: 200px" />
          <span @click="handleSearch" style="margin: 0 10px;"><Button type="primary" icon="search">{{$t('searchText')}}</Button></span>
          <Button @click="handleCancel" type="ghost" >{{$t('cancelText')}}</Button>
			<Button @click="handleCreateOrEditItem({})" type="primary" style="margin-right: 10px;float:right" icon="new">{{$t('newText')}}</Button>
        </Row>
        <Row class="margin-top-10 searchable-table-con1" style="width:100%">
          <Table :columns="columns"  :data="dataList"></Table>
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
      pageSize: 5,
      columns: [      
        {
          key: "colInt",
          title: this.$t('testNokey.colInt.label')
        },        
        {
          key: "colVarc",
          title: this.$t('testNokey.colVarc.label')
        },        
        {
          key: "colText",
          title: this.$t('testNokey.colText.label')
        },        
        {
          title: this.$t('operateText'),
          align: "center",
          width: 190,
          key: "handle",
          render: (h, params) => {
            return h("div", [
            ]);
          }
        }
      ],
      searchColVarc: "",
      dataList: []
    };
  },
  methods: {
    init() {
      this.search({ size: this.pageSize });
    },
    search(argumentObj) {
      let self = this;

      Util.ajax
        .get("/api/testNokeysByCriteria", {
          params: argumentObj
        })
        .then(function(response) {         
          self.dataList = response.data.data;
          self.dataCount = response.data.recordsTotal;
          
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  
    handleSearch() {
      this.search({
        size: this.pageSize,
        "colVarc.contains": this.searchColVarc
      });
    },
    handleCancel() {
      this.searchColVarc = null;
      this.init();
    },
    handlePageChange(pageNum) {     
      this.currentPageNum = pageNum;

      this.search({
        size: this.pageSize,
        page: pageNum - 1,        
        "colVarc.contains": this.searchColVarc
        
      });
    }
    ,
    handleCreateOrEditItem(argu) {
      this.$router.push({
        name: "test_nokey_item",
        params: argu
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
