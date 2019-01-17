<template>
    <div >
        <h1>角色管理</h1>
        <CtsiTable v-bind="item"></CtsiTable>
        <h2>bodhi</h2>
    </div>
</template>
<script>
/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import CtsiTable from '@/components/ctsi-table.vue'

Vue.use(Vuex)

export default {
  name: 'roleList',
  data () {
      return{
        item: {
          url: '/api/system/role/query',
          //sqlName: 'system.rolesQuery',
          params: '###1#@####1',
          cols:[{title: '主键',key: 'id'},
          {title: '名称',key: '名称'},
          {title: '图标',key: '图标'}],
          length:15
      }
    }
  },
  components: {
      CtsiTable 
  }
}
</script>
<style>
</style>