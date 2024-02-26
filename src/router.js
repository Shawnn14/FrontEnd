import {createRouter, createWebHashHistory } from 'vue-router';
import LineInfo from './components/LineInfo.vue'
import BookInfo from './components/BookInfo.vue'
import ChangeInfo from './components/ChangeInfo.vue'
import App from './App.vue'

const routes = [
    { path: '/', 
        component: LineInfo
    },
    { path: '/search', 
        component: BookInfo
    },
    { path: '/updateInfo', 
        component: ChangeInfo
    },
]

export const router = createRouter({
    history: createWebHashHistory(), routes
})