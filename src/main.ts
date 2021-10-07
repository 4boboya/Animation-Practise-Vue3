import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Componet from './components'
import $date from './library/global/Date'

import './assets/tailwind.css'
import './styles/app.scss'
import './index.css'

const app = createApp(App).use(store).use(router)

app.config.globalProperties.$date = $date

app.component('Header', Componet.Header)
app.component('Sidebar', Componet.Sidebar)
app.component('Tabs', Componet.Tabs)
app.component('Table', Componet.Table)
app.component('Switch', Componet.Switch)
app.component('Listbox', Componet.Listbox)
app.component('Modal', Componet.Modal)
app.component('Hint', Componet.Hint)
app.component('Loading', Componet.Loading)

app.mount('#app')

