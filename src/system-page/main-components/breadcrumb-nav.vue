<template>
  <Breadcrumb>
    <BreadcrumbItem v-for="item in currentPath" :href="item.path" :key="item.name">
      <span @click="home_page(item)" style="cursor: pointer;">{{ itemTitle(item) }}</span>
    </BreadcrumbItem>
  </Breadcrumb>
</template>

<script>
// import bus from '@/bus';
export default {
  name: "breadcrumbNav",
  props: {
    currentPath: Array
  },
  methods: {
    itemTitle(item) {
      if (typeof item.title === "object") {
        return this.$t(item.title.i18n);
      } else {
        return item.title;
      }
    },
    home_page(item) {
      console.log("item", item);
      if (item.title == "首页") {
        //   bus.$emit('home-page', {show:true})
      }
    }
  }
};
</script>

