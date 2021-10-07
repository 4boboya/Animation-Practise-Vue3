import { createRouter, createWebHistory } from 'vue-router'
import { home } from './classify/home'
import { forum } from './classify/forums'
import { login } from './classify/login'
import { live } from './classify/live'
import { member } from './classify/member'
import { advertise } from './classify/advertise'
import { email } from './classify/email'
import { trade } from './classify/trade'

const routes = []
routes.push(home, forum, login, live, member, advertise, email, trade)

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
