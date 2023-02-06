<template>
  <Header />
  <router-view/>
  <Footer />
</template>

<script>

import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      imagex: null
    }
  },
  mounted() {
    // this.getList();
  },
  methods: {
    getList() {
      this.axios.post("http://127.0.0.1:8000/qr").then((response) => {
        this.imagex = response.data.data;
      })
    }
  }
}
</script>


<style>
@import '@/assets/libs/fontawesome6/css/all.min.css';
@import '@/assets/libs/bulma/bulma.css';
@import '@/assets/css/style.css';
</style>
