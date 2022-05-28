import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: "/adminuser",
    name: "Adminuser",
    component: () => import("../views/Adminuser.vue"),
    children: [
      {
        path: "/user",
        name: "User",
        component: () => import("../views/user/User.vue"),
      },
      {
        path: "/commodity",
        name: "Commodity",
        component: () => import("../views/Commodity/Commodity.vue"),
      },
    ],
  },

  {
    path: "/test",
    name: "Test",
    component: () => import("../views/test.vue"),
  },
  {
    path: "/garbageClass",
    name: "GarbageClass",
    component: () => import("../views/GarbageClass.vue"),
  },
  {
    path: "/afterindex",
    name: "Afterindex",
    component: () => import("../views/Afterindex.vue"),
  },
  {
    path: "/adminLogin",
    name: "AdminLogin",
    component: () => import("../views/AdminLogin.vue"),
  },
  {
    path: "/",
    name: "Index",
    component: () => import("../views/Index.vue"),
  },
  {
    path: "/collectorUsers",
    name: "collectorUsers",
    component: () => import("../views/collectorUsers.vue"),
  },
]

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  let islogin = sessionStorage.getItem("islogin")
  console.log(islogin)
  if (to.path != "/adminLogin") {
    //即将进入用户
    if (islogin == null) {
      //判断登陆状态
      next("/adminLogin") //跳转到登陆页面
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
