<script setup>
import { ref, computed, reactive, provide } from 'vue';
import Home from './components/Home.vue';
import Admin from './components/Admin.vue';
import Login from './components/Login.vue';
import NotFound from './components/NotFound.vue';
import Footer from './components/Footer.vue';

//routes
const routes = {
  '/': Home,
  '/admin': Admin,
  '/login': Login,
};

const currentPath = ref(window.location.hash);

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash;
});

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound;
});
</script>

<template>
  <component :is="currentView" />
  <Footer />
</template>
