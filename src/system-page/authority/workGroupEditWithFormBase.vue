<template>
  <div>
    <h1>{{hello}}</h1>
    <Row  :gutter="16" type="flex" justify="center" align="top">
        <Col span="24" style="border: #fff 1px solid; margin:5px;">
          <CtsiFormBase v-bind="formDef" v-on:parentSubmit="handleSubmit" v-on:parentReset="handleReset" >
            <Button type="ghost" @click="closeMe()" style="margin-left: 8px">返回</Button>
          </CtsiFormBase>
        </Col>
    </Row>
    
    
  </div>
</template>

<script>
/* eslint-disable */
import CtsiFormBase from 'ctsi-form/src/components/'
import { ajaxMethodWidthParams} from '@/store/api/api'
import util from '@/libs/util.js';

import Vue from 'vue'


Vue.use(CtsiFormBase)

var itemTemplate= {label: "",value: '',props: '',placeholder: '',type: 'text',icon: {icon:'key',position:"prepend"},slot: 'prepend',disable:false, showMessage: true, rules: [] };
var itemArray = [{label:"主键", props:'id', disable:true},
 {label:"名称", placeholder:"工作组名称", props:"groupName",rules:[{required: true,message: '名称不能为空',trigger: 'blur'}]},
 {label:"描述", placeholder:"工作组描述", props:"description",rules:[{required: true,message: '描述不能为空',trigger: 'blur'}]},
 {label:"组织机构ID", props:"orgId",disable:true}];
console.log("###############################");
// var {...itemx} = itemTemplate;
var ix = [];
for(var i=0; i<itemArray.length; i++){
  var iix = {};
  Object.assign(iix, itemTemplate, itemArray[i]);
  ix.push(iix);
}
//console.log(ix);
const form = {inline: false,labelPosition: 'right',labelWidth: 80,showMessage: true,autocomplete: 'on',colspan:18,items: ix}


export default {
  name: 'workGroupEdit',
  data () {
      return{
        hello: 'hello world',
        form: {
          tableId:6
        },
        formDef: {
          formDynamic: form,
          submitFunc: 'parentSubmit',
          resetFunc: 'parentReset'
        },
        menuData: [{title: '加载中...'}]
      }
    },
  methods: {
    handleSubmit: function (payload) {
      console.log(payload);
      if( payload.valid == true){
        //这里要提交数据库保存
        var param = {
          id: util.findFormItemValue(this.formDef.formDynamic.items,'id'),
          groupName: util.findFormItemValue(this.formDef.formDynamic.items,'groupName'),
          description:util.findFormItemValue(this.formDef.formDynamic.items,'description'),
          orgId:util.findFormItemValue(this.formDef.formDynamic.items,'orgId')
        }
        // var values = [this.findValue('id'), this.findValue('name'), this.findValue('role_extent'),this.findValue('parent_id'),this.findValue('icon')];
        var vm = this;
        this.$Spin.show();
        var method = "PUT";
        if( this.$route.params.id == null || this.$route.params.id == '' || this.$route.params.id == '0' ){
          method = "POST";
        }
        util.ajaxMethodWidthParams(util.baseUrl+"/api/system/cscpWorkGroups", method, param).then(function(data){
          //util.setFormItemValue(vm.formDef.formDynamic.items, data);
          console.log(data);
          vm.$Spin.hide();
          vm.$Notice.info({title: '提示',desc: '保存完成'});
          vm.closeMe();
        });
        // postMetaData(6, values, 'update').then(function(data){
        //   console.log(data);
          // vm.$Spin.hide();
        //   vm.$Notice.info({title: '提示',desc: '保存成功!'});
        // });
      }else{
        this.$Notice.info({title: '提示',desc: '请补充校验项!'});
      }
    },
    handleReset: function (payload) {
      this.$Notice.info({title: '提示',desc: '重置完成'});
      console.log(payload);
    },
    getData : function (){
      var vm = this;
      if( this.$route.params.id == 0 ){
        var data = {id: null, groupName : null, description: null, orgId:null};
        util.setFormItemValue(vm.formDef.formDynamic.items, data);
        return;
      }else{
        this.$Spin.show();
        util.ajaxMethodWidthParams(util.baseUrl+"/api/system/cscpWorkGroups/"+this.$route.params.id, "GET", {}).then(function(data){
          util.setFormItemValue(vm.formDef.formDynamic.items, data);
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
    closeMe : function() {
      // alert("close me");
      var name = 'work_group_edit';
      let pageOpenedList = this.$store.state.app.pageOpenedList;
      let lastPageObj = pageOpenedList[0];
      let len = pageOpenedList.length;
      for (let i = 1; i < len; i++) {
        if (pageOpenedList[i].name === name) {
            if (i < (len - 1)) {
                lastPageObj = pageOpenedList[i + 1];
            } else {
                lastPageObj = pageOpenedList[i - 1];
            }
            break;
        }
      }
            
      this.$store.commit('removeTag', name);
      this.$store.commit('closePage', name);
      pageOpenedList = this.$store.state.app.pageOpenedList;
      localStorage.pageOpenedList = JSON.stringify(pageOpenedList);
      this.$router.push({ name: 'workgroup-management'});
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
