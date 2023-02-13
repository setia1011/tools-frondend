import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/templates/Login.vue'
import First from '@/templates/First.vue'
import Focus from '@/templates/Focus.vue'
import { authStore } from '@/stores/auth'

const routes = [
    {
        path: '/user-login',
        name: 'login',
        component: () => import('../views/LoginView.vue'),
        meta: {layout: Login}
    },
    {
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
        meta: {layout: First}
    },
    {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
        meta: {layout: First}
    },
    {
        path: '/qr-code',
        name: 'qrcode',
        component: () => import('../views/QrView.vue'),
        meta: {layout: First}
    },
    {
        path: '/polaroid',
        name: 'polaroid',
        component: () => import('../views/PolaroidView.vue'),
        meta: {layout: First}
    },
    {
        path: '/background-removal',
        name: 'bgremoval',
        component: () => import('../views/BgRemovalView.vue'),
        meta: {layout: First}
    },
    {
        path: '/translator',
        name: 'translator',
        component: () => import('../views/TranslatorView.vue'),
        meta: {layout: First}
    },
    {
        path: '/kamus',
        name: 'kamus',
        component: () => import('../views/KamusView.vue'),
        meta: {layout: First}
    },
    {
        path: '/video-to-audio-wav',
        name: 'vide2audio',
        component: () => import('../views/VideoToAudioView.vue'),
        meta: {layout: First}
    },
    {
        path: '/text-to-speech',
        name: 'text2speech',
        component: () => import('../views/TTSView.vue'),
        meta: {layout: First}
    },
    {
        path: '/sentiment-analysis',
        name: 'senti',
        component: () => import('../views/SentiView.vue'),
        meta: {layout: First}
    },
    {
        path: '/exam-administrator',
        name: 'exam-administrator',
        component: () => import('../views/ExamAdministratorView'),
        meta: {layout: First}
    },
    {
        path: '/exam-student',
        name: 'exam-student',
        component: () => import('../views/ExamStudentView.vue'),
        meta: {layout: First}
    },
    {
        path: '/exam-focus',
        name: 'exam-focus',
        component: () => import('../views/ExamFocusView.vue'),
        meta: {layout: Focus}
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeResolve(async to => {
    const token = window.$cookies.get('token');
    if (to.name !== 'Login') {
        const store = authStore();
        store.fetchUser();
        console.log('going to authenticated pages...');
    } else {
        if (token) {
            router.push('/');
        }
    }
});

export default router
