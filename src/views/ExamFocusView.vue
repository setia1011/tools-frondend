<template>
    <div id="main" class="container is-max-desktop p-32 mt-5">
        <button v-if="!show" class="button is-small is-dark mb-5" v-on:click="backTo">
            <span class="icon">
                <i class="fa-thin fa-note"></i>
            </span>
            <span>Exam List</span>
        </button>
        <button v-if="show" class="button is-small is-dark is-outlined mb-5" v-on:click="backTo">
            <span class="icon">
                <i class="fa-solid fa-arrow-left"></i>
            </span>
        </button>
        <button v-if="show" class="button ml-1 is-small is-success is-outlined mb-5" v-on:click="resetAnswers(questions[0].session_id)">
            <span class="icon">
                <i class="fa-solid fa-timer"></i>
            </span>
        </button>
        <div v-if="show" class="mb-5">
            <h2 class="is-size-5 has-text-weight-bold">{{ session_title }}</h2>
            <span>{{ session_description }}</span>
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
            <div class="columns is-multiline">
                <div v-for="(item, index) in questions" :key="item.question_id" 
                    class="column mt-4 is-relative is-half-tablet is-three-quarters-tablet is-full-mobile" style="padding-bottom: 5rem;">
                    <div class="is-size-6 has-text-weight-bold has-text-grey mb-1">{{ index += 1 }}. {{ item.ref_question.question }}</div>
                    <div v-for="(t, i) in item.ref_options" :key="t.id">
                        <div class="control">
                            <label class="radio">
                                <input type="radio" v-model="item.selected_answer_id" :name="item.question_id" :value="t.id"> {{ t.option }}
                            </label>
                        </div>
                    </div>
                    
                    <div style="position: absolute; bottom: 0; border-bottom: 1px solid #dfdfdf; width: 95%; padding-bottom: 10px;">
                        <div class="mt-4" v-if="answers">
                            <span v-for="(i, e) in answers" :key="i">
                                <span v-if="i.question_id == item.question_id">
                                    <div v-if="i.s_answer_id == i.r_answer_id" class="control m-0 mb-1 p-0">
                                        <div class="tags has-addons">
                                        <span class="tag is-dark"><i class="fa-solid fa-check"></i></span>
                                        <span class="tag is-success">1</span>
                                        </div>
                                    </div>
                                    <div v-else class="control m-0 mb-1 p-0">
                                        <div class="tags has-addons">
                                        <span class="tag is-dark"><i class="fa-solid fa-xmark"></i></span>
                                        <span class="tag is-danger">0</span>
                                        </div>
                                    </div>
                                    <span class="is-underlined">answer: {{ i.r_answer }}</span>
                                </span>
                            </span>
                        </div>
                        <span v-else>---</span>
                    </div>
                </div>
            </div>

            <div class="mt-5">
                <button class="button is-small is-dark" v-on:click="checkAnswers">
                    <!-- <span class="icon">
                        <i class="fa-solid fa-arrow-left"></i>
                    </span> -->
                    <span>Check answers</span>
                </button>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
name: 'ExamFocusView',
data() {
        return {
            show: false,
            session_id: null,
            session_title: null,
            session_description: null,
            sessions: [],
            questions: [],
            selected_answer_id: null,
            answers: null,
            counter: 0
        }
    },
    watch: {
    },
    computed: {
        selected_answers() {
            return this.questions.map(item => [item.question_id, item.selected_answer_id])
        }
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
            })
        },
        fetchQuestions: async function(v) {
            await this.axios.post("http://127.0.0.1:8000/quiz/question-by-session", {
                session_id: v
            }).then((res) => {
                if (res.data) {
                    res.data.forEach(e => {
                        e['selected_answer_id'] = null;
                    });
                    this.session_id = res.data[0].ref_session.id;
                    this.session_title = res.data[0].ref_session.session;
                    this.session_description = res.data[0].ref_session.session_description;
                    this.questions = res.data;
                    this.show = true;
                }
            });
        },
        checkAnswers: async function() {
            await this.axios.post("http://127.0.0.1:8000/quiz/answers-by-session", {
                session_id: this.session_id
            }).then((res) => {
                var x = [];
                this.selected_answers.forEach((item, index) => {
                    x[index] = {};
                    x[index]['question_id'] = item[0];
                    x[index]['question'] = res.data[index].ref_question.question;
                    x[index]['s_answer_id'] = item[1];
                    if (res.data[index].question_id == item[0]) {
                        x[index]['r_answer_id'] = res.data[index].ref_answers[0].answer;
                        res.data[index].ref_options.forEach((i, e) => {
                            if (i.id == res.data[index].ref_answers[0].answer) {
                                x[index]['r_answer'] = i.option;
                            }
                            if (item[1] == i.id) {
                                x[index]['s_answer'] = i.option;
                            }
                        });
                    }
                });
                this.answers = x;
                // console.log(this.answers);
            })
        },
        backTo: function() {
            this.show = false;
            this.resetSession();
            this.fetchSessions();
        },
        resetSession: function() {
            // this.show = false;
            this.session_id = null;
            this.session_title = null;
            this.session_description = null;
            this.sessions = [];
            this.questions = [];
            this.selected_answer_id = null;
            this.answers = null;
            this.counter = 0;
        },
        resetAnswers: function() {
            this.fetchQuestions(1);
            this.selected_answer_id = null;
            this.answers = null;
            this.counter = 0;
        }
    }
}
</script>

<style>
    #main {
        margin-bottom: 30px !important;   
    }
    #header {
        display: none !important;
    }
    footer {
        display: none !important;
    }
</style>
  