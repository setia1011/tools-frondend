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
        meta: {layout: Login, 'name': 'User Login'}
    },
    {
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
        meta: {layout: First, 'name': 'Home'}
    },
    {
        path: '/users-list',
        name: 'users-list',
        component: () => import('../views/UsersListView.vue'),
        meta: {layout: First, 'name': 'User List'}
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
        meta: {layout: First, 'name': 'About'}
    },
    {
        path: '/qr-code',
        name: 'qrcode',
        component: () => import('../views/QrView.vue'),
        meta: {layout: First, 'name': 'QR Code'}
    },
    {
        path: '/polaroid',
        name: 'polaroid',
        component: () => import('../views/PolaroidView.vue'),
        meta: {layout: First, 'name': 'Polaroid'}
    },
    {
        path: '/background-removal',
        name: 'bgremoval',
        component: () => import('../views/BgRemovalView.vue'),
        meta: {layout: First, 'name': 'Background Removal'}
    },
    {
        path: '/translator',
        name: 'translator',
        component: () => import('../views/TranslatorView.vue'),
        meta: {layout: First, 'name': 'Translator'}
    },
    {
        path: '/kamus',
        name: 'kamus',
        component: () => import('../views/KamusView.vue'),
        meta: {layout: First, 'name': 'Kamus'}
    },
    {
        path: '/video-to-audio-wav',
        name: 'vide2audio',
        component: () => import('../views/VideoToAudioView.vue'),
        meta: {layout: First, 'name': 'Video to Audio (V2A)'}
    },
    {
        path: '/text-to-speech',
        name: 'text2speech',
        component: () => import('../views/TTSView.vue'),
        meta: {layout: First, 'name': 'Text to Speech (TTS)'}
    },
    {
        path: '/sentiment-analysis',
        name: 'senti',
        component: () => import('../views/SentiView.vue'),
        meta: {layout: First, 'name': 'Sentiment Analysis (SA)'}
    },
    {
        path: '/exam-administrator',
        name: 'exam-administrator',
        component: () => import('../views/ExamAdministratorView'),
        meta: {layout: First, 'name': 'Exam - Administrator'}
    },
    {
        path: '/exam-student',
        name: 'exam-student',
        component: () => import('../views/ExamStudentView.vue'),
        meta: {layout: First, 'name': 'Exam - Student'}
    },
    {
        path: '/exam-focus',
        name: 'exam-focus',
        component: () => import('../views/ExamFocusView.vue'),
        meta: {layout: Focus, 'name': 'Exam - Focus'}
    },
    {
        path: '/pustaka',
        name: 'pustaka',
        component: () => import('../views/PustakaView.vue'),
        meta: {layout: First, 'name': 'Pustaka'}
    },
    {
        path: '/pustaka-admin',
        name: 'pustaka-admin',
        component: () => import('../views/PustakaAdminView.vue'),
        meta: {layout: First, 'name': 'Pustaka - Administrator'}
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach(async to => {
    console.log(to.name);
    const token = window.$cookies.get('token');
    if (to.path !== '/user-login') {
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
