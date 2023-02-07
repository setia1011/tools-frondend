<template>
    <div id="main" class="container is-max-desktop p-32 mt-5">
        <button class="button is-small mb-5">
            <span class="icon">
                <i class="fa-thin fa-note"></i>
            </span>
            <span>Exam List</span>
        </button>
        <div v-if="show">
            <h2 class="is-size-5 mb-5 has-text-weight-bold">{{ session_show }}</h2>
        </div>
        <div v-if="!show">
            <div class="tile is-ancestor">
                <div v-for="(item, index) in sessions" :key="item.id" v-on:click="fetchQuestions(item.id)" class="tile is-parent is-3" style="cursor: pointer;">
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
            <div class="mt-4">
                <button class="button is-small" v-on:click="backTo">
                    <span class="icon">
                        <i class="fa-solid fa-arrow-left"></i>
                    </span>
                    <span>Back</span>
                </button>
            </div>
        </div>
    </div>
</template>
  
  <script>
import { throwStatement } from '@babel/types';

  export default {
    name: 'ExamStudent',
    data() {
        return {
            show: false,
            session_show: null,
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
                if (res.data) {
                    this.session_show = res.data[0].ref_session.session;
                    this.questions = res.data;
                    this.show = true;
                    console.log(this.questions);
                }
            })
        },
        backTo: function() {
            this.show = false;
            this.sessions = [];
            this.questions = [];
            this.fetchSessions();
        }
    }
  }
  </script>

<style scoped>
    .box {
        box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px hsl(348deg 83% 42% / 28%) !important;
    }
</style>