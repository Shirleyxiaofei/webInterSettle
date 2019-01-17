<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名" @on-blur="blurCaptcha">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="validCode" v-if="needCaptcha">
                            <Row >
                                <Col span="12">
                                	<Input v-model="form.validCode" placeholder="请输入验证码">
                                        <span slot="prepend">
                                            <Icon :size="16" type="ionic"></Icon>
                                        </span>
                                	</Input>
                                </Col>
                                <Col offset="1" span="10"><img :src="imgCode" @click="getCaptcha"/></Col>
                            </Row>
                        </FormItem>
                    </Form>
                    <Button @click="handleSubmit" type="primary" long>登录</Button>
                    <div style="margin-top:5px;font-size:10px;">
                        <Checkbox style="marign-top:30px;" 
                                  v-model="rememberme"
                                  @on-change="setRememberMe">记住我</Checkbox>
                    </div>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import iView from 'iview';
import util from '@/libs/util.js';
import {initDynamicRouter} from '@/router/dynamic-router.js'

export default {
    data () {
        return {
            rememberme: false,
            form: {
                userName: 'admin',
                password: '',
                validCode: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
                validCode: [
                    { required: true, message: '验证码不能为空', trigger: 'blur' }
                ]
            },
            imgCode: '',
            needCaptcha: false,
            oldUserName: ''
        };
    },
    methods: {
        setRememberMe (value) {
            if(value){
                localStorage['rememberme'] = 1;
            }else{
                localStorage['rememberme'] = 0;
            }
        },
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    iView.LoadingBar.start();
                    this.$Spin.show({
                        render: (h) => {
                            return h('div', [
                                h('Icon', {
                                    'class': 'demo-spin-icon-load',
                                    props: {
                                        type: 'load-c',
                                        size: 18
                                    }
                                }),
                                h('div', 'Loading')
                            ]);
                        }
                    });

                    var vm = this;
                    this.$store.dispatch('login', this.form).then(data => {
                        console.log('in vue after dispatch');
                        console.log('@@@@@@@@@@@@@@@@');
                        console.log(data);

                        if (data.success == false) {
                            vm.$Notice.error({
                                title: '提示',
                                desc: '登陆失败：' + data.msg
                            });
                            this.getCaptcha();
                            iView.LoadingBar.finish();
                            this.$Spin.hide();
                        } else {

                            localStorage.token = data.token;
                            //util.ajax.defaults.headers.common['token'] = data.token;

                            vm.$Notice.info({
                                title: '提示',
                                desc: '登陆成功!'
                            });
                            util.ajaxMethodWidthParams(util.baseUrl + '/api/system/cscpCurrentUserDetails', 'GET', {}).then(function (detail) {
                                console.log(detail);
                                Cookies.set('access', 0);
                                vm.$store.commit('setAvator', detail.imgPath);
                                var n = (detail.familyName == null ? '' : detail.familyName) + (detail.name == null ? '' : detail.name);
                                if (n == '') {
                                    n = vm.form.userName;
                                }
                                console.log(detail.familyName);
                                console.log(detail.name);
                                console.log(n);
                                Cookies.set('user', n);
                                Cookies.set('username', vm.form.userName);
                                Cookies.set('userId', detail.userId);
                                localStorage.userId = detail.userId;
                                console.log('@@@@@@@@@@@@@@@@@');
                                console.log(Cookies.set('username'));
                                console.log(localStorage.userId);
                                vm.$router.push({
                                    name: 'home_index'
                                });
                                console.log('login finished');
                                iView.LoadingBar.finish();
                                vm.$Spin.hide();
                            });
                        }
                    }).catch((error)=>{
                        console.log(error.response);
                        vm.$Notice.error({
                                title: '提示',
                                desc: '登陆失败：' + error.response.data.message
                        });
                        this.getCaptcha();
                        iView.LoadingBar.finish();
                        this.$Spin.hide();
                    });
                }
            });
        },
        blurCaptcha (){
            var vm = this;
            if(vm.form.userName==null || vm.form.userName==""){
                return;
            }
            if(vm.oldUserName==vm.form.userName){
                return;
            }
            vm.oldUserName=vm.form.userName;
            this.getCaptcha();
        },
        getCaptcha (){
            var vm = this;

            if(vm.form.userName==null || vm.form.userName==""){
                return;
            }
            util.ajax.get("/api/system/needCaptcha?userName="+vm.form.userName)
            .then(function(res){
                vm.needCaptcha = res.data;
                if(vm.needCaptcha){
                    util.ajax.get("/api/system/getCaptcha?userName="+vm.form.userName)
                    .then(function(imgres) {
                        vm.imgCode = imgres.data;
                    });
                }
                return vm.needCaptcha;
            });
        }
    },
    created () {
        if(!localStorage['rememberme']){
            localStorage['rememberme'] = 0;
        }
        this.oldUserName=this.form.userName;
        this.getCaptcha();
    }
};
</script>

<style>
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
</style>
