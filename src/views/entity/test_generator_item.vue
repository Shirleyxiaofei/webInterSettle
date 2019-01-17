<template>
  <Card>
    <Form ref="formTestGenerator" :model="testGenerator" :rules="ruleValidate" :label-width="100">
	        <FormItem :label="this.$t('testGenerator.generatorId.label')" prop="generatorId" >
			        <Input v-model="testGenerator.generatorId" disabled v-if="this.$route.params.generatorId"/>
				        <Input v-model="testGenerator.generatorId" v-else />
		    </FormItem>        
	        <FormItem :label="this.$t('testGenerator.idtwo.label')" prop="idtwo" >
		            <InputNumber v-model="testGenerator.idtwo" disabled v-if="this.$route.params.idtwo"/>
		            <InputNumber v-model="testGenerator.idtwo" v-else />
		    </FormItem>        
	  	
        <FormItem :label="this.$t('testGenerator.colStr.label')" prop="colStr">
	        <Input v-model="testGenerator.colStr" :placeholder="this.$t('testGenerator.colStr.holder')" />
        </FormItem>        
        <FormItem :label="this.$t('testGenerator.colDate.label')" prop="colDate">
            <DatePicker type="datetime" v-model="testGenerator.colDate" :placeholder="this.$t('testGenerator.colDate.holder')" style="width: 200px" />
        </FormItem>        
        <FormItem :label="this.$t('testGenerator.colLong.label')" prop="colLong">
            <InputNumber v-model="testGenerator.colLong" :placeholder="this.$t('testGenerator.colLong.holder')" />
        </FormItem>        
        <FormItem :label="this.$t('testGenerator.colDecimal.label')" prop="colDecimal">
            <InputNumber v-model="testGenerator.colDecimal" :placeholder="this.$t('testGenerator.colDecimal.holder')" />
        </FormItem>        
        <FormItem :label="this.$t('testGenerator.colFloat.label')" prop="colFloat">
            <InputNumber v-model="testGenerator.colFloat" :placeholder="this.$t('testGenerator.colFloat.holder')" />
        </FormItem>        
        <FormItem :label="this.$t('testGenerator.colDouble.label')" prop="colDouble">
            <InputNumber v-model="testGenerator.colDouble" :placeholder="this.$t('testGenerator.colDouble.holder')" />
        </FormItem>        
        <FormItem :label="this.$t('testGenerator.colChar10.label')" prop="colChar10">
	        <Input v-model="testGenerator.colChar10" :placeholder="this.$t('testGenerator.colChar10.holder')" />
        </FormItem>        
        <FormItem :label="this.$t('testGenerator.colDouble2.label')" prop="colDouble2">
            <InputNumber v-model="testGenerator.colDouble2" :placeholder="this.$t('testGenerator.colDouble2.holder')" />
        </FormItem>        
        <FormItem :label="this.$t('testGenerator.col3.label')" prop="col3">
	        <Input v-model="testGenerator.col3" :placeholder="this.$t('testGenerator.col3.holder')" />
        </FormItem>        
        <FormItem :label="this.$t('testGenerator.col4.label')" prop="col4">
	        <Input v-model="testGenerator.col4" :placeholder="this.$t('testGenerator.col4.holder')" />
        </FormItem>        
        <FormItem>
            <Button type="primary" @click="handleSubmit('formTestGenerator')">{{ $t('submitText') }}</Button>
            <Button type="ghost" @click="handleReset('formTestGenerator')" style="margin-left: 8px"> {{ $t('cancelText') }}</Button>
        </FormItem>       
    </Form>
  </Card>
</template>
<script>
import Util from '@/libs/util.js';

export default {
  data() {
    return {
      testGenerator: {
        generatorId: null,
        idtwo: null,
        colStr: null,
        colDate: null,
        colLong: null,
        colDecimal: null,
        colFloat: null,
        colDouble: null,
        colChar10: null,
        colDouble2: null,
        col3: null,
        col4: null,
        colBin: null,
        colBlob: null,
        colText: null,
        colLongtext: null,
        col1: null,
        col2: null,
      },
      ruleValidate: {  
      	generatorId: [
          {
            required: true,
            message: this.$t("testGenerator.generatorId.required"),
            trigger: "blur"
          }
        ],	
      	idtwo: [
          {
            type: "integer",
            required: true,
            message: this.$t("testGenerator.idtwo.required"),
            trigger: "blur"
          }
        ],	
        colStr: [
          {
            type: "string",
            max: 45,
            message: this.$t("testGenerator.colStr.max"),
            trigger: "blur"
          }
         
        ],	        
        colDate: [
          {
            type: "date",
            required: true,
            message: this.$t("testGenerator.colDate.required"),
            trigger: "blur"
          },
         
        ],	        
        colLong: [
         
        ],	        
        colDecimal: [
         
        ],	        
        colFloat: [
         
        ],	        
        colDouble: [
         
        ],	        
        colChar10: [
          {
            type: "string",
            max: 10,
            message: this.$t("testGenerator.colChar10.max"),
            trigger: "blur"
          }
         
        ],	        
        colDouble2: [
          {
            type: "float",
            required: true,
            message: this.$t("testGenerator.colDouble2.required"),
            trigger: "blur"
          },
         
        ],	        
        col3: [
          {
            type: "string",
            max: 255,
            message: this.$t("testGenerator.col3.max"),
            trigger: "blur"
          }
         
        ],	        
        col4: [
          {
            type: "string",
            max: 1500,
            message: this.$t("testGenerator.col4.max"),
            trigger: "blur"
          }
         
        ],	        
      }
    };
  },
  computed: {},
  methods: {
    init() {
      	let generatorId = this.$route.params.generatorId;
      	let idtwo = this.$route.params.idtwo;
      if (generatorId && idtwo) {
        this.getItem(generatorId,idtwo);
      }
    },
    handleSubmit(name) {
      	let generatorId = this.$route.params.generatorId;
      	let idtwo = this.$route.params.idtwo;
      this.$refs[name].validate(valid => {
        if (valid) {
          if (generatorId && idtwo) {
            this.updateItem(this.testGenerator);
          } else {
            this.createItem(this.testGenerator);
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
        name: "test_generator"
      });
    },
    getItem(generatorId,idtwo) {
      let self = this;
      Util.ajax
        .get(`/api/testGenerators/${generatorId}/${idtwo}`)
        .then(response => {
          self.testGenerator = response.data;
        })
        .catch(e => {
          console.log(e);
          //this.errors.push(e);
        });
    },
    createItem(postBody) {
      let self = this;
      Util.ajax
        .post(`/api/testGenerators`, postBody)
        .then(response => {
          this.$Message.success(this.$t('successText'));

          self.$router.push({
            name: "test_generator"
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
        .put(`/api/testGenerators`, putBody)
        .then(response => {
          this.$Message.success(this.$t('successText'));
          self.$router.push({
            name: "test_generator"
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
