<script setup>
import { onMounted, ref } from 'vue';
const show = ref(false);
onMounted(() => {
  show.value = true;
});
const welcomingText = 'Welcome to my home page!';
const testText =
  'Lorem ipsum dolor sit amet amet, consectetur adipiscing elit. Curabitur ultrices libero finibus facilisis suscipit. Sed faucibus scelerisque varius. Maecenas vitae finibus quam. Nulla at molestie risus. Praesent eget nisl tempus, dignissim nisi vel, congue nisi. Donec eu ultricies dolor, consectetur volutpat neque. Sed hendrerit lectus vitae lacus vulputate, at ornare risus fermentum. Curabitur vel sem nec justo elementum dictum. Nam nec nisi iaculis, volutpat felis porta, dictum tellus.Morbi elit odio, cursus laoreet sollicitudin eu, faucibus sagittis est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nulla elit, finibus vel pellentesque eu, rhoncus sit amet ligula. In eu quam ut est euismod pretium quis sit amet lectus. Nulla suscipit dapibus tellus, eget mattis nisl viverra eu. Vestibulum ac sem nec neque ullamcorper iaculis at ut sapien. Proin rutrum orci dictum augue tincidunt efficitur. Mauris vehicula pellentesque mi vulputate elementum. Ut quis eros orci. Quisque lobortis dapibus aliquetIn hac habitasse platea dictumst. Nulla magna erat, vestibulum et eros non, interdum maximus nunc. Fusce mattis a odio nec hendrerit. Nam quis metus vestibulum, venenatis ante in, sodales augue. Cras varius eget magna a mollis. Sed auctor, leo at ultricies mattis, lorem sem commodo nibh, vel ultricies metus massa vitae urna. Mauris nec mauris vestibulum, porta odio et, suscipit justo. Phasellus eget nisl at nulla consectetur feugiat. Proin pretium elit tincidunt, venenatis orci nec, efficitur eros. Phasellus ornare quam purus, ut dictum ante sollicitudin id. Vestibulum accumsan convallis ex, nec gravida urna tempus sed. Donec lorem tellus, luctus mattis ante pretium, placerat egestas ante. Vestibulum nibh magna, auctor quis malesuada sed, euismod in arcu. Vestibulum consectetur mauris sit amet elit aliquam, vitae fringilla felis pellentesque. Suspendisse pellentesque a quam nec fermentum. Morbi sagittis nunc nec tempus iaculis';
</script>

<template>
  <div
    v-if="show"
    class="scrollbar-hide w-full h-[500px] text-center pt-6 overflow-y-auto"
  >
    <h2 class="text-2xl font-semibold">{{ welcomingText }}</h2>
    <p class="animate-animated animate-fadeInDown animate-delay-[1.5s] px-2">
      {{ testText }}
    </p>
  </div>
</template>
