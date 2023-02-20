import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'

import axios from 'axios';
import VueAxios from 'vue-axios';
import { debounce } from "debounce";

// import {LoadingPlugin} from 'vue-loading-overlay';
// import 'vue-loading-overlay/dist/css/index.css';

// eslint-disable-next-line import/no-unresolved,n/no-missing-import
import VuePlyr from 'vue-plyr'
// eslint-disable-next-line import/no-unresolved,n/no-missing-import
import 'vue-plyr/dist/vue-plyr.css'

// lodash (_) for debouce
var _ = require('lodash');

const pinia = createPinia()

const app = createApp(App)

app.use(VueCookies, { expires: '1d'})
app.use(pinia)
app.use(router)
app.use(debounce)
app.use(VueAxios, axios)
// app.use(LoadingPlugin)
app.use(VuePlyr)
app.mount("#app")
