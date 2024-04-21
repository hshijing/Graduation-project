import { createSSRApp } from "vue";
import MyIcon from './components/MyIcon.vue'
import MySwiper from './components/MySwiper.vue'
import MyTitle from './components/MyTitle.vue'
import App from "./App.vue";
export function createApp() {
  const app = createSSRApp(App)
  app.component("MyIcon", MyIcon);
  app.component("MySwiper", MySwiper);
  app.component("MyTitle", MyTitle);
  return {
    app,
  };
}
