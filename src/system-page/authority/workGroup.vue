<template>
    <div style="padding: 0 5px;">
        <Row>
            <Col span="18"><Input v-model="queryCond" icon="ios-clock-outline" placeholder="根据名称或说明模糊查询..." @on-enter="queryWorkGroup"></Input></Col>
            <Col span="6">
            <ctsi-button code="cscp.wg.query" type="ghost" shape="circle" icon="ios-search" @click="queryWorkGroup">查询</ctsi-button>
            <ctsi-button code="cscp.wg.add" type="primary" shape="circle" icon="ios-search" @click="createWorkGroup">新建</ctsi-button>
            </Col>
        </Row>
        <hr style="margin:5px;"/>
        <CtsiTable v-bind="item" ref="workGroupTable"></CtsiTable>
    </div>
</template>
<script>
/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import CtsiTable from '@/components/ctsi-table.vue'
import util from '@/libs/util.js';

Vue.use(Vuex)


export default {
  name: 'workGroup',
  data () {
      return{
        queryCond: ''
    }
  },
  components: {
    CtsiTable 
  },
  computed: {
    item:function(){
      var d = {
          //sqlName: 'photo.workGroup',
          url: '/api/system/cscpWorkGroups/query',
          params: this.queryCond+'###1#@#'+ this.queryCond +'###1',
          cols:[{title: '主键',key: 'id'},
          {title: '名称',key: 'group_name'},
          {title: '描述',key: 'description'},
          {title: '操作',key: 'action',width: 150,align: 'center',
              render: (h, params) => {
                return h('div', [
                                h('ctsi-button', {props: {code:"cscp.wg.edit",type: 'primary',size: 'small', },style: {marginRight: '5px'},
                                    on: {click: () => {
                                          this.$router.push({ name: 'work_group_edit', params: { id: params.row.id }});
                                        }
                                    }
                                }, '编辑'),
                                h('ctsi-button', {props: {code:"cscp.wg.del",type: 'error',size: 'small', },
                                    on: {click: () => {
                                            // alert(params.index)
                                            this.deleteWorkGroup(params.row.id);
                                        }
                                    }
                                }, '删除'), 
                            ]);
                        }
                    }],
          length:15
      };
      return d;
    }
  },
  methods: {
    queryWorkGroup: function () {
      this.$refs.workGroupTable.ctsiTableDataListQueryFirst();
    },
    createWorkGroup: function() {
      this.$router.push({ name: 'work_group_edit', params: { id:0 }})
    },
    deleteWorkGroup: function(id){
      // alert(id);
      var vm = this;
      vm.$Spin.show();
      util.ajaxMethodWidthParams(util.baseUrl+"/api/system/cscpWorkGroups/"+id , 'DELETE', {}).then(function(data){
          //util.setFormItemValue(vm.formDef.formDynamic.items, data);
          // console.log(data);
          vm.$refs.workGroupTable.ctsiTableDataListQueryFirst();
          vm.$Spin.hide();
          vm.$Notice.info({title: '提示',desc: '删除完成'});
        });
    }
  }
}
</script>
<style>
</style>