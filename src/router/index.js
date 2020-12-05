import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import ZingMP3 from "@/views/ZingMP3.vue";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/",
    name: "ZingMP3",
    component: ZingMP3,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;