<script setup>
import { ref, computed, provide } from 'vue';
import Home from './components/Home.vue';
import Admin from './components/Admin.vue';
import Login from './components/Login.vue';
import NotFound from './components/NotFound.vue';
import Footer from './components/Footer.vue';
import data from './assets/utils/store';

provide('texts', data);

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
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" :content="`Home page of ${data.texts.name}`" />
    <meta property="og:title" content="{{data.texts.name}}" />
    <meta
      property="og:description"
      :content="`Home page of ${data.texts.name}`"
    />
    <meta
      property="og:url"
      content="https://dr-nikolaosmavropoulos.vercel.app"
    />
    <title>{{ data.texts.name }}</title>
  </head>
  <component :is="currentView" />
  <Footer />
</template>
