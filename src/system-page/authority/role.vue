<template>
    <div >
        
        <Row style="background:#fff;padding:0px">
          <Col span="6" v-for="role in roles" style="padding:10px;" :key="role.id">
            <Card >
                <div style="text-align:center" v-on:click="showDetail(role.id)">
                    <!-- <img src="../../images/logo.png"> -->
                    <div style="position:absolute; right:5px; top:5px; cursor:pointer;"  v-on:click.stop="deleteRole(role.id, $event)"><Icon type="close"  size="20"></Icon></div>
                    <Icon :type="role.图标" size="50"></Icon>
                    <h3  >{{role.名称}}</h3>
                </div>
            </Card>
          </Col>
          <Col span="6" style="padding:10px;">
            <Card >
                <div style="text-align:center" v-on:click="newRole()">
                    <Icon type="plus-round" size="50"></Icon>
                    <h3>新增</h3>
                </div>
            </Card>
          </Col>
        </Row>
        
    </div>
</template>
<script>
/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import {pageSqlAction} from '@/store/api/api'
import util from '@/libs/util.js';

Vue.use(Vuex)

export default {
  name: 'roleList',
  data () {
      return{
        roles: [],
        item: {
          url: '/api/system/role/query',
          //sqlName: 'system.rolesQuery',
          params: '###1#@####1'
      }
    }
  },
  methods: {
    roleList(){
      var vm = this;
      this.$Spin.show();
      //pageSqlAction(this.item.sqlName, this.item.params, 0, 1000).then(function(data){
      util.querySqlAction(this.item.url, this.item.params, 0, 1000).then(function(data){ 
        // console.log(data);
        vm.roles=[];
        vm.roles = vm.roles.concat(data.data);
        vm.$Spin.hide();
      });
    },
    showDetail: function(id){
      this.$router.push({ name: 'role_edit', params: { id: id }})
    },
    deleteRole: function(id, event){
      // alert(id);
      var vm = this;
      if (event) event.preventDefault();
      vm.$Spin.show();
      util.ajaxMethodWidthParams(util.baseUrl+"/api/system/role/"+id , 'DELETE', {}).then(function(data){
          //util.setFormItemValue(vm.formDef.formDynamic.items, data);
          // console.log(data);
          // vm.$refs.userTable.ctsiTableDataListQueryFirst();
          vm.roleList();
          vm.$Spin.hide();
          vm.$Notice.info({title: '提示',desc: '删除完成'});
        });
      
    },
    newRole: function(){
      this.$router.push({ name: 'role_edit', params: { id: null }})
    }
  },
  created () {
    this.roleList();
  }
}
</script>
<style>
</style>