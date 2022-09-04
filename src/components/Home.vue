<script setup>
import Nav from './Nav.vue';
import Img from './Image.vue';
import Texts from './Texts.vue';
</script>

<template>
  <div class="flex flex-row">
    <section class="w-[65%] md:w-4/6 flex flex-col">
      <Nav />
      <Texts />
    </section>
    <section class="bg-[#212834] w-[35%] md:w-2/6 h-auto">
      <Img />
    </section>
  </div>
</template>
