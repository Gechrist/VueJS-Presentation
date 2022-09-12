<script setup>
const icons = [
  { text: 'Bio', alt: 'NM bio' },
  { text: 'Education', alt: 'NM education' },
  {
    text: 'Publications',
    alt: 'NM publications',
  },
  { text: 'Research', alt: 'NM research' },
];
</script>

<template>
  <nav
    class="flex bg-gradient-to-r from-[#1d546b] to-[#048BC2] bg-gradient-to-b to-[#eeeeee] py-10 flex-row space-x-2 md:space-x-4 justify-start sm:justify-center items-center lg:space-x-16"
  >
    <button
      v-for="(icon, index) in icons"
      :key="index"
      @click="$emit('changeExcerpt', icon.text)"
      :class="`${
        index === 2 ? 'w-20' : 'w-16'
      } h-12 bg-[#212834] mix-blend-hard-light ring-1 ring-white ring-inset text-white text-xs md:w-20 md:h-20 rounded cursor-pointer hover:scale-110 animate-animated animate-fadeInLeft ${
        index === 0
          ? 'animate-delay-[0.3s]'
          : index === 1
          ? 'animate-delay-[0.5s]'
          : index === 2
          ? 'animate-delay-[0.7s]'
          : 'animate-delay-[0.9s]'
      }`"
    >
      {{ icon.text }}
    </button>
  </nav>
</template>
