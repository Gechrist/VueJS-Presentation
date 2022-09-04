<script setup>
import { ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import data from '../assets/utils/store';

const name = ref('');
const address = ref('');
const email = ref('');
const email2 = ref('');
const tel = ref('');
const loggedUser = ref(false);
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    loggedUser.value = true;
  }
});

const signOutUser = () => {
  signOut(auth)
    .then(() => {
      loggedUser.value = false;
    })
    .catch((error) => {
      console.log(error.message);
    });
};
</script>

<template>
  <aside class="flex flex-col text-white min-h-[calc(100vh_-_4.5rem)]">
    <img
      class="w-32 h-32 mx-auto mt-4 rounded-full md:w-64 md:h-64"
      :src="`${
        data.texts.photo ? data.texts.photo : '../assets/featuredImage.jpg'
      }`"
      alt="Nikolaos Mavropoulos Portrait"
    />
    <div class="flex flex-col mt-2 mx-auto space-y-2">
      <a
        :href="`${loggedUser ? '#/admin' : '#/login'}`"
        class="text-sm md:text-xl"
        >{{ data.texts.name }}</a
      >
      <button
        v-if="loggedUser"
        class="px-2 rounded text-sm md:text-xl"
        @click="signOutUser"
      >
        Sign Out
      </button>
    </div>
    <div class="ml-1 w-full flex flex-col space-y-2">
      <h4 class="mt-8 underline underline-offset-2 text-center md:text-start">
        Contact Info:
      </h4>
      <div class="flex flex-col md:flex-row md:space-x-2 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          fill="white"
          class="w-3 h-3 md:w-4 md:h-4"
        >
          <!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path
            d="M575.8 255.5C575.8 273.5 560.8 287.6 543.8 287.6H511.8L512.5 447.7C512.5 450.5 512.3 453.1 512 455.8V472C512 494.1 494.1 512 472 512H456C454.9 512 453.8 511.1 452.7 511.9C451.3 511.1 449.9 512 448.5 512H392C369.9 512 352 494.1 352 472V384C352 366.3 337.7 352 320 352H256C238.3 352 224 366.3 224 384V472C224 494.1 206.1 512 184 512H128.1C126.6 512 125.1 511.9 123.6 511.8C122.4 511.9 121.2 512 120 512H104C81.91 512 64 494.1 64 472V360C64 359.1 64.03 358.1 64.09 357.2V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L564.8 231.5C572.8 238.5 576.9 246.5 575.8 255.5L575.8 255.5z"
          />
        </svg>
        <p class="text-xs md:text-base h-auto">
          {{ data.texts.address }}
        </p>
      </div>
      <div class="flex flex-col md:flex-row md:space-x-2 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="white"
          class="w-3 h-3 md:w-4 md:h-4"
        >
          <path
            d="M207.8 20.73c-93.45 18.32-168.7 93.66-187 187.1c-27.64 140.9 68.65 266.2 199.1 285.1c19.01 2.888 36.17-12.26 36.17-31.49l.0001-.6631c0-15.74-11.44-28.88-26.84-31.24c-84.35-12.98-149.2-86.13-149.2-174.2c0-102.9 88.61-185.5 193.4-175.4c91.54 8.869 158.6 91.25 158.6 183.2l0 16.16c0 22.09-17.94 40.05-40 40.05s-40.01-17.96-40.01-40.05v-120.1c0-8.847-7.161-16.02-16.01-16.02l-31.98 .0036c-7.299 0-13.2 4.992-15.12 11.68c-24.85-12.15-54.24-16.38-86.06-5.106c-38.75 13.73-68.12 48.91-73.72 89.64c-9.483 69.01 43.81 128 110.9 128c26.44 0 50.43-9.544 69.59-24.88c24 31.3 65.23 48.69 109.4 37.49C465.2 369.3 496 324.1 495.1 277.2V256.3C495.1 107.1 361.2-9.332 207.8 20.73zM239.1 304.3c-26.47 0-48-21.56-48-48.05s21.53-48.05 48-48.05s48 21.56 48 48.05S266.5 304.3 239.1 304.3z"
          />
        </svg>
        <a
          class="text-xs break-all h-auto md:text-base"
          :href="`mailto:${data.texts.email}`"
          >{{ data.texts.email }}</a
        >
      </div>
      <div
        v-if="data.texts.email2"
        class="flex flex-col md:flex-row md:space-x-2 items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="white"
          class="w-3 h-3 md:w-4 md:h-4"
        >
          <path
            d="M207.8 20.73c-93.45 18.32-168.7 93.66-187 187.1c-27.64 140.9 68.65 266.2 199.1 285.1c19.01 2.888 36.17-12.26 36.17-31.49l.0001-.6631c0-15.74-11.44-28.88-26.84-31.24c-84.35-12.98-149.2-86.13-149.2-174.2c0-102.9 88.61-185.5 193.4-175.4c91.54 8.869 158.6 91.25 158.6 183.2l0 16.16c0 22.09-17.94 40.05-40 40.05s-40.01-17.96-40.01-40.05v-120.1c0-8.847-7.161-16.02-16.01-16.02l-31.98 .0036c-7.299 0-13.2 4.992-15.12 11.68c-24.85-12.15-54.24-16.38-86.06-5.106c-38.75 13.73-68.12 48.91-73.72 89.64c-9.483 69.01 43.81 128 110.9 128c26.44 0 50.43-9.544 69.59-24.88c24 31.3 65.23 48.69 109.4 37.49C465.2 369.3 496 324.1 495.1 277.2V256.3C495.1 107.1 361.2-9.332 207.8 20.73zM239.1 304.3c-26.47 0-48-21.56-48-48.05s21.53-48.05 48-48.05s48 21.56 48 48.05S266.5 304.3 239.1 304.3z"
          />
        </svg>
        <a class="text-xs md:text-base" :href="`mailto:${data.texts.email2}`">{{
          data.texts.email2
        }}</a>
      </div>
      <div class="flex flex-col md:flex-row md:space-x-2 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="white"
          class="w-3 h-3 md:w-4 md:h-4"
        >
          <path
            d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z"
          />
        </svg>
        <a :href="`tel:${data.texts.tel}`" class="text-xs md:text-base">{{
          data.texts.tel
        }}</a>
      </div>
      <div
        v-if="data.texts.facebook"
        class="flex flex-col md:flex-row md:space-x-2 items-center"
      >
        <svg
          class="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clip-rule="evenodd"
          />
        </svg>
        <a :href="data.texts.facebook" class="text-xs md:text-base">{{
          data.texts.facebook
        }}</a>
      </div>
      <div
        v-if="data.texts.linkedIn"
        class="flex flex-col md:flex-row md:space-x-2 items-center"
      >
        <svg
          version="1.1"
          id="Layer_1"
          class="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 455 455"
          fill="white"
          style="enable-background: new 0 0 455 455"
          xml:space="preserve"
        >
          <g>
            <path
              style="fill-rule: evenodd; clip-rule: evenodd"
              d="M246.4,204.35v-0.665c-0.136,0.223-0.324,0.446-0.442,0.665H246.4z"
            />
            <path
              style="fill-rule: evenodd; clip-rule: evenodd"
              d="M0,0v455h455V0H0z M141.522,378.002H74.016V174.906h67.506V378.002z
		 M107.769,147.186h-0.446C84.678,147.186,70,131.585,70,112.085c0-19.928,15.107-35.087,38.211-35.087
		c23.109,0,37.31,15.159,37.752,35.087C145.963,131.585,131.32,147.186,107.769,147.186z M385,378.002h-67.524V269.345
		c0-27.291-9.756-45.92-34.195-45.92c-18.664,0-29.755,12.543-34.641,24.693c-1.776,4.34-2.24,10.373-2.24,16.459v113.426h-67.537
		c0,0,0.905-184.043,0-203.096H246.4v28.779c8.973-13.807,24.986-33.547,60.856-33.547c44.437,0,77.744,29.02,77.744,91.398V378.002
		z"
            />
          </g>
        </svg>
        <a :href="data.texts.linkedIn" class="text-xs md:text-base">{{
          data.texts.linkedIn
        }}</a>
      </div>
    </div>
  </aside>
</template>
