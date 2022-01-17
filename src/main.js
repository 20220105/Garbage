import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

Vue.config.productionTip = false

// 引入vant全部组件
import Vant from "vant"
import "vant/lib/index.css"
Vue.use(Vant)

// 配置 axios
import axios from "axios"
axios.defaults.baseURL = "http://localhost:3000/"


Vue.prototype.axios = axios
Vue.prototype.$axios = axios


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
