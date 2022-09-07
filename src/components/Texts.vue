<script setup>
import { ref, inject, watch } from 'vue';

const animateWelcome = ref(true);
const animateBio = ref(false);
const animateCareer = ref(false);
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
      animateCareer.value = false;
      animateEducation.value = false;
      animatePublications.value = false;
      break;
    }
    case 'bio': {
      text.value = data.texts.bioText;
      animateWelcome.value = false;
      animateBio.value = true;
      animateCareer.value = false;
      animateEducation.value = false;
      animatePublications.value = false;
      break;
    }
    case 'career': {
      text.value = data.texts.careerText;
      animateWelcome.value = false;
      animateBio.value = false;
      animateCareer.value = true;
      animateEducation.value = false;
      animatePublications.value = false;
      break;
    }
    case 'education': {
      text.value = data.texts.educationText;
      animateWelcome.value = false;
      animateBio.value = false;
      animateCareer.value = false;
      animateEducation.value = true;
      animatePublications.value = false;
      break;
    }
    case 'publications': {
      text.value = data.texts.publicationsText;
      animateWelcome.value = false;
      animateBio.value = false;
      animateCareer.value = false;
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
  <div class="scrollbar-hide w-full h-[500px] text-center pt-6 overflow-y-auto">
    <h1
      v-show="animateWelcome"
      :class="{
        'animate-animated animate-fadeInDown animate-delay-[1.5s]':
          animateWelcome,
      }"
      class="text-2xl font-semibold whitespace-pre-wrap"
    >
      {{ data.texts.welcomeText }}
    </h1>
    <p
      :class="`${
        animateBio || animateCareer || animateEducation || animatePublications
          ? 'animate-animated animate-fadeInDown animate-delay-[0.5s]'
          : ''
      }`"
      class="whitespace-pre-wrap px-2"
    >
      {{ text }}
    </p>
  </div>
</template>
