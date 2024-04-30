import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

import { faLinkedinIn, faGithubAlt } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

library.add(faLinkedinIn, faGithubAlt, faEnvelope, faChevronRight, faChevronLeft);

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Specify fonts
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/roboto/400.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
