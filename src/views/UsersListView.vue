<template>
    <div id="main" class="container is-max-desktop p-32 mt-5">
        <h1 class="is-size-5 mb-5 has-text-weight-bold">Users List</h1>
        
        <div class="is-relative mb-5" style="min-height: 200px;">
            <facebook-loader v-show="isLoading"></facebook-loader>
            <template v-for="(i, index) in items" :key="index">
                <li v-show="!isLoading" style="list-style: none;">{{ (page * pageSize) - pageSize + index+1 }} ~ {{ i.name }} ({{ i.trips }})</li>
            </template>
        </div>
        <nav class="pagination is-small">
            <paginate
            v-model="page"
            :page-count="pageCount"
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
</template>
  
<script>
import Paginate from "vuejs-paginate-next";
import Shimmer from '@/components/Shimmer.vue';
import {
  ContentLoader,
  FacebookLoader,
  CodeLoader,
  BulletListLoader,
  InstagramLoader,
  ListLoader,
} from 'vue-content-loader';

export default {
    name: 'UsersListView',
    components: {
    Paginate,
    Shimmer,
    ContentLoader,
    FacebookLoader,
    CodeLoader,
    BulletListLoader,
    InstagramLoader,
    ListLoader,
},
    data() {
        return {
            items: [],
            page: 1,
            pageCount: 0,
            pageSize: 15,
            isLoading: false,
            fullPage: false,
            loader: 'spinner' 
        }
    },
    computed: {
    },
    mounted() {
        this.getItems();
    },
    methods: {
        clickCallback: function (pageNum) {
            this.page = pageNum;
            this.getItems();
        },
        getItems: function() {
            let offset = this.page-1;
            this.isLoading = true;
            this.axios.get(`https://api.instantwebtools.net/v1/passenger?page=${offset}&size=${this.pageSize}`
            ).then((res) => {
                setTimeout(() => {
                    this.isLoading = false;
                    this.items = res.data.data;
                    this.pageCount = res.data.totalPages;
                }, 1000)
            })
        }
    }
}
</script>

<style scoped>

</style>
  