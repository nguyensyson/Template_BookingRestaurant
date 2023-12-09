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

import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from '@/plugins/vuetify';

const app = createApp(App)
app.use(router)
    .use(vuetify)
    .use(VueAxios, axios)
    .mount('#app')
