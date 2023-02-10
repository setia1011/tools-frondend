<template>
  <component :is="this.$route.meta.layout">
    <router-view></router-view>
  </component>
</template>

<script>
export default {
  name: 'App',
}
</script>


<style>
@import '@/assets/libs/fontawesome6/css/all.min.css';
@import '@/assets/libs/bulma/bulma.css';
@import '@/assets/css/style.css';
</style>
