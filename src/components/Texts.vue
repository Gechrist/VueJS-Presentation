<script setup>
import { ref, inject, watch } from 'vue';

const animateWelcome = ref(true);
const animateBio = ref(false);
const animateResearch = ref(false);
const animateEducation = ref(false);
const animatePublications = ref(false);
const props = defineProps(['displayText']);
const data = inject('texts');
const text = ref('');

const setText = () => {
  switch (props.displayText) {
    case 'welcome': {
      text.value = '';
      animateWelcome.value = true;
      animateBio.value = false;
      animateResearch.value = false;
      animateEducation.value = false;
      animatePublications.value = false;
      break;
    }
    case 'bio': {
      text.value = data.texts.bioText;
      animateWelcome.value = false;
      animateBio.value = true;
      animateResearch.value = false;
      animateEducation.value = false;
      animatePublications.value = false;
      break;
    }
    case 'research': {
      text.value = data.texts.researchText;
      animateWelcome.value = false;
      animateBio.value = false;
      animateResearch.value = true;
      animateEducation.value = false;
      animatePublications.value = false;
      break;
    }
    case 'education': {
      text.value = data.texts.educationText;
      animateWelcome.value = false;
      animateBio.value = false;
      animateResearch.value = false;
      animateEducation.value = true;
      animatePublications.value = false;
      break;
    }
    case 'publications': {
      text.value = data.texts.publicationsText;
      animateWelcome.value = false;
      animateBio.value = false;
      animateResearch.value = false;
      animateEducation.value = false;
      animatePublications.value = true;
      break;
    }
    case 'default':
      break;
  }
};

watch(
  () => props.displayText,
  (selection, prevSelection) => {
    setText();
  }
);
</script>

<template>
  <div
    class="scrollbar-hide w-full h-[250px] md:h-[500px] text-center pt-6 overflow-y-auto"
  >
    <h1
      v-show="animateWelcome"
      :class="{
        'animate-animated animate-fadeInDown animate-delay-[1.5s]':
          animateWelcome,
      }"
      class="whitespace-pre-wrap"
    >
      {{ data.texts.welcomeText }}
    </h1>
    <p
      :class="`${
        animateBio || animateResearch || animateEducation || animatePublications
          ? 'animate-animated animate-fadeInDown animate-delay-[0.5s]'
          : ''
      }`"
      class="whitespace-pre-wrap px-2"
    >
      {{ text }}
    </p>
  </div>
</template>
