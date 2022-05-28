import Vue from "vue"
import Vuex from "vuex"
import App from "./App.vue"
import router from "./router"
import store from "./store"
Vue.use(Vuex)
Vue.config.productionTip = false

// 引入vant全部组件
import Vant from "vant"
import "vant/lib/index.css"
Vue.use(Vant)

// 配置 axios
import axios from "axios"
axios.defaults.baseURL = "http://47.99.101.154:8889/"

Vue.prototype.axios = axios
Vue.prototype.$axios = axios

// 引入复制组件
import VueClipboard from "vue-clipboard2"
Vue.use(VueClipboard)

// 引入时间处理组件
import moment from "moment"
Vue.prototype.$moment = moment

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
