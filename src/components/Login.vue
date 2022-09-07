<script setup>
import { onMounted } from 'vue';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

onMounted(() => {
  let ui = firebaseui.auth.AuthUI.getInstance();
  if (!ui) {
    ui = new firebaseui.auth.AuthUI(firebase.auth());
  }
  var uiConfig = {
    signInSuccessUrl: '#/admin',
    signInOptions: [
      {
        provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        disableSignUp: { status: true },
      },
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        disableSignUp: { status: true },
      },
    ],
  };
  ui.start('#firebaseui-auth-container', uiConfig);
});
</script>

<template>
  <main class="min-h-[calc(100vh_-_3.8rem)]">
    <div id="firebaseui-auth-container"></div>
  </main>
</template>
