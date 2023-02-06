<template>
    <div id="main" class="container is-max-desktop p-32 mt-5">
        <h1 class="is-size-5 mb-5 has-text-weight-bold">Exam</h1>
        <div v-if="show">
            <h2 class="is-size-5 mb-5 has-text-weight-bold">Test</h2>
        </div>
        <div v-if="!show">
            <div class="tile is-ancestor" v-for="(item, index) in sessions" :key="item.id">
                <div v-on:click="fetchQuestions(item.id)" class="tile is-parent is-3" style="cursor: pointer;">
                    <article class="tile is-child box">
                        <figure class="image is-4by3">
                            <img src="https://bulma.io/images/placeholders/640x480.png">
                        </figure>
                        <p class="title mt-4">{{ item.session }}</p>
                        <p class="subtitle">{{ item.session_description }}</p>
                    </article>
                </div>
            </div>
        </div>
        <div v-if="show">
            <div class="mt-4" v-for="(item, index) in questions" :key="item.question_id">
                {{ item.ref_question.question }}
                <div v-for="(t, i) in item.ref_options" :key="t.id">
                <!-- {{ t.option }} -->
                <div class="control">
                    <label class="radio">
                        <input type="radio" :name="item.question_id"> {{ t.option }}
                    </label>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
  <script>
  export default {
    name: 'ExamStudent',
    data() {
        return {
            show: false,
            sessions: [],
            questions: []
        }
    },
    watch: {

    },
    mounted() {
        this.fetchSessions();
    },
    methods: {
        fetchSessions: async function() {
            await this.axios.get("http://127.0.0.1:8000/quiz/session", {
                data: null
            }).then((res) => {
                this.sessions = res.data;
                console.log(this.sessions);
            })
        },
        fetchQuestions: async function(v) {
            await this.axios.post("http://127.0.0.1:8000/quiz/question-by-session", {
                session_id: v
            }).then((res) => {
                this.questions = res.data;
                this.show = true;
                console.log(this.questions);
            })
        }
    }
  }
  </script>