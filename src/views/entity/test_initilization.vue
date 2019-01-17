<style lang="less">
@import "../../styles/common.less";
@import "../tables/components/table.less";
</style>

<template>
    <div>          
        <Row>
                    <Input v-model="searchName" :placeholder="$t('testInitilization.searchName.holder')" style="width: 200px" />
          <span @click="handleSearch" style="margin: 0 10px;"><Button type="primary" icon="search">{{$t('searchText')}}</Button></span>
          <Button @click="handleCancel" type="ghost" >{{$t('cancelText')}}</Button>
			<Button @click="handleCreateOrEditItem({id:0 })" type="primary" style="margin-right: 10px;float:right" icon="new">{{$t('newText')}}</Button>
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
          key: "id",
          title: this.$t('testInitilization.id.label')
        },        
        {
          key: "name",
          title: this.$t('testInitilization.name.label')
        },        
        {
          key: "age",
          title: this.$t('testInitilization.age.label')
        },        
        {
          key: "testdatetime",
          title: this.$t('testInitilization.testdatetime.label')
        },        
        {
          key: "testbigint",
          title: this.$t('testInitilization.testbigint.label')
        },        
        {
          key: "testdecimal",
          title: this.$t('testInitilization.testdecimal.label')
        },        
        {
          key: "testfloat",
          title: this.$t('testInitilization.testfloat.label')
        },        
        {
          key: "testdouble",
          title: this.$t('testInitilization.testdouble.label')
        },        
        {
          key: "testcahr",
          title: this.$t('testInitilization.testcahr.label')
        },        
        {
          key: "testdate",
          title: this.$t('testInitilization.testdate.label')
        },        
        {
          key: "teststamp",
          title: this.$t('testInitilization.teststamp.label')
        },        
        {
          key: "testtime",
          title: this.$t('testInitilization.testtime.label')
        },        
        {
          title: this.$t('operateText'),
          align: "center",
          width: 190,
          key: "handle",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary"
                  },
                  on: {
                    click: () => {
                      this.handleCreateOrEditItem({ id: params.row.id });
                    }
                  }
                },
                this.$t("editText")
              ),
              h(
                "Poptip",
                {
                  props: {
                    confirm: true,
                    title: this.$t('deletePopTip'),
                    transfer: true
                  },
                  on: {
                    "on-ok": () => {
                      this.delete(params.row._index, params.row.id);
                    }
                  }
                },
                [
                  h(
                    "Button",
                    {
                      style: {
                        margin: "0 5px"
                      },
                      props: {
                        type: "error",
                        placement: "top"
                      }
                    },
                   this.$t("deleteText")
                  )
                ]
              )
            ]);
          }
        }
      ],
      searchName: "",
      dataList: []
    };
  },
  methods: {
    init() {
      this.search({ size: this.pageSize });
    },
    delete(index, id) {
      let self = this;
      let page = this.currentPageNum;

      Util.ajax
        .delete("/api/testInitilizations" + "/" + id)
        .then(function(response) {
          self.dataList.splice(index, 1);          
          self.dataCount--;
          //console.log("delete....",self.dataList.length,page)
          if(self.dataList.length == 0 && page > 1) {
            self.handlePageChange(page-1)
          }
          self.$Message.success(self.$t('successText'));
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    search(argumentObj) {
      let self = this;

      Util.ajax
        .get("/api/testInitilizationsByCriteria", {
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
        "name.contains": this.searchName
      });
    },
    handleCancel() {
      this.searchName = null;
      this.init();
    },
    handlePageChange(pageNum) {     
      this.currentPageNum = pageNum;

      this.search({
        size: this.pageSize,
        page: pageNum - 1,        
        "name.contains": this.searchName
        
      });
    }
    ,
    handleCreateOrEditItem(argu) {
      this.$router.push({
        name: "test_initilization_item",
        params: argu
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
