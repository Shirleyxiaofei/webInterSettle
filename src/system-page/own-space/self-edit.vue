<template>
  <div>
    <Row  :gutter="16" type="flex" justify="center" align="top">
        <Col span="24" style="border: #fff 1px solid; margin:5px;">
          <Form ref="userDetailForm" :model="userDetail" :label-width="100" :rules="ruleValidate">
            <Row type="flex" justify="center" :gutter="16">
                <Col span="18">
                    <FormItem prop="id" label="ID" style="display:none">
                        <Input type="text" v-model="userDetail.id" placeholder="主键" disabled>
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                </Col>
                <Col span="18">
                    <FormItem prop="username" label="用户名">
                        <Input type="text" v-model="userDetail.username" placeholder="用户名" disabled v-if="usernameEditable == false">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                        <Input type="text" v-model="userDetail.username" placeholder="用户名" v-if="usernameEditable == true">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                </Col>
                <Col span="18">
                    <FormItem label="登录密码：">
                        <Button type="text" size="small" @click="showEditPassword">修改密码</Button>
                    </FormItem>
                </Col>
                <Col span="9">
                    <FormItem prop="family_name" label="姓">
                        <Input type="text" v-model="userDetail.family_name" placeholder="姓">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                </Col>
                <Col span="9">
                    <FormItem prop="name" label="名">
                        <Input type="text" v-model="userDetail.name" placeholder="名">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                </Col>
                <Col span="9">
                    <FormItem prop="mobile" label="手机">
                        <Input type="text" v-model="userDetail.mobile" placeholder="手机">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                </Col>
                <Col span="9">
                    <FormItem prop="email" label="电子邮件">
                        <Input type="text" v-model="userDetail.email" placeholder="电子邮件">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                </Col>
                <Col span="18">
                    <FormItem prop="img_path" label="头像">
                        <Input type="text" v-model="userDetail.img_path" placeholder="头像" style="display:none">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                        <Avatar :src="userDetail.img_path"   style="vertical-align:top;"/>
                        <Button type="primary" shape="circle" icon="crop" @click="showModal()"></Button>
                    </FormItem>
                </Col>
                <Col span="18">
                    <FormItem prop="disc_title" label="个人描述标题">
                        <Input type="text" v-model="userDetail.disc_title" placeholder="个人描述标题">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                </Col>
                <Col span="18">
                    <FormItem prop="disc_detail" label="个人描述">
                        <Input type="textarea" :autosize="{minRows: 2,maxRows: 10}" v-model="userDetail.disc_detail" placeholder="个人描述">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                </Col>
                <Col span="9">
                    <FormItem prop="register_time" label="注册时间">
                        <Input type="text" v-model="userDetail.register_time" placeholder="注册时间" disabled>
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                </Col>
                <Col span="9">
                    <FormItem prop="last_login" label="最后登录时间">
                        <Input type="text" v-model="userDetail.last_login" placeholder="最后登录时间" disabled>
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                </Col>

                <hr style="margin-bottom:15px;"></hr>
                <Col span="18">
                    <FormItem prop="role_ids" label="角色">
                        <Select ref="roleSelect" v-model="roles" multiple disabled>
                            <Option v-for="option in roleOptions" :value="option.value" :key="option.value">{{ option.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="9" offset="15">
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('userDetailForm')">提交</Button>
                    </FormItem>
                </Col>
            </Row>    
          
            </Form>
        </Col>
    </Row>
    <Modal
        title="设置头像"
        v-model="modalShow"  :mask-closable="false" :closable="false" @on-hidden="handlecrop1"
        class-name="vertical-center-modal" width="80%">
        <Row :gutter="10"  class="image-editor">
                        <Col span="14" class="image-editor-con1">
                            <div class="cropper" style="max-height:100%;">
                                <img id="cropimg1" alt="">
                            </div>
                        </Col>
                        <Col span="10" class="image-editor-con1">
                            <Row type="flex" justify="center" align="middle" class="image-editor-con1-preview-con">
                                <div id="preview1"></div>
                            </Row>
                            <div class="image-editor-con1-btn-con margin-top-10">
                                <input type="file" accept="image/png, image/jpeg, image/gif, image/jpg" @change="handleChange1" id="fileinput1" class="fileinput" />
                                <label class="filelabel" for="fileinput1"><Icon type="image"></Icon>&nbsp;选择图片</label>
                                <ButtonGroup>
                                    <Button @click="cropper1.zoom(0.1)" type="primary"><Icon :size="14" type="plus-round"></Icon></Button>
                                    <Button @click="cropper1.zoom(-0.1)" type="primary"><Icon :size="14" type="minus-round"></Icon></Button>
                                    <!-- <Button @click="handlecrop1" type="primary" icon="crop">裁剪</Button> -->
                                </ButtonGroup>
                            </div>
                        </Col>
                    </Row>
    </Modal>
    <Modal v-model="editPasswordModal" :closable='false' :mask-closable=false :width="500" @on-hidden="handlePassword">
            <h3 slot="header" style="color:#2D8CF0">修改密码</h3>
            <Form ref="editPasswordForm" :model="editPasswordForm" :label-width="100" label-position="right" :rules="passwordValidate">
                <FormItem label="原密码" prop="oldPass" :error="oldPassError">
                    <Input v-model="editPasswordForm.oldPass" placeholder="请输入现在使用的密码" type="password"></Input>
                </FormItem>
                <FormItem label="新密码" prop="newPass">
                    <Input v-model="editPasswordForm.newPass" placeholder="请输入新密码，至少6位字符" type="password" ></Input>
                </FormItem>
                <FormItem label="确认新密码" prop="rePass">
                    <Input v-model="editPasswordForm.rePass" placeholder="请再次输入新密码" type="password" ></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancelEditPass">取消</Button>
                <Button type="primary" @click="saveEditPass">保存</Button>
            </div>
        </Modal>
    
  </div>
</template>

<script>
/* eslint-disable */
import Cookies from 'js-cookie';
import util from '@/libs/util.js';
import Cropper from 'cropperjs';
import '../authority/cropper.min.css';

export default {
  name: 'userDetailEdit',
  data () {
      const valideRePassword = (rule, value, callback) => {
            if (value !== this.editPasswordForm.newPass) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        };
      return{
        userDetail: {id: null, did: null, username:null, family_name: null, name: null, mobile: null,email:null, img_path:null, last_login:null, disc_title:null, disc_detail:null, register_time:null, role_ids:[], role_names:[]},
        // userLoading: false,
        roles:[],
        roleOptions : [],
        ruleValidate: {
          family_name: [
              { required: true, message: '姓不能为空!', trigger: 'blur' }
          ],
          name: [
              { required: true, message: '名不能为空!', trigger: 'blur' }
          ]
        },
        modalShow : false,
        editPasswordModal: false, // 修改密码模态框显示
        oldPassError: '',
        
        cropper1: {},
            option1: {
                showCropedImage: false,
                cropedImg: ''
            },
            cropdata1: {
                x: '',
                y: '',
                w: '',
                h: '',
                deg: '',
                scaleX: '',
                scaleY: ''
            },
            editPasswordForm: {
                oldPass: '',
                newPass: '',
                rePass: ''
            },
            passwordValidate: {
                oldPass: [
                    { required: true, message: '请输入原密码', trigger: 'blur' }
                ],
                newPass: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { min: 6, message: '请至少输入6个字符', trigger: 'blur' },
                    { max: 32, message: '最多输入32个字符', trigger: 'blur' }
                ],
                rePass: [
                    { required: true, message: '请再次输入新密码', trigger: 'blur' },
                    { validator: valideRePassword, trigger: 'blur' }
                ]
            }
      }
    },
  computed: {
    usernameEditable:function(){
      return false;
    },
    userId:function(){
      console.log("@@@@@@@@@###########");
      console.log(localStorage.userId);
      return localStorage.userId;
    }
  },
  methods: {
    showEditPassword () {
        this.editPasswordModal = true;
    },
    cancelEditPass () {
        this.editPasswordModal = false;
    },
    saveEditPass () {
      var vm = this;
            this.$refs['editPasswordForm'].validate((valid) => {
                if (valid) {
                    // you can write ajax request here
                    vm.$Spin.show();
                    util.ajaxMethodWidthParams(util.baseUrl+"/api/system/cscpUserPassword", "PUT", 
                    {userId:this.userId, oldPassword:this.editPasswordForm.oldPass, newPassword:this.editPasswordForm.newPass}).then(function(data){
                      console.log(data);
                      vm.$Spin.hide();
                      if( data.success == true){
                        vm.$Notice.info({title: '提示',desc: '更改密码完成'});
                        vm.editPasswordModal = false;
                        vm.oldPassError = '';
                      }else{
                        vm.$Notice.info({title: '提示',desc: '发生错误：'+data.msg});
                        vm.oldPassError = data.msg;
                      }
                    });

                //setTimeout(()=>{this.editPasswordModal = false;},2000);
                }
            });
        },
    handlePassword(e){
        if( this.oldPassError != '' ){
          this.showEditPassword();
        }
    },
        cancelEditPass () {
            this.editPasswordModal = false;
        },
    handleSubmit: function (name) {
        console.log("############");
        console.log(name);
      this.$refs[name].validate((valid) => {
          console.log(valid);
          console.log(this.roles.join());
        if (valid) {
            var param = {
                id: this.userDetail.did,
                userId: this.userDetail.id,
                familyName: this.userDetail.family_name,
                name:this.userDetail.name,
                mobile:this.userDetail.mobile,
                email:this.userDetail.email,
                imgPath:this.userDetail.img_path,
                lastLogin:this.userDetail.last_login == null ? null : this.userDetail.last_login.replace(/ /g, 'T'),
                discTitle:this.userDetail.disc_title,
                discDetail:this.userDetail.disc_detail,
                registerTime:this.userDetail.register_time == null ? null : this.userDetail.register_time.replace(/ /g, 'T'),
                username:this.userDetail.username,
                roles: this.roles.join()
            }
            console.log(param);
          var vm = this;
          this.$Spin.show();
          var method = "PUT";
          console.log(JSON.stringify(param));
          util.ajaxMethodWidthParams(util.baseUrl+"/api/system/cscpUserDetails", method, param).then(function(data){
            console.log(data);
            vm.$Spin.hide();
            vm.$Notice.info({title: '提示',desc: '保存完成'});
            vm.closeMe();
          }).catch((error)=>{console.log(error.response)});
        } else {
            this.$Notice.info({title: '提示',desc: '请补充校验项!'});
        }
      })
    },
    handleReset: function (payload) {
      this.$Notice.info({title: '提示',desc: '重置完成'});
      console.log(payload);
    },
    getData : function (){
      var vm = this;
        this.$Spin.show();
        
        util.ajaxGetData(util.baseUrl+"/api/system/user/queryById", {params:this.userId+"###2"}).then(function(data){
            console.log(data);
            Object.assign(vm.userDetail, data.data[0]);
            vm.roles=data.data[0].role_ids == null || data.data[0].role_ids == ''? []:data.data[0].role_ids.split(',');
          vm.$Spin.hide();
        });
      
    },
    initRoles: function(){
        var vm = this;
        util.ajaxGetData("/api/system/role/query", {params:'###1#@####1', start:0, length:1000}).then(function(data){
           //Object.assign(vm.userDetail, data.data[0]);
           vm.roleOptions = [];
           for(var i=0; i<data.data.length; i++){
               vm.roleOptions.push({ value: data.data[i].id, label: data.data[i].名称, icon: data.data[i].图标 });
           }
        });
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
      util.closeRoute(this, "user_detail_edit", 'user-management');
    },
    handleChange1 (e) {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onload = () => {
                this.cropper1.replace(reader.result);
                reader.onload = null;
            };
            reader.readAsDataURL(file);
        },
        handlecrop1 (e) {
            let file = this.cropper1.getCroppedCanvas().toDataURL();
            // alert(file.length);

            // console.log("######################");
            // console.log(e);
            if( file.length > 250 * 1024){
                this.$Notice.info({title: '提示',desc: '您选择的区域太大，超过了250K。请缩小选择区域!'});
                //this.$Modal.buttonLoading = false;
                // event.stopPropagation();
                // this.modalShow = true;
                this.showModal();
                // console.log(this.modalShow);
                return;
            }
            this.option1.cropedImg = file;
            this.userDetail.img_path = file;

            //alert(file);
            console.log("######################");
            // console.log(e);
            //console.log(file);
            // console.log(this.cropdata1);
        },
    handleSuccess2 (res, file) {
        // 因为上传过程为实例，这里模拟添加 url
        //file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
        //file.name = '7eb99afb9d5f317c912f08b5212fd69a';
    },
    handleFormatError2 (file) {
        this.$Notice.warning({
            title: '文件格式不正确',
            desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        });
    },
    handleMaxSize (file) {
        this.$Notice.warning({
            title: '超出文件大小限制',
            desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
        });
    },
    showModal : function(){
        this.modalShow = true;
    }
  },
  created () {
    this.getData();
    this.initRoles();
  },
  mounted () {
        let img1 = document.getElementById('cropimg1');
        this.cropper1 = new Cropper(img1, {
            dragMode: 'move',
            preview: '#preview1',
            restore: false,
            center: false,
            highlight: false,
            aspectRatio:   1/1,
            cropBoxMovable: true,
            toggleDragModeOnDblclick: true
        });
        img1.addEventListener('crop', (e) => {
            this.cropdata1.x = parseInt(e.detail.x);
            this.cropdata1.y = parseInt(e.detail.y);
            this.cropdata1.w = parseInt(e.detail.width);
            this.cropdata1.h = parseInt(e.detail.height);
            this.cropdata1.deg = parseInt(e.detail.rotate);
            this.cropdata1.scaleX = parseInt(e.detail.scaleX);
            this.cropdata1.scaleY = parseInt(e.detail.scaleY);
        });
    },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'getData'
  }
}

</script>

<style  lang="less">
@import '../authority/image-editor.less';
@import '../../styles/common.less';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
        }
    }
</style>
