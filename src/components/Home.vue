<script setup>
import { ref } from 'vue';
import Nav from './Nav.vue';
import Img from './Image.vue';
import Texts from './Texts.vue';

const excerpt = ref('welcome');

const changeExcerpt = (arg) => {
  if (arg == 'Bio') {
    if (excerpt.value == 'bio') {
      excerpt.value = 'welcome';
    } else {
      excerpt.value = 'bio';
    }
  }
  if (arg == 'Career') {
    if (excerpt.value == 'career') {
      excerpt.value = 'welcome';
    } else {
      excerpt.value = 'career';
    }
  }

  if (arg == 'Education') {
    if (excerpt.value == 'education') {
      excerpt.value = 'welcome';
    } else {
      excerpt.value = 'education';
    }
  }

  if (arg == 'Publications') {
    if (excerpt.value == 'publications') {
      excerpt.value = 'welcome';
    } else {
      excerpt.value = 'publications';
    }
  }
};
</script>

<template>
  <div class="flex flex-row">
    <section class="w-[65%] md:w-4/6 flex flex-col">
      <Nav @changeExcerpt="changeExcerpt" />
      <Texts :displayText="excerpt" />
    </section>
    <section class="bg-[#212834] w-[35%] md:w-2/6 h-auto">
      <Img />
    </section>
  </div>
</template>
