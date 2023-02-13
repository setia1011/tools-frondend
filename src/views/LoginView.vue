<template>
    <div id="main" class="container is-max-desktop p-32 mt-5">
        <div class="columns is-mobile mt-6">
            <div class="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-third-fullhd m-auto">
                <div>
                    <figure class="image is-64x64">
                        <img src="../assets/images/add-512.png" height="28">
                    </figure>
                </div>
                <div class="mt-6 mb-4 is-size-6">Gunakan username dan password Anda<br>untuk mengakses <b>TOOLS</b></div>
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input class="input" type="text" v-model="username" placeholder="Username">
                        <span class="icon is-small is-left">
                            <i class="fa-regular fa-user-alien"></i>
                        </span>
                        <span class="icon is-small is-right">
                            <i class="fas fa-check"></i>
                        </span>
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icons-left">
                        <input class="input" type="password" v-model="password" placeholder="Password">
                        <span class="icon is-small is-left">
                            <i class="fa-sharp fa-solid fa-key"></i>
                        </span>
                    </p>
                </div>
                <button class="button is-success" v-on:click="userLogin">
                    <span class="icon">
                        <i class="fa-regular fa-file-import"></i>
                    </span>
                    <span>Login</span>
                </button>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import { authStore } from "@/stores/auth";
  export default {
    name: 'LoginView',
    setup() {
        const store = authStore();
        return { store };
    },
    data() {
        return {
            username: null,
            password: null
        }
    },
    mounted() {
    },
    methods: {
        async login() {
            await this.store.userLogin(this.username, this.password);
        },
        userLogin: async function() {
            await this.store.userLogin(this.username, this.password);
            await this.store.fetchUser();
        }
    }
  }
  </script>
  