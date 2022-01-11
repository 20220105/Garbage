import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("../views/index.vue"),
  },
  {
    path: "/recyclingGuide",
    name: "RecyclingGuide",
    component: () => import("../views/RecyclingGuide.vue"),
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
