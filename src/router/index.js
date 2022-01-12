import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: "/rankingList",
    name: "RankingList",
    component: () => import("../views/RankingList.vue"),
  },
  {
    path: "/the_order",
    name: "The_order",
    component: () => import("../views/The_order.vue"),
  },
  {
    path: "/nav",
    name: "Nav",
    component: () => import("../text/nav.vue"),
  },
  {
    path: "/ssk",
    name: "Ssk",
    component: () => import("../syan/Ssk.vue"),
  },
  {
    path: "/mine",
    name: "Mine",
    component: () => import("../views/Mine.vue"),
  },
  {
    path: "/category",
    name: "Category",
    component: () => import("../views/Category.vue"),
  },
  {
    path: "/homepage",
    name: "HomePage",
    component: () => import("../views/HomePage.vue"),
  },
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
