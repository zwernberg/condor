import Vue from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import bTable from 'bootstrap-vue/es/components/table/table'

// Vue.use(BootstrapVue)
Vue.component('b-table', bTable);
new Vue({
  el: '#app',
  render: h => h(App)
})
