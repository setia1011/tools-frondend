<template>
    <div id="main" class="container is-max-desktop p-32 mt-5">
        <page-header></page-header>
        <h1 class="is-size-5 mb-5 has-text-weight-bold">Kamus (ID - EN)</h1>
        <div class="field has-addons">
            <p class="control">
                <textarea class="textarea" style="min-width: 400px;" v-model="text" @input="typee($event.target.value)"></textarea>
            </p>
        </div>
        <div class="mt-5" ref="container">
            <div class="mb-5">
                <span 
                    v-if="show" 
                    class="tag is-success is-size-6" 
                    v-bind:class="(typing) ? 'pr-0 rr-0' : ''">
                    {{ translated }}</span>
                <span 
                    v-if="typing && text !== ''" 
                    class="tag is-success is-size-6" 
                    v-bind:class="translated !== null ? 'pl-0 rl-0' : ''">...</span>
                <div v-if="show" class="mt-4">
                    <span class="tag is-warning is-size-6" v-if="part[0] !== ''">{{ part[0] }}</span>
                </div>
            </div>
            <div v-if="text !== ''" class="is-block">
                <button class="button is-inline-block is-danger" v-on:click="clearText"><i class="fa-regular fa-trash-can-arrow-up"></i></button>
            </div>
            
        </div>
    </div>
</template>

<script>
    export default {
        name: "kamus",
        data() {
            return {
                show: false,
                typing: false,
                text: "",
                from: null,
                to: null,
                origin: null,
                translated: null,
                part: []
            }
        },
        watch: {
            text: _.debounce(
                function() {
                    this.translateText();
                }, 500
            )
        },
        mounted() {
        },
        methods: {
            typee: function(text) {
                if (text !== '') {
                    this.typing = true;
                }
            },
            translateText: async function() {
                if (this.text !== '') {
                    await this.axios.post("http://127.0.0.1:8000/translate", {
                        text: this.text
                    }).then((res) => {
                        if (res.data) {
                            setTimeout(() => {
                                this.from = res.data.from_;
                                this.to = res.data.to;
                                this.translated = res.data.translated;
                                this.part = res.data.part;
                                this.typing = false;
                                this.show = true;
                            }, 1000)
                        } else {
                            this.typing = false;
                            this.show = false;
                            setTimeout(() => {
                                loader.hide()
                            }, 1000)
                        }
                    })
                } else {
                    this.clearText();
                }
            },
            clearText: function() {
                this.text = "";
                this.from = null;
                this.to = null;
                this.origin = null;
                this.translated = null;
                this.part = [];
                this.show = false;
            }
        }
    }
</script>
  