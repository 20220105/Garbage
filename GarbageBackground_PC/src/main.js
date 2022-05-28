import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import * as echarts from "echarts"
import "./utils/eventbus"
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

// 引入element-UI组件库
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
Vue.use(ElementUI)

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
