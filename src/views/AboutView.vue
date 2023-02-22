<template>
  <div id="main" ref="main" class="container is-max-desktop p-32 mt-5">
    <page-header></page-header>
    <Loading v-model:active.sync="isLoading"
      :background-color="'rgb(247 247 247 / 84%)'"
      :opacity="1"
      :z-index="25"
      :is-full-page="fullPage">
      <template v-slot="before">
        <img src="loaders/pica.gif" style="width: 65px" />
      </template>
    </Loading>
  </div>
</template>

<script>
import Loader103 from "@/components/Loader103.vue";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

export default {
  name: 'AboutView',
  components: {
    Loader103,
    Loading
  },
  data() {
    return {
      isLoading: true,
      fullPage: false
    }
  },
  mounted() {
  }
}
</script>
