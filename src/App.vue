<script setup>
import Nav from './components/Nav.vue';
import Img from './components/Image.vue';
import Texts from './components/Texts.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="flex flex-row">
    <section class="w-4/6 flex flex-col">
      <Nav />
      <Texts />
    </section>
    <section class="bg-[#212834] w-2/6 h-auto">
      <Img />
    </section>
  </div>
  <Footer />
</template>
