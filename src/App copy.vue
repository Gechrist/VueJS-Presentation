<script setup>
import Nav from './components/Nav.vue';
import Img from './components/Image.vue';
import Texts from './components/Texts.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div
    class="flex flex-col space-y-4 mt-10 md:flex-row md:justify-around md:space-x-2"
  >
    <Nav />
    <Img />
  </div>
  <Texts />
  <Footer />
</template>
