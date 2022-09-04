<script setup>
import { onMounted } from 'vue';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

const pass = 'LMuyDJ*W831*';

onMounted(() => {
  let ui = firebaseui.auth.AuthUI.getInstance();
  if (!ui) {
    ui = new firebaseui.auth.AuthUI(firebase.auth());
  }
  var uiConfig = {
    signInSuccessUrl: '#/admin',
    signInOptions: [
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
  };
  ui.start('#firebaseui-auth-container', uiConfig);
});
</script>

<template>
  <main class="min-h-[calc(100vh_-_4.5rem)]">
    <div id="firebaseui-auth-container"></div>
  </main>
</template>
