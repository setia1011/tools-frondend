// /store/user.js
import cookies from "vue-cookies";
import router from "@/router";
import axios from "axios";
import { defineStore } from "pinia";
import setAuthHeader from "@/utils/setAuthHeader";

export const authStore = defineStore("auth", {
    state: () => ({
        userInfo: null,
    }),
    getters: {
        getUserInfo: (state) => state.userInfo,
    },
    actions: {
        async fetchUser() {
            setAuthHeader(cookies.get('token'));
            await axios.get("http://localhost:8000/user/user-info/", {
                // headers: { Authorization: `Bearer ${cookies.get('token')}` }
            }).then((res) => {
                this.userInfo = res.data;
            }).catch((res) => {
                cookies.remove('token');
                this.userInfo = null;
                console.log(res.data);
                router.push('/user-login');
            })
        },
        async userLogin(username, password) {
            await axios.post("http://localhost:8000/user/login/", {
                username: username,
                password: password
            }).then((res) => {
                if (res.data.access_token) {
                    cookies.set('token', res.data.access_token);
                    router.push('/');
                }
            }).catch((res) => {
                cookies.remove('token');
                this.userInfo = null;
                router.push('/user-login');
            })
        },
        async userExit() {
            cookies.remove('token');
            this.userInfo = null;
            router.push('/user-login');
        }
    }
});