<template>
  <div style="text-align:center">
  <Row :gutter="16" >
    <Table :data="ctsiTableDataList" :columns="cols" stripe></Table>
  </Row>
  <Page :total="ctsiTablePage.total" show-elevator show-total @on-change="ctsiTableDataListQuery" :page-size="ctsiTablePage.limit" :current="ctsiTableCurrentPage"></Page>
  <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>
<script>
/* eslint-disable */
import axios from 'axios';
import util from '@/libs/util.js';
// const HOST = process.env.NODE_ENV === 'production' ? 'http://www.wangyuhao.top:7100' : 'http://192.9.99.91:7100';
// const HOST = process.env.NODE_ENV === 'production' ? 'http://localhost:9000' : 'http://localhost:9000';
const HOST = util.baseUrl;

export default {
  name: 'CtsiTable',
  data () {
    return {
      spinShow: false,
      ctsiTablePageData :  {page:{total:0}, data:[]}
    }
  },
  props: ['url', 'cols', 'sqlName', 'params', 'length', ],
  computed: {
    ctsiTableDataList() {
      this.spinShow = false;
      return this.ctsiTablePageData.data
    },
    ctsiTablePage() {
      return this.ctsiTablePageData.page
    },
    
    ctsiTableCurrentPage() {
      return this.ctsiTablePageData.page.start / this.ctsiTablePageData.page.limit +1
    }

  },
  methods: {
    ctsiTableDataListQuery (curPage, isnew) {
      this.spinShow = true;
      var realUrl = this.url ? this.url : '/api/system/json/resultJSONDtoSQL.action';
      this.pageSqlUrlAction(realUrl, this.sqlName,this.params, (curPage-1) * this.length, this.length );
    },
    ctsiTableDataListQueryFirst(){
       //if(this.$util.isHasPermission('cscp.user.query')){
         this.spinShow = true;
         this.ctsiTableDataListQuery(1, true)
       //}else{
       //  console.log("对不起，您没有\"查询用户数据\"权限，请联系管理员！");
       //}
    },
    setTablePageData(data){
      this.ctsiTablePageData = data;
    },
    pageSqlAction(sqlName, params, start, length) {
      var url = HOST + '/api/system/json/resultJSONDtoSQL.action';
      pageSqlAction(url,sqlName, params, start, length);
    },
    pageSqlUrlAction(url, sqlName, params, start, length) {
    // return new Promise((resolve, reject) => {
        
        //var p = { sqlName: sqlName, params: params, start: start, length: length };
        var p = new URLSearchParams();
        p.append('sqlName', sqlName);
        p.append('params', params);
        p.append('start', start);
        p.append('length', length);
        // console.log(p);
        var vm = this;
        util.ajax.post(url, p)
            .then(response => {
                console.log("abc");
                console.log(response.data);
                // resolve(response.data);
                var page = { start: start, limit: length, total: response.data.recordsTotal }
                response.data.page = page;
                vm.setTablePageData(response.data);

            }).catch((error)=>{
              console.log(error.response.data);
              vm.$Notice.error({
                title: '提示',
                desc: '查询失败：' + error.response.data.message +'('+error.response.data.status+')'
              });
            })
    // })
    }
  },
  created () {
    this.ctsiTableDataListQueryFirst();
  },
  components: {
    
  }
}

</script>
<style>
</style>

