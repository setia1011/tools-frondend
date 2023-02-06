<template>
    <div id="main" class="container is-max-desktop p-32 mt-5">
      <h1 class="is-size-5 mb-5 has-text-weight-bold">Administrator</h1>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ExamAdministrator',
    data() {

    },
    watch: {

    },
    mounted() {
        this.fetchSessions();
    },
    methods: {
        fetchSessions: async function() {
            await this.axios.get("http://127.0.0.1:8000/quiz/session", {
                text: this.text
            }).then((res) => {
                console.log(res.data);
            })
        }
    }
  }
  </script>