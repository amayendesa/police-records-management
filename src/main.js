/**
=========================================================
* Vue Soft UI Dashboard PRO - v3.0.0
=========================================================
* Product Page: https://creative-tim.com/product/vue-soft-ui-dashboard-pro
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
Coded by www.creative-tim.com
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import VueTilt from "vue-tilt.js";
import VueSweetalert2 from "vue-sweetalert2";
import SoftUIDashboard from "./soft-ui-dashboard";
// import VueToast from 'vue-toast-notification'
// import 'vue-toast-notification/dist/theme-sugar.css'
// import Vue           from 'vue'
// import Notifications from 'vue-notification'
import VueCookies from 'vue3-cookies'
// require('events').EventEmitter.prototype._maxListeners = 100;
const appInstance = createApp(App);
// var bodyParser = require('body-parser');
// appInstance.use(bodyParser.json({limit: '50mb'}));
// appInstance.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
appInstance.use(store);
appInstance.use(router);
appInstance.use(VueTilt);
appInstance.use(VueSweetalert2);
// appInstance.use(Notifications);
appInstance.use(SoftUIDashboard);
appInstance.mount("#app");
appInstance.use(VueCookies)
// new Vue({
//     vuetify,
//     render: h => h(App)
// }).$mount('#app');