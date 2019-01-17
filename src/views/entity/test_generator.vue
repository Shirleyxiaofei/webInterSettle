<style lang="less">
@import "../../styles/common.less";
@import "../tables/components/table.less";
</style>

<template>
    <div>          
        <Row>
                    <Input v-model="searchColStr" :placeholder="$t('testGenerator.searchColStr.holder')" style="width: 200px" />
          <span @click="handleSearch" style="margin: 0 10px;"><Button type="primary" icon="search">{{$t('searchText')}}</Button></span>
          <Button @click="handleCancel" type="ghost" >{{$t('cancelText')}}</Button>
			<Button @click="handleCreateOrEditItem({generatorId:0  , idtwo:0 })" type="primary" style="margin-right: 10px;float:right" icon="new">{{$t('newText')}}</Button>
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
          key: "generatorId",
          title: this.$t('testGenerator.generatorId.label')
        },        
        {
          key: "idtwo",
          title: this.$t('testGenerator.idtwo.label')
        },        
        {
          key: "colStr",
          title: this.$t('testGenerator.colStr.label')
        },        
        {
          key: "colDate",
          title: this.$t('testGenerator.colDate.label')
        },        
        {
          key: "colLong",
          title: this.$t('testGenerator.colLong.label')
        },        
        {
          key: "colDecimal",
          title: this.$t('testGenerator.colDecimal.label')
        },        
        {
          key: "colFloat",
          title: this.$t('testGenerator.colFloat.label')
        },        
        {
          key: "colDouble",
          title: this.$t('testGenerator.colDouble.label')
        },        
        {
          key: "colChar10",
          title: this.$t('testGenerator.colChar10.label')
        },        
        {
          key: "colDouble2",
          title: this.$t('testGenerator.colDouble2.label')
        },        
        {
          key: "col3",
          title: this.$t('testGenerator.col3.label')
        },        
        {
          key: "col4",
          title: this.$t('testGenerator.col4.label')
        },        
        {
          key: "colBin",
          title: this.$t('testGenerator.colBin.label')
        },        
        {
          key: "colBlob",
          title: this.$t('testGenerator.colBlob.label')
        },        
        {
          key: "colText",
          title: this.$t('testGenerator.colText.label')
        },        
        {
          key: "colLongtext",
          title: this.$t('testGenerator.colLongtext.label')
        },        
        {
          key: "col1",
          title: this.$t('testGenerator.col1.label')
        },        
        {
          key: "col2",
          title: this.$t('testGenerator.col2.label')
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
                      this.handleCreateOrEditItem({ generatorId: params.row.generatorId , idtwo: params.row.idtwo });
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
                      this.delete(params.row._index, params.row.generatorId , params.row.idtwo);
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
      searchColStr: "",
      dataList: []
    };
  },
  methods: {
    init() {
      this.search({ size: this.pageSize });
    },
    delete(index, generatorId,idtwo) {
      let self = this;
      let page = this.currentPageNum;

      Util.ajax
        .delete("/api/testGenerators" + "/" + generatorId+ "/" + idtwo)
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
        .get("/api/testGeneratorsByCriteria", {
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
        "colStr.contains": this.searchColStr
      });
    },
    handleCancel() {
      this.searchColStr = null;
      this.init();
    },
    handlePageChange(pageNum) {     
      this.currentPageNum = pageNum;

      this.search({
        size: this.pageSize,
        page: pageNum - 1,        
        "colStr.contains": this.searchColStr
        
      });
    }
    ,
    handleCreateOrEditItem(argu) {
      this.$router.push({
        name: "test_generator_item",
        params: argu
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
