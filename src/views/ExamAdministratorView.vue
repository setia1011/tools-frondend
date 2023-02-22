<template>
<div id="main" class="container is-max-desktop p-32 mt-5">
    <page-header></page-header>
    <div class="columns is-multiline">
        <div class="column is-half">
            <v-select class="v-select-x"
                v-model="action" 
                :reduce="action => action.value"
                :options="action_options" 
                placeholder="Select action">
            </v-select>
        </div>
    </div>

    <!-- Category -->
    <div class="columns is-multiline" v-if="action === 'category'">
        <div class="column is-half">
            <h1 class="is-size-5 mb-5 has-text-weight-bold"><i class="fa-regular fa-file-circle-plus"></i> Category</h1>
            <div class="columns is-multiline">
                <div class="column is-half">
                    <input type="text" class="input" v-model="category">
                </div>
                <div class="column is-full">
                    <textarea class="textarea" v-model="category_description"></textarea>
                </div>
                <div class="column is-full">
                    <button class="button is-success" v-on:click="addCategory">Create</button>
                </div>
            </div>
        </div>

        <div class="column">
            <div class="mb-4 box">
                <table class="table is-narrow is-fullwidth is-hoverable">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(i, index) in categories" :key="index">
                            <td>{{ (cPage * cPageSize) - cPageSize + index+1 }}</td>
                            <td>{{ i.category }}</td>
                            <td>{{ i.category_description }}</td>
                            <td><button class="button is-small is-danger is-outlined"><i class="fa-regular fa-trash-can-list"></i></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <nav class="pagination is-small">
            <paginate
            v-model="cPage"
            :page-count="cPageCount"
            :page-range="3"
            :margin-pages="0"
            :click-handler="clickCallback"
            :prev-link-class="'pagination-link'"
            :page-link-class="'pagination-link'"
            :next-link-class="'pagination-link'"
            :prev-text="'<i class=\'fa-solid fa-arrow-left\'></i>'"
            :next-text="'<i class=\'fa-solid fa-arrow-right\'></i>'"
            :no-li-surround="true"
            :active-class="'is-current'"
            :first-last-button="true"
            :first-button-text="'<i class=\'fa-solid fa-arrow-left-long-to-line\'></i>'"
            :last-button-text="'<i class=\'fa-solid fa-arrow-right-long-to-line\'></i>'"
            :hide-prev-next="true"
            :container-class="'pagination-list'"
            >
            </paginate>
        </nav>
        </div>
    </div>

    <!-- Question & Answer -->
    <div class="columns is-multiline">
        <div class="column"></div>
    </div>
</div>
</template>
  
<script>
import Paginate from "vuejs-paginate-next";
import vSelect from "vue-select";

export default {
name: 'ExamAdministrator',
components: {
    Paginate,
    vSelect
},
data() {
    return {
        disops: {
            'action': false
        },
        action: null,
        action_options: [
            {label: 'Category', value: 'category'},
            {label: 'Question & Answer', value: 'question'},
            {label: 'Session', value: 'session'}
        ],
        category: null,
        cPage: 1,
        cPageCount: 0,
        cPageSize: 5,
        categories: [],
        category_description: null
    }
},
watch: {
},
mounted() {
    this.getCategories();
},
methods: {
    isAction: function(event, action) {
        this.action = action;
    },
    getCategories: async function() {
        await this.axios.get(`http://localhost:8000/quiz/categories?page=${this.cPage}&size=${this.cPageSize}`, {
        }).then((res) => {
            this.categories = res.data.items;
            this.cPageCount = res.data.total_pages;
        })
    },
    clickCallback: function (pageNum) {
        this.cPage = pageNum;
        this.getCategories();
    },
    addCategory: async function() {
        await this.axios.post("http://127.0.0.1:8000/quiz/category/", {
            "category": this.category,
            "category_description": this.category_description
        }).then((res) => {
            this.getCategories();
        })
    }
}
}
</script>

<style scoped>
@import "vue-select/dist/vue-select.css";
</style>