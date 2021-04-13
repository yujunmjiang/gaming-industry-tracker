// import Vue from 'vue'
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';

// Vue.config.productionTip = false

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')

// export const eventBus = createApp(App)

// createApp(App)({
//   router,
//   render: h => h(App)
// }).mount('#app')

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.mount('#app');