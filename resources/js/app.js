import Vue from "vue";
import store from "./store/index";

//Main pages
import App from "./views/app.vue";

const app = new Vue({
    el: "#app",
    components: { App },
    store: store,
});
