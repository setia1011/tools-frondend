<template>
  <div id="main" class="container is-max-desktop p-32 mt-5">
    <!-- <h1>Home</h1> -->
    <span>{{ store.userInfo }}</span>
  </div>
</template>

<script>
import { authStore } from "@/stores/auth";

export default {
  name: 'HomeView',
  setup() {
    const store = authStore();
    return { store };
  },
  mounted() {
    // let loader = this.$loading.show({});
    // setTimeout(() => {
    //     loader.hide()
    // }, 1000)
  }
}
</script>
