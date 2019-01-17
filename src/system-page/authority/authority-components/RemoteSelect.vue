/*
  这个没什么用，后来发现选中的那个objs需要缓存起来，放在当前对象里面不合适。好像啥都没有变，不会重新初始化，也不会全局缓存，还不如放在父对象里面。
 */

<template>
  <Select ref="remoteSelect" v-model="model" :value="value" multiple filterable remote 
  :remote-method="remoteSelectDataMethod" :label-in-value="true" :loading="remoteLoading" :label="currentLabelNames" @on-change="optionsChange">
    <Option v-for="(option, index) in remoteOptions" :value="option.value" :key="index">{{option.label}}</Option>
  </Select>
</template>

<script>
/* eslint-disable */
import axios from 'axios';

    export default {
        name: 'RemoteSelect',
        data () {
            return {
              remoteOptions : [],
              remoteLoading: false,
              remoteObjs: [],
              model: [],
              currentLabelNames: [],
              list: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming']
            }
        },
        computed: {
          currentLabelNameComputed: function(){
            var names = [];
            for( var i=0; i<this.remoteObjs.length; i++ ){
              names.push( this.RemoteSelect[i].label);
            }
            console.log(names);
            return names;
          }
        },
        props: ['url', 'valueField', 'labelField', "value"],
        computed: {
          remoteLabel(){
            return '';
          }
        },
        watch: {
          value (val) {
            console.log("####### watch value ######");
            console.log( val );
            console.log(this.currentLabelNames);
            this.model = val;
            // this.currentLabelNames = this.currentLabelNameComputedMethod();
            // console.log(this.currentLabelNames);
          }
          // ,
          // model(val){
          //   console.log("####### watch model ######");
          //   console.log(val);
          //   console.log(this.currentLabelNames);
          //   // this.$emit('input',val);
          //   // console.log(this.currentLabelNames);
          //   this.currentLabelNames = this.currentLabelNameComputedMethod();
          //   console.log(this.currentLabelNames);
          // }
        },
        methods: {
          remoteSelectDataMethod( query ){
            if( query!=null && query !== ''){
              this.remoteLoading = true;
              setTimeout(() => {
                        this.remoteLoading = false;
                        const list = this.list.map(item => {
                            return {
                                value: item,
                                label: item+"name"
                            };
                        });
                        this.remoteOptions = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
                    }, 200);
            }else{
              this.remoteOptions = [];
              
            }
          },
          optionsChange (data){
            for( var i=0; i<data.length; i++){
              putObjToArray ( data[i], this.remoteObjs );
            }
            console.log("@@@@@@@@@@@ on change @@@@@@@@@@@@@")
            console.log(this.remoteObjs);
          },
          currentLabelNameComputedMethod: function(){
            var names = [];
            for( var i=0; i<this.remoteObjs.length; i++ ){
              names.push( this.remoteObjs[i].label);
            }
            console.log(this.remoteObjs);
            console.log(names);
            return names;
          }
        },
        created () {
          console.log("@@@@@@@@@ ceated @@@@@@@@@@@");
        },
        components: {

        }
    }
    function putObjToArray(obj, objArray){
        var hasObj = false;
        // console.log(objArray);
        for( var i=0; i<objArray.length; i++){
            if( objArray[i].value == obj.value){
                hasObj = true;
                return;
            }
        }
        objArray.push(obj);
        return objArray;

    }
</script>
<style>

</style>
