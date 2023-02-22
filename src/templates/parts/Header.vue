<template>
    <div id="header">
        <div class="container is-max-desktop p-32">
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <router-link class="navbar-item" to="/">
                        <img alt="Logo" src="../../assets/images/add-512.png" height="28">
                    </router-link>
                    <a role="button" data="1" id="nav1" class="navix navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                
                <div class="navbar-menu">
                    <div class="navbar-start">
                        <router-link class="navbar-item" to="/about">About</router-link>
                        <div class="navbar-item has-dropdown is-hoverable">
                            <div class="navbar-link">Tools</div>
                            <div class="navbar-dropdown">
                                <router-link to="/kamus" class="navbar-item">Kamus</router-link>
                                <router-link to="/video-to-audio-wav" class="navbar-item">Video to Audio (WAV) + Subtitle</router-link>
                                <router-link to="/text-to-speech" class="navbar-item">TTS Indonesia</router-link>
                                <router-link to="/sentiment-analysis" class="navbar-item has-text-danger">Sentiment Analysis</router-link>
                                <hr class="navbar-divider">
                                <!-- <router-link to="/background-removal" class="navbar-item">Background Removal</router-link> -->
                                <router-link to="/qr-code" class="navbar-item">Qrcode Generator</router-link>
                                <router-link to="/polaroid" class="navbar-item">Polaroid</router-link>
                                <hr class="navbar-divider">
                                <router-link to="/pustaka" class="navbar-item">Pustaka</router-link>
                                <router-link to="/pustaka-admin" class="navbar-item">Pustaka (Administrator)</router-link>
                                <router-link to="#" class="navbar-item has-text-danger">Peta Wilayah Indonesia</router-link>
                            </div>
                        </div>
                        <div class="navbar-item has-dropdown is-hoverable">
                            <div class="navbar-link">Exam</div>
                            <div class="navbar-dropdown">
                                <router-link to="/exam-administrator" class="navbar-item">Administrator</router-link>
                                <router-link to="/exam-student" class="navbar-item">Student</router-link>
                                <router-link to="/exam-focus" target="_blank" class="navbar-item">Student (Focus)</router-link>
                            </div>
                        </div>
                        <router-link class="navbar-item" to="/users-list">Users</router-link>
                        <div class="navbar-item has-dropdown is-hoverable">
                            <div class="navbar-link">External</div>
                            <div class="navbar-dropdown">
                                <a href="https://editsvgcode.com/" target="_blank" class="navbar-item">SVG Creator</a>
                                <a href="https://loading.io/" target="_blank" class="navbar-item">Loading.IO</a>
                                <a href="https://skeletonreact.com/" target="_blank" class="navbar-item">Shimmer Creator</a>
                                <a href="https://www.svgrepo.com/" target="_blank" class="navbar-item">SVGREPO</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="navbar-end">
                        <div class="navbar-item">
                            <div class="buttons">
                                <a class="button is-small has-background-white has-text-dark">
                                    <strong>Hi.. {{ store?.userInfo?.name }}</strong>
                                </a>
                                <span class="button is-small is-outlined is-danger" v-on:click="userExit">
                                    <i class="fa-solid fa-right-from-bracket"></i>
                                </span>
                                <!-- <router-link to="/" class="exit button is-light">
                                    <i class="fa-brands fa-square-github"></i>
                                    <i class="fa-brands fa-github"></i>
                                </router-link> -->
                            </div>
                        </div>
                    </div>
                </div>

                <!-- mobile sidebar -->
            </nav>
        </div>
    </div>
</template>

<script>
import { authStore } from "@/stores/auth";

export default {
    name: 'Header',
    setup() {
        const store = authStore();
        return { store };
    },
    data() {
        return {
            name: null
        }
    },
    methods: {
        userExit: async function() {
            await this.store.userExit();      
        }
    }
}
</script>