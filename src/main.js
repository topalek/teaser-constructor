import {createApp} from "vue";
import "./style.css";
import store from "./store";
import App from "./App.vue";

const app = createApp(App);
app.use(store)
store.dispatch('initializeStore').then(() => {
    app.mount('#app');
});