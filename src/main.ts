
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import dataV3 from '@kjgl77/datav-vue3'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import '@/mock/index'

import 'lib-flexible'

// import {setDomFontSize} from '@/utils/dom.ts'
// setDomFontSize()

//声明dataV3，声明后才有提示
declare module 'vue' {
    export interface ComponentCustomProperties {
        $dataV: typeof dataV3
    }
}

window.addEventListener('resize', (args) => {
   location.reload();
})

import 'animate.css'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)
app.use(dataV3)
app.use(router)

app.mount('#app')
