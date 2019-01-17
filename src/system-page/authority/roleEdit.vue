<template>
  <div>
      <Row  :gutter="16" type="flex" justify="center" align="top">
        <Col span="24" style="border: #fff 1px solid; margin:5px;">
          <Form ref="roleForm" :model="role" :label-width="100" :rules="ruleValidate">
            <Row type="flex" justify="center" :gutter="16">
              <Col span="18">
                <FormItem prop="id" label="ID" style="display:none">
                  <Input type="text" v-model="role.id" placeholder="主键" disabled>
                    <Icon type="key" slot="prepend"></Icon>
                  </Input>
                </FormItem>
              </Col>
              <Col span="18">
                <FormItem prop="name" label="名称" style="">
                  <Input type="text" v-model="role.name" placeholder="名称">
                    <Icon type="quote" slot="prepend"></Icon>
                  </Input>
                </FormItem>
              </Col>
              <Col span="18">
                <FormItem prop="role_extent" label="扩展属性" style="">
                  <Input type="text" v-model="role.role_extent" placeholder="扩展属性" >
                    <Icon type="arrow-right-a" slot="prepend"></Icon>
                  </Input>
                </FormItem>
              </Col>
              <Col span="18">
                <FormItem prop="parent_id" label="父ID" style="display:none">
                  <Input type="text" v-model="role.parent_id" placeholder="父ID" disabled>
                    <Icon type="key" slot="prepend"></Icon>
                  </Input>
                </FormItem>
              </Col>
              <Col span="18">
                <FormItem prop="icon" label="图标" style="">
                  <Input type="text" v-model="role.icon" placeholder="图标">
                    <Icon type="ionic" slot="prepend"></Icon>
                  </Input>
                </FormItem>
              </Col>
              <Col span="18">
                <FormItem prop="menus" label="菜单" style="">
                  <Tree ref="menuSelectTree" :data="menuData" show-checkbox multiple style="background-color:#f9f9f9;line-height: 24px;padding:10px;"></Tree>
                </FormItem>
                
              </Col>
            </Row>
          </Form>
        </Col>
    </Row>
        <Row>
          <Col span="9" offset="12">
              <Button type="primary" @click="handleSubmit('roleForm')">提交</Button>
              <Button type="ghost" @click="handleReset('roleForm')" style="margin-left: 8px">重置</Button>
              <Button type="ghost" @click="closeMe()" style="margin-left: 8px">返回</Button>
            
          </Col>
        </Row>   
          
  </div>
</template>

<script>
/* eslint-disable */
import {pageSqlAction, postMetaData, postMetaDataUpdate, menuByRole, saveMenuByRole} from '@/store/api/api'
import Vue from 'vue'
import util from '@/libs/util.js';


export default {
  name: 'roleEdit',
  data () {
      return{
        role: {id:null, name:'', role_extent:'', parent_id:0, icon:''},
        ruleValidate: {
          name: [
              { required: true, message: '名称不能为空!', trigger: 'blur' }
          ],
          icon: [
              { required: true, message: '图标不能为空!', trigger: 'blur' }
          ]
        },
        form: {
          tableId:6
        },
        menuData: [{title: '加载中...'}]
      }
    },
  methods: {
    handleSubmit: function (name) {
      console.log(name);
      var vm = this;
      this.$refs[name].validate((valid) => {
        console.log(valid);
        if( valid){
          //这里要提交数据库保存
          console.log(vm.findValue('id'));
          console.log(vm.findValue('name'));

          var values = [vm.findValue('id'), vm.findValue('name'), vm.findValue('role_extent'),vm.findValue('parent_id'),vm.findValue('icon')];
          //var vm = this;
          this.$Spin.show();
          
          var method = "update";
          var roleId = this.$route.params.id;
          var handleUrl = '/api/system/role/update';
          if( this.$route.params.id == null ){
            method = "insert";
            handleUrl = "/api/system/role/insert";
          }
          //this.saveRoleMenus(roleId);
          console.log(values);
          postMetaDataUpdate(handleUrl, values).then((data)=>{
            console.log(data);
            if(method == "insert"){
              roleId = data.ajax.msg;
            }
            vm.$Notice.info({title: '提示',desc: '保存角色信息成功!'});
            //vm.$Spin.hide();
            vm.saveRoleMenus(roleId);
            //vm.$Notice.info({title: '提示',desc: '保存成功!'});
          });
        }else{
          this.$Notice.info({title: '提示',desc: '请补充校验项!'});
        }
      });
    },
    handleReset: function (name) {
      //this.$refs[name].resetFields();
      this.getData();
      this.$Notice.info({title: '提示',desc: '重置完成'});
      console.log(name);
    },
    treeExpandLeaves(treeItem){
      var vm = this;
      for( var i=0;i<treeItem.length; i++){
        if( treeItem[i].children){
          treeItem[i].expand = true;
          vm.treeExpandLeaves(treeItem[i].children);
        }
      }
      return treeItem;
    },
    getData : function (){
      var vm = this;
      var id = this.$route.params.id;
      // console.log(id);
      // console.log(this.$route.params);
      this.hello = id;
      //this.formDef.formDynamic.items[0].value = this.$route.params.id;
      this.$Spin.show();
      //pageSqlAction("${system.common.sqls} cscp_roles ${system.common.sqlw} id=?", this.$route.params.id+"###2", 0, 1).then(function(data){
      util.querySqlAction("/api/system/role/queryById", this.$route.params.id+"###2", 0, 1).then(function(data){
      // console.log(data);
        console.log("####################");
        console.log(data);
        Object.assign(vm.role, data.data[0]);
        

        menuByRole(id).then(function(data){
          console.log(data);
          vm.menuData = vm.treeExpandLeaves(data);
          vm.$Spin.hide();
          
        })

        
      });
    },
    
    findValue(prop) {
      return this.role[prop];
    },
    
    saveRoleMenus(roleId) {
      // alert("save");
      var vm = this;
      this.$Spin.show();
      //var roleId = this.$route.params.id;
      
      var checkedNodes = this.$refs.menuSelectTree.getCheckedNodes();
      console.log("**********$$$$$$$$$$$$$$$$$$$4********");
      console.log(this.menuData);
      let idArr = [];
      this.getSelectItems(this.menuData, 0, idArr);
      console.log(idArr);

      var menus = idArr; 
      let permissions = [];
      for(var i=0; i<checkedNodes.length; i++){
        if(checkedNodes[i].type == "menu" ){
          //menus.push(checkedNodes[i].id);
        }else if( checkedNodes[i].type == "permission"){
          permissions.push(checkedNodes[i].id);
          // menus.push(checkedNodes[i].menuId);
        }
      }
      
      saveMenuByRole(roleId, menus, permissions).then(function(data){
        vm.$Notice.info({title: '提示',desc: '保存菜单配置完成'});
        vm.$Spin.hide();
        vm.closeMe();
      });
    },
    getSelectItems(items,parentId,idArr){
      let tag = false;
      for(let item of items){
        if(item.children && item.children.length>0){
          let tag_ = this.getSelectItems(item.children, item.id, idArr);
          if(tag_){
            tag = tag_;
          }
        }else{
          if(item.checked){
            idArr.push(item.id);
            tag = true;
          }
        }
      }
      if(parentId != 0){
        if(tag){
          idArr.push(parentId);
        }
      }
      return tag;
    },
     closeMe : function() {
      // alert("close me");
      util.closeRoute(this, "role_edit", 'role-management');
    }
  },
  created () {
    this.getData();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'getData'
  },
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
