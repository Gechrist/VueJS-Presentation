<script setup>
const name = 'Dr. Test';
const contactInfo = 'Lorem Ipsum etc etc';
</script>

<template>
<<<<<<< Updated upstream
  <div class="flex flex-col text-white">
=======
  <aside class="flex flex-col text-white">
>>>>>>> Stashed changes
    <img
      class="w-32 h-32 mx-auto mt-4 rounded-full md:w-72 md:h-72"
      src="../assets/featuredImage.jpg"
      alt="Nikolaos Mavropoulos Portrait"
    />
    <h4 class="text-center mt-2 text-xl">{{ name }}</h4>
    <div class="ml-2">
      <h4 class="text-left mt-8 underline underline-offset-2">Contact Info:</h4>
      <p>{{ contactInfo }}</p>
    </div>
  </div>
</template>
