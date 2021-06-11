import { createApp } from 'vue';
import App from './App.vue';
import store from './vuex';

// Vue.config.productionTip = false

const app = createApp(App);

app.use(store);

app.mount('#app');