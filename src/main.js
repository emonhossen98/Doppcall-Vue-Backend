import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router.js';
import GmForm from '../src/components/pages/frontend/pages/pages/all-pages/gobal-form/form.vue';
import VueApexCharts from "vue3-apexcharts";
import store from "./store";
import { createHead } from '@vueuse/head';
import _ from 'lodash';
import './bootstrap';
import { globalVariables } from './globalVariables';
import 'leaflet/dist/leaflet.css';
import InactivityLogout from './plugins/inactivity-logout';


const head = createHead();
const app = createApp(App);

const defaultTitle = 'Doppcall Vue';

app.component('GmForm', GmForm);
app.provide('globalVariables', globalVariables)
app.use(router);
app.use(InactivityLogout);
app.use(VueApexCharts);
app.use(store);
app.use(head);
app.mount('#app');
