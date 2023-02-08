import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
        path: '/qr-code',
        name: 'qrcode',
        component: () => import('../views/QrView.vue')
    },
    {
        path: '/polaroid',
        name: 'polaroid',
        component: () => import('../views/PolaroidView.vue')
    },
    {
        path: '/background-removal',
        name: 'bgremoval',
        component: () => import('../views/BgRemovalView.vue')
    },
    {
        path: '/translator',
        name: 'translator',
        component: () => import('../views/TranslatorView.vue')
    },
    {
        path: '/kamus',
        name: 'kamus',
        component: () => import('../views/KamusView.vue')
    },
    {
        path: '/video-to-audio-wav',
        name: 'video to audio wav',
        component: () => import('../views/VideoToAudioView.vue')
    },
    {
        path: '/text-to-speech',
        name: 'text to speech',
        component: () => import('../views/TTSView.vue')
    },
    {
        path: '/sentiment-analysis',
        name: 'sentiment analysis',
        component: () => import('../views/SentiView.vue')
    },
    {
        path: '/exam-administrator',
        name: 'exam administrator',
        component: () => import('../views/ExamAdministratorView')
    },
    {
        path: '/exam-student',
        name: 'exam student',
        component: () => import('../views/ExamStudentView.vue')
    },
    {
        path: '/exam-focus',
        name: 'exam focus',
        component: () => import('../views/ExamFocusView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
