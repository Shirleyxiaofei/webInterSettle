<style lang="less">
    @import '../styles/unlock.less';
</style>

<template>
    <transition name="show-unlock">
        <div class="unlock-body-con" v-if="showUnlock">
            <div @click="handleClickAvator" class="unlock-avator-con" :style="{marginLeft: avatorLeft}">
                <img class="unlock-avator-img" :src="avatorPath">
                <div  class="unlock-avator-cover">
                    <span><Icon type="unlocked" :size="30"></Icon></span>
                    <p>解锁</p>
                </div>
            </div>
            <div class="unlock-avator-under-back" :style="{marginLeft: avatorLeft}"></div>
            <div class="unlock-input-con">
                <div class="unlock-input-overflow-con">
                    <div class="unlock-overflow-body" :style="{right: inputLeft}">
                        <Form ref="unlockForm" :model="form" :rules="rules">
                            <FormItem prop="password">
                                <input ref="inputEle" v-model="form.password" class="unlock-input" type="password" placeholder="密码同登录密码" />
                                <button ref="unlockBtn" @mousedown="unlockMousedown" @mouseup="unlockMouseup" @click="handleUnlock" class="unlock-btn"><Icon color="white" type="key"></Icon></button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
            <div class="unlock-locking-tip-con">已锁定</div>
        </div>
    </transition>
</template>

<script>
import Cookies from 'js-cookie';
import iView from 'iview';
export default {
    name: 'Unlock',
    data () {
        return {
            avatorLeft: '0px',
            inputLeft: '400px',
            check: null,
            form: {
                userName: null,
                password: ''
            },
            rules: {
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    props: {
        showUnlock: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    methods: {
        validator () {
            // return true; // 你可以在这里写密码验证方式，如发起ajax请求将用户输入的密码this.password与数据库用户密码对比

        },
        handleClickAvator () {
            this.avatorLeft = '-180px';
            this.inputLeft = '0px';
            this.$refs.inputEle.focus();
        },
        handleUnlock () {
            this.$refs.unlockForm.validate((valid) => {
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
                    this.form.userName = Cookies.get('username');
                    var vm = this;
                    this.$store.dispatch('login', this.form).then(data => {
                        console.log('in vue after dispatch');
                        console.log(data);
                        if (data.success == false) {
                            vm.$Notice.error({
                                title: '提示',
                                desc: '登陆失败：' + data.msg
                            });
                        } else {
                            vm.$Notice.info({
                                title: '提示',
                                desc: '登陆成功!'
                            });
                            this.avatorLeft = '0px';
                            this.inputLeft = '400px';
                            this.password = '';
                            Cookies.set('locking', '0');
                            this.$emit('on-unlock');
                            // Cookies.set('access', 0);
                            // vm.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                            // Cookies.set('user', this.form.userName);
                            // // Cookies.set('password', this.form.password);
                            // vm.$router.push({
                            //     name: 'home_index'
                            // });
                            // console.log('login finished');
                        }
                        iView.LoadingBar.finish();
                        this.$Spin.hide();
                    });
                }
            });

            // if (this.validator()) {
            //     this.avatorLeft = '0px';
            //     this.inputLeft = '400px';
            //     this.password = '';
            //     Cookies.set('locking', '0');
            //     this.$emit('on-unlock');
            // } else {
            //     this.$Notice.error({
            //         title: '提示',
            //         desc: '登陆失败!'
            //     });
            // }
        },
        unlockMousedown () {
            this.$refs.unlockBtn.className = 'unlock-btn click-unlock-btn';
        },
        unlockMouseup () {
            this.$refs.unlockBtn.className = 'unlock-btn';
        }
    }
};
</script>

<style scope>
.ivu-form-item-error-tip{
    top:53px;
    left:25px
}
</style>

