<template>
    <div style="padding: 0 5px;">
        <Row>
            <Col span="18"><Input v-model="queryCond" icon="ios-clock-outline" placeholder="根据用户名、名字、手机、电子邮件、个人描述模糊查询..." @on-enter="queryUser"></Input></Col>
            <Col span="6">
                <ctsi-button code="cscp.user.query" type="ghost" shape="circle" icon="ios-search" @click="queryUser">查询</ctsi-button>
                <ctsi-button code="cscp.user.add" type="primary" shape="circle" icon="ios-search" @click="createUser">新建</ctsi-button>
            </Col>
        </Row>
        <hr style="margin:5px;"/>
        <CtsiTable v-bind="item" ref="userTable"></CtsiTable>
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
        queryCond: '',
    }
  },
  components: {
        CtsiTable 
  },
  mounted () {
  },
  computed: {
    item:function(){

        var d = {
          //sqlName: 'photo.userDetail',
          url: '/api/system/user/query',
          params: this.queryCond+'###1#@#'+ this.queryCond +'###1#@#'+ this.queryCond +'###1#@#'+ this.queryCond +'###1#@#'+ this.queryCond +'###1#@#'+ this.queryCond +'###1#@#'+ this.queryCond +'###1',
          //user_id, family_name, name, mobile, email, img_path, last_login, disc_title, disc_detail, register_time
          cols:[{title: '主键',key: 'id'},
          {title: '用户名',key: 'username'},
          {title: '姓',key: 'family_name'},
          {title: '名',key: 'name'},
          {title: '手机',key: 'mobile'},
          {title: '电子邮件',key: 'email'},
          {title: '最后登录时间',key: 'last_login'},
          {title: '描述标题',key: 'disc_title'},
          {title: '个人介绍',key: 'disc_detail'},
          {title: '注册时间',key: 'register_time'},
          {title: '操作',key: 'action',width: 150,align: 'center',
              render: (h, params) => {
                return h('div', [
                                h('ctsi-button', {props: {code:"cscp.user.edit",type: 'primary',size: 'small', },style: {marginRight: '5px'},
                                    on: {click: () => {
                                          this.$router.push({ name: 'user_detail_edit', params: { id: params.row.id }});
                                        }
                                    }
                                }, '编辑'),
                                h('ctsi-button', {props: {code:"cscp.user.del",type: 'error',size: 'small', },
                                    on: {click: () => {
                                            // alert(params.index)
                                            this.deleteUser(params.row.id);
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
    queryUser: function () {
        this.$refs.userTable.ctsiTableDataListQueryFirst();
    },
    createUser: function() {
      this.$router.push({ name: 'user_detail_edit', params: { id:0 }})
    },
    deleteUser: function(id){
    //  alert(id);
      var vm = this;
      vm.$Spin.show();
      util.ajaxMethodWidthParams(util.baseUrl+"/api/system/cscpUsers/"+id , 'DELETE', {}).then(function(data){
          //util.setFormItemValue(vm.formDef.formDynamic.items, data);
          // console.log(data);
          vm.$refs.userTable.ctsiTableDataListQueryFirst();
          vm.$Spin.hide();
          vm.$Notice.info({title: '提示',desc: '删除完成'});
        });
    },
  },
  created () {
  }
}
</script>
<style>
</style>