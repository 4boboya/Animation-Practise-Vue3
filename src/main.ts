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
app.directive('collapse', {
    mounted(el, binding) {
        el.addEventListener('click', () => {
            const col = document.getElementById(binding.value) as HTMLElement
            if (col != undefined || col != null) {
                if (col.style.height == '0px' || col.style.height == '') {
                    col.style.height = `${col.scrollHeight}px`
                } else {
                    col.style.height = '0px'
                }
            }
        })
    }
})
app.directive('draggable', {
    mounted(el) {
      el.style.cursor = 'move';
      el.style.position = 'fixed';
            
      el.addEventListener('mousedown', (e : MouseEvent) => {
        const left = el.offsetLeft;
        const top = el.offsetTop;
        const mouseX = e.clientX;
        const mouseY = e.clientY;
  
        document.onmousemove = (e) => {
          const disX = e.clientX - mouseX;
          const disY = e.clientY - mouseY;
  
          el.style.left = `${left + disX}px`;
          el.style.top = `${top + disY}px`;
        }
        
        // 监听鼠标抬起
        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
        }
      });
    }
  })
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
app.component('Tag', Componet.Tag)
app.component('Collapse', Componet.Collapse)

app.mount('#app')

