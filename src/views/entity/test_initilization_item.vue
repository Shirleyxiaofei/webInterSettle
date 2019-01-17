<template>
  <Card>
    <Form ref="formTestInitilization" :model="testInitilization" :rules="ruleValidate" :label-width="100">
	        <FormItem :label="this.$t('testInitilization.id.label')" prop="id" v-if="this.$route.params.id">
		            <InputNumber v-model="testInitilization.id" disabled />		    </FormItem>        
	  	
        <FormItem :label="this.$t('testInitilization.name.label')" prop="name">
	        <Input v-model="testInitilization.name" :placeholder="this.$t('testInitilization.name.holder')" />
        </FormItem>        
        <FormItem :label="this.$t('testInitilization.age.label')" prop="age">
	        <Input v-model="testInitilization.age" :placeholder="this.$t('testInitilization.age.holder')" />
        </FormItem>        
        <FormItem :label="this.$t('testInitilization.testdatetime.label')" prop="testdatetime">
            <DatePicker type="datetime" v-model="testInitilization.testdatetime" :placeholder="this.$t('testInitilization.testdatetime.holder')" style="width: 200px" />
        </FormItem>        
        <FormItem :label="this.$t('testInitilization.testbigint.label')" prop="testbigint">
            <InputNumber v-model="testInitilization.testbigint" :placeholder="this.$t('testInitilization.testbigint.holder')" />
        </FormItem>        
        <FormItem :label="this.$t('testInitilization.testdecimal.label')" prop="testdecimal">
            <InputNumber v-model="testInitilization.testdecimal" :placeholder="this.$t('testInitilization.testdecimal.holder')" />
        </FormItem>        
        <FormItem :label="this.$t('testInitilization.testfloat.label')" prop="testfloat">
            <InputNumber v-model="testInitilization.testfloat" :placeholder="this.$t('testInitilization.testfloat.holder')" />
        </FormItem>        
        <FormItem :label="this.$t('testInitilization.testdouble.label')" prop="testdouble">
            <InputNumber v-model="testInitilization.testdouble" :placeholder="this.$t('testInitilization.testdouble.holder')" />
        </FormItem>        
        <FormItem :label="this.$t('testInitilization.testcahr.label')" prop="testcahr">
	        <Input v-model="testInitilization.testcahr" :placeholder="this.$t('testInitilization.testcahr.holder')" />
        </FormItem>        
        <FormItem :label="this.$t('testInitilization.testdate.label')" prop="testdate">
            <DatePicker type="datetime" v-model="testInitilization.testdate" :placeholder="this.$t('testInitilization.testdate.holder')" style="width: 200px" />
        </FormItem>        
        <FormItem :label="this.$t('testInitilization.teststamp.label')" prop="teststamp">
            <DatePicker type="datetime" v-model="testInitilization.teststamp" :placeholder="this.$t('testInitilization.teststamp.holder')" style="width: 200px" />
        </FormItem>        
        <FormItem :label="this.$t('testInitilization.testtime.label')" prop="testtime">
            <DatePicker type="datetime" v-model="testInitilization.testtime" :placeholder="this.$t('testInitilization.testtime.holder')" style="width: 200px" />
        </FormItem>        
        <FormItem>
            <Button type="primary" @click="handleSubmit('formTestInitilization')">{{ $t('submitText') }}</Button>
            <Button type="ghost" @click="handleReset('formTestInitilization')" style="margin-left: 8px"> {{ $t('cancelText') }}</Button>
        </FormItem>       
    </Form>
  </Card>
</template>
<script>
import Util from '@/libs/util.js';

export default {
  data() {
    return {
      testInitilization: {
        id: null,
        name: null,
        age: null,
        testdatetime: null,
        testbigint: null,
        testdecimal: null,
        testfloat: null,
        testdouble: null,
        testcahr: null,
        testdate: null,
        teststamp: null,
        testtime: null,
      },
      ruleValidate: {  
        name: [
          {
            required: true,
            message: this.$t("testInitilization.name.required"),
            trigger: "blur"
          },
          {
            type: "string",
            max: 50,
            message: this.$t("testInitilization.name.max"),
            trigger: "blur"
          }
         
        ],	        
        age: [
          {
            required: true,
            message: this.$t("testInitilization.age.required"),
            trigger: "blur"
          },
          {
            type: "string",
            max: 50,
            message: this.$t("testInitilization.age.max"),
            trigger: "blur"
          }
         
        ],	        
        testdatetime: [
          {
            type: "date",
            required: true,
            message: this.$t("testInitilization.testdatetime.required"),
            trigger: "blur"
          },
         
        ],	        
        testbigint: [
          {
            type: "integer",
            required: true,
            message: this.$t("testInitilization.testbigint.required"),
            trigger: "blur"
          },
         
        ],	        
        testdecimal: [
          {
            type: "integer",
            required: true,
            message: this.$t("testInitilization.testdecimal.required"),
            trigger: "blur"
          },
         
        ],	        
        testfloat: [
          {
            type: "float",
            required: true,
            message: this.$t("testInitilization.testfloat.required"),
            trigger: "blur"
          },
         
        ],	        
        testdouble: [
          {
            type: "float",
            required: true,
            message: this.$t("testInitilization.testdouble.required"),
            trigger: "blur"
          },
         
        ],	        
        testcahr: [
          {
            required: true,
            message: this.$t("testInitilization.testcahr.required"),
            trigger: "blur"
          },
          {
            type: "string",
            max: 10,
            message: this.$t("testInitilization.testcahr.max"),
            trigger: "blur"
          }
         
        ],	        
        testdate: [
         
        ],	        
        teststamp: [
         
        ],	        
        testtime: [
         
        ],	        
      }
    };
  },
  computed: {},
  methods: {
    init() {
      	let id = this.$route.params.id;
      if (id) {
        this.getItem(id);
      }
    },
    handleSubmit(name) {
      	let id = this.$route.params.id;
      this.$refs[name].validate(valid => {
        if (valid) {
          if (id) {
            this.updateItem(this.testInitilization);
          } else {
            this.createItem(this.testInitilization);
          }
        } else {
          this.$Message.error(this.$t('errorText'));
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();

      let tagName = this.$route.name;
      //this.$store.commit("removeTag", tagName);
      //this.$store.commit("closePage", tagName);

      this.$router.push({
        name: "test_initilization"
      });
    },
    getItem(id) {
      let self = this;
      Util.ajax
        .get(`/api/testInitilizations/${id}`)
        .then(response => {
          self.testInitilization = response.data;
        })
        .catch(e => {
          console.log(e);
          //this.errors.push(e);
        });
    },
    createItem(postBody) {
      let self = this;
      Util.ajax
        .post(`/api/testInitilizations`, postBody)
        .then(response => {
          this.$Message.success(this.$t('successText'));

          self.$router.push({
            name: "test_initilization"
          });
        })
        .catch(e => {
          console.log(e);
          //this.errors.push(e);
        });
    }
    ,
    updateItem(putBody) {
      let self = this;
      Util.ajax
        .put(`/api/testInitilizations`, putBody)
        .then(response => {
          this.$Message.success(this.$t('successText'));
          self.$router.push({
            name: "test_initilization"
          });
        })
        .catch(e => {
          console.log(e);
          //this.errors.push(e);
        });
    }
  },
  mounted() {
    this.init();
  },
  activated() {
    this.init();
  }
};
</script>
