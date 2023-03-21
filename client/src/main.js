import { createApp } from "vue";
import VueMask from "@devindex/vue-mask";
import App from "./App.vue";

import "./assets/main.css";

const app = createApp(App);
app.use(VueMask);
app.mount("#app");
