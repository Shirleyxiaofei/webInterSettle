<template>
  <div>
    <Row  :gutter="16" type="flex" justify="center" align="top">
        <Col span="24" style="border: #fff 1px solid; margin:5px;">
          <Form ref="workGroupForm" :model="workGroup" :label-width="100" :rules="ruleValidate">
            <Row type="flex" justify="center" :gutter="16">
                <Col span="18">
                    <FormItem prop="title" label="ID" style="display:none;">
                        <Input type="text" v-model="workGroup.id" placeholder="ID" disabled>
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="groupName" label="工作组名称">
                        <Input type="text" v-model="workGroup.groupName" placeholder="工作组名称">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="description" label="描述">
                        <Input type="text" v-model="workGroup.description" placeholder="工作组描述">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="orgId" label="部门ID" style="display:none;">
                        <Input type="text" v-model="workGroup.orgId" placeholder="部门ID">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <hr style="margin-bottom:15px;"></hr>
                    <FormItem prop="users" label="人员">
                        <Select ref="userSelect"
                            v-model="workGroup.users" multiple filterable remote :remote-method="remoteUserMethod" :label-in-value="true"
                            :loading="userLoading" :label="currentUserNames" @on-change="userChange">
                            <Option v-for="(option, index) in userOptions" :value="option.value" :key="index">{{option.label}}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
          <FormItem>
            <Button type="primary" @click="handleSubmit('workGroupForm')">提交</Button>
            <Button type="ghost" @click="handleReset('workGroupForm')" style="margin-left: 8px">重置</Button>
            <Button type="ghost" @click="closeMe" style="margin-left: 8px">返回</Button>
        </FormItem>
            </Form>
        </Col>
    </Row>
    
    
  </div>
</template>

<script>
/* eslint-disable */
import util from '@/libs/util.js';

import Vue from 'vue'

export default {
  name: 'workGroupEdit',
  data () {
      return{
        workGroup: {id: null, groupName: null, description: null, orgId: null, users: [],usersObj:[]},
        menuData: [{title: '加载中...'}],
        userLoading: false,
        list: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming'],
        userOptions : [],
        ruleValidate: {
          groupName: [
              { required: true, message: '名称不能为空!', trigger: 'blur' }
          ],
          description: [
              { required: true, message: '描述不能为空', trigger: 'change' }
          ]
        }
      }
    },
    computed: {
            currentUserNames: function(){
                var names = [];
                for( var i=0; i<this.workGroup.usersObj.length; i++ ){
                    names.push( this.workGroup.usersObj[i].label);
                }
                return names;
            }
        },
  methods: {
    handleSubmit: function (name) {
        var vm = this;
      this.$refs[name].validate((valid) => {
        if (valid) {
            if( vm.workGroup.users == null) vm.workGroup.users = [];
            var userIds = []
            for(var i=0; i<vm.workGroup.users.length; i++){
                userIds.push({userId:vm.workGroup.users[i]});
            }
            var param = {
            id: this.workGroup.id,
            groupName: this.workGroup.groupName,
            description: this.workGroup.description,
            orgId: this.workGroup.orgId,
            userDetailDTOs: userIds
          }
          // var values = [this.findValue('id'), this.findValue('name'), this.findValue('role_extent'),this.findValue('parent_id'),this.findValue('icon')];
          //var vm = this;
          this.$Spin.show();
          var method = "PUT";
          if( this.$route.params.id == null || this.$route.params.id == '' || this.$route.params.id == '0' ){
            method = "POST";
          }
          util.ajaxMethodWidthParams(util.baseUrl+"/api/system/cscpWorkGroups", method, param).then(function(data){
            vm.$Spin.hide();
            vm.$Notice.info({title: '提示',desc: '保存完成'});
            vm.closeMe();
          });
        } else {
            this.$Notice.info({title: '提示',desc: '请补充校验项!'});
        }
      })
    },
    handleReset: function (payload) {
      this.getData();
      this.$Notice.info({title: '提示',desc: '重置完成'});
    },
    getData : function (){
      var vm = this;
      if( this.$route.params.id == 0 ){
        // var data = {id: null, groupName : null, description: null, orgId:null};
        //util.setFormItemValue(vm.formDef.formDynamic.items, data);
        return;
      }else{
        this.$Spin.show();
        util.ajaxMethodWidthParams(util.baseUrl+"/api/system/cscpWorkGroups/"+this.$route.params.id, "GET", {}).then(function(data){
          Object.assign(vm.workGroup, data);
          if( data.userDetailDTOs == null) data.userDetailDTOs = [];
          //vm.workGroup.usersObj = data.userDetailDTOs;
          vm.workGroup.usersObj = [];
          var op = [];
          for( var i=0; i<data.userDetailDTOs.length; i++){
              vm.workGroup.users.push(data.userDetailDTOs[i].userId);
              op.push({value:data.userDetailDTOs[i].userId, label: data.userDetailDTOs[i].familyName+" "+data.userDetailDTOs[i].name+"("+data.userDetailDTOs[i].username+")("+data.userDetailDTOs[i].mobile+")" });
              vm.workGroup.usersObj.push({value:data.userDetailDTOs[i].userId, label: data.userDetailDTOs[i].familyName+" "+data.userDetailDTOs[i].name+"("+data.userDetailDTOs[i].username+")("+data.userDetailDTOs[i].mobile+")" });
          }
          vm.userOptions = op;
          vm.$Spin.hide();
        });
      }
    },
    findValue(prop) {
      var items = this.formDef.formDynamic.items;
      for( var i=0; i<items.length; i++){
        if( items[i].props === prop ){
          return items[i].value;
        }
      }
    },
    closeMe () {
        util.closeRoute(this, "work_group_edit", 'workgroup-management');
    //   // alert("close me");
    //   var name = 'work_group_edit';
    //   let pageOpenedList = this.$store.state.app.pageOpenedList;
    //   let lastPageObj = pageOpenedList[0];
    //   let len = pageOpenedList.length;
    //   for (let i = 1; i < len; i++) {
    //     if (pageOpenedList[i].name === name) {
    //         if (i < (len - 1)) {
    //             lastPageObj = pageOpenedList[i + 1];
    //         } else {
    //             lastPageObj = pageOpenedList[i - 1];
    //         }
    //         break;
    //     }
    //   }
            
    //   this.$store.commit('removeTag', name);
    //   this.$store.commit('closePage', name);
    //   pageOpenedList = this.$store.state.app.pageOpenedList;
    //   localStorage.pageOpenedList = JSON.stringify(pageOpenedList);
    //   this.$router.push({ name: 'workgroup-management'});
    },
    remoteUserMethod( query ){
        var vm = this;
        if (query !== '') {
            var params = query+'###1#@#'+ query +'###1#@#'+ query +'###1#@#'+ query +'###1#@#'+ query +'###1#@#'+ query +'###1#@#'+ query +'###1';
            util.querySqlAction('/api/system/user/query', params, 0, 1000000).then(function(data){
                console.log(data);
                //alert(data.length);
                var op = [];
                for( var i=0; i<data.data.length; i++){
                    op.push({value:data.data[i].id, label: data.data[i].family_name+" "+data.data[i].name+"("+data.data[i].username+")("+data.data[i].mobile+")" });
                }
                vm.userOptions = op;
            });
        } else {
            vm.userOptions = [];
        }
    },
    userChange(data){
        util.syncArray(data, this.workGroup.usersObj);
    }
  },
  created () {
    this.getData();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'getData'
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
