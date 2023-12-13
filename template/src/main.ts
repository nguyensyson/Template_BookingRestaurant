import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/css/fontawesome.css'
import 'owl.carousel/dist/assets/owl.carousel.css'
import './assets/css/flex-slider.css'
import './assets/css/templatemo-sixteen.css'
import './assets/css/main.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'vue3-toastify/dist/index.css';
import Vue3Toastify from 'vue3-toastify';
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from '@/plugins/vuetify';

const app = createApp(App)

axios.defaults.baseURL = 'http://localhost:8080/api'
const options = {
    position: 'bottom-right',
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    hideProgressBar: false,
}
app.use(router)
    .use(vuetify)
    .use(VueAxios, axios)
    .use(Vue3Toastify, options)
    .mount('#app')
