<template>
  <Card>
    <Form ref="formTestNokey" :model="testNokey" :rules="ruleValidate" :label-width="100">
	  	
        <FormItem :label="this.$t('testNokey.colInt.label')" prop="colInt">
            <InputNumber v-model="testNokey.colInt" :placeholder="this.$t('testNokey.colInt.holder')" />
        </FormItem>        
        <FormItem :label="this.$t('testNokey.colVarc.label')" prop="colVarc">
	        <Input v-model="testNokey.colVarc" :placeholder="this.$t('testNokey.colVarc.holder')" />
        </FormItem>        
        <FormItem>
            <Button type="primary" @click="handleSubmit('formTestNokey')">{{ $t('submitText') }}</Button>
            <Button type="ghost" @click="handleReset('formTestNokey')" style="margin-left: 8px"> {{ $t('cancelText') }}</Button>
        </FormItem>       
    </Form>
  </Card>
</template>
<script>
import Util from '@/libs/util.js';

export default {
  data() {
    return {
      testNokey: {
        colInt: null,
        colVarc: null,
        colText: null,
      },
      ruleValidate: {  
        colInt: [
         
        ],	        
        colVarc: [
          {
            type: "string",
            max: 11,
            message: this.$t("testNokey.colVarc.max"),
            trigger: "blur"
          }
         
        ],	        
      }
    };
  },
  computed: {},
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.createItem(this.testNokey);
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
        name: "test_nokey"
      });
    },
    createItem(postBody) {
      let self = this;
      Util.ajax
        .post(`/api/testNokeys`, postBody)
        .then(response => {
          this.$Message.success(this.$t('successText'));

          self.$router.push({
            name: "test_nokey"
          });
        })
        .catch(e => {
          console.log(e);
          //this.errors.push(e);
        });
    }
  },
};
</script>
