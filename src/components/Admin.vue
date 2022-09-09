<script setup>
import { ref, onUnmounted, reactive, watch } from 'vue';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref as dbref, set, get, child } from 'firebase/database';
import {
  getStorage,
  ref as stref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

const data = reactive({ texts: {} });
const contact = ref(false);
const welcome = ref(false);
const bio = ref(false);
const education = ref(false);
const career = ref(false);
const publications = ref(false);
const showSaveButton = ref(false);
const showSpinner = ref(false);
const name = ref('');
const photo = ref();
const tel = ref();
const email = ref();
const email2 = ref();
const address = ref();
const bioText = ref();
const educationText = ref();
const careerText = ref();
const publicationsText = ref();
const welcomeText = ref();
const facebook = ref();
const linkedIn = ref();
const message = ref('');
const auth = getAuth();
const loggedUser = ref(false);
const photoProfile = ref(null);
const imageError = ref(false);
const imageFile = reactive({ file: {} });

onAuthStateChanged(auth, (user) => {
  if (user) {
    loggedUser.value = true;
  } else {
    return (window.location.href = '/');
  }
});

// hide alert after 3 seconds
const alertTimeout = () =>
  setTimeout(() => {
    message.value = '';
  }, 4000);

watch(message, (message, previousMessage) => {
  alertTimeout();
});

//db data
const dbRef = dbref(getDatabase());
get(child(dbRef, 'Texts'))
  .then((snapshot) => {
    if (snapshot.exists()) {
      data.texts = snapshot.val();
      name.value = data.texts.name;
      tel.value = data.texts.tel;
      photo.value = data.texts.photo;
      email.value = data.texts.email;
      email2.value = data.texts.email2;
      address.value = data.texts.address;
      bioText.value = data.texts.bioText;
      educationText.value = data.texts.educationText;
      careerText.value = data.texts.careerText;
      publicationsText.value = data.texts.publicationsText;
      welcomeText.value = data.texts.welcomeText;
      facebook.value = data.texts.facebook;
      linkedIn.value = data.texts.linkedIn;
    } else {
      message.value = 'No data available';
    }
  })
  .catch((error) => {
    console.error(error);
    message.value = 'Something went wrong. Please try again.';
  });

const buttons = [
  'Contact',
  'Welcome',
  'Bio',
  'Education',
  'Career',
  'Publications',
];

const state = (arg) => {
  if (arg == 'Contact') {
    showSpinner.value = false;
    contact.value = !contact.value;
    welcome.value = false;
    bio.value = false;
    career.value = false;
    education.value = false;
    publications.value = false;
    if (!contact.value) {
      showSaveButton.value = false;
    } else {
      showSaveButton.value = true;
    }
  }
  if (arg == 'Welcome') {
    showSpinner.value = false;
    contact.value = false;
    welcome.value = !welcome.value;
    bio.value = false;
    career.value = false;
    education.value = false;
    publications.value = false;
    if (!welcome.value) {
      showSaveButton.value = false;
    } else {
      showSaveButton.value = true;
    }
  }
  if (arg == 'Bio') {
    showSpinner.value = false;
    contact.value = false;
    welcome.value = false;
    bio.value = !bio.value;
    career.value = false;
    education.value = false;
    publications.value = false;
    if (!bio.value) {
      showSaveButton.value = false;
    } else {
      showSaveButton.value = true;
    }
  }
  if (arg == 'Career') {
    showSpinner.value = false;
    contact.value = false;
    welcome.value = false;
    bio.value = false;
    career.value = !career.value;
    education.value = false;
    publications.value = false;
    if (!career.value) {
      showSaveButton.value = false;
    } else {
      showSaveButton.value = true;
    }
  }
  if (arg == 'Education') {
    showSpinner.value = false;
    contact.value = false;
    welcome.value = false;
    bio.value = false;
    career.value = false;
    education.value = !education.value;
    publications.value = false;
    if (!education.value) {
      showSaveButton.value = false;
    } else {
      showSaveButton.value = true;
    }
  }
  if (arg == 'Publications') {
    showSpinner.value = false;
    contact.value = false;
    showSaveButton.value = !showSaveButton.value;
    welcome.value = false;
    bio.value = false;
    career.value = false;
    education.value = false;
    publications.value = !publications.value;
    if (!publications.value) {
      showSaveButton.value = false;
    } else {
      showSaveButton.value = true;
    }
  }
};

const onImageInput = (e) => {
  if (!e.target.files.length) return;
  imageFile.file = e.target.files[0];
  photo.value = URL.createObjectURL(e.target.files[0]);

  if (
    !['svg', 'jpeg', 'png', 'bmp', 'webp', 'jpg'].includes(
      e.target.files[0].name.split('.').pop()
    )
  ) {
    imageError.value = true;
  } else {
    imageError.value = false;
  }
};

const removeImage = (e) => {
  imageError.value = false;
  photo.value = null;
  photoProfile.value.value = null;
  imageFile.file = null;
};

const saveToDB = () => {
  //save to db
  const db = getDatabase();
  set(dbref(db, 'Texts/'), {
    name: name.value,
    email: email.value,
    photo: photo.value,
    address: address.value,
    email2: email2.value,
    facebook: facebook.value,
    linkedIn: linkedIn.value,
    tel: tel.value,
    bioText: bioText.value,
    educationText: educationText.value,
    careerText: careerText.value,
    publicationsText: publicationsText.value,
    welcomeText: welcomeText.value,
  })
    .then(() => {
      showSaveButton.value = true;
      showSpinner.value = false;
      message.value = 'Saved Successfully!';
    })
    .catch((error) => {
      console.log(error.message);
      showSaveButton.value = true;
      showSpinner.value = false;
      message.value = 'Something went wrong. Please try again.';
    });
};

const onSubmit = () => {
  showSaveButton.value = false;
  showSpinner.value = true;

  if (photoProfile.value.value) {
    //upload image
    const storage = getStorage();
    const imageRef = stref(storage, imageFile.file.name);
    const uploadTask = uploadBytesResumable(imageRef, imageFile.file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        showSaveButton.value = true;
        showSpinner.value = false;
        console.log(error.message);
        message.value = 'Something went wrong. Please try again.';
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          photo.value = downloadURL;
          saveToDB();
        });
      }
    );
  } else {
    saveToDB();
  }
};

const clearMessage = () => {
  message.value = '';
};

const signOutUser = () => {
  signOut(auth)
    .then(() => {
      message.value = 'You have been signed out';
    })
    .catch((error) => {
      console.log(error.message);
      message.value = 'An error occured. Please contact the administrator';
    });
};

onUnmounted(() => {
  URL.revokeObjectURL(photoProfile.value);
  clearTimeout(alertTimeout);
});
</script>

<template>
  <main class="min-h-[calc(100vh_-_9rem)] md:min-h-[calc(100vh_-_4.5rem)]">
    <aside
      v-if="message"
      class="w-72 flex flex-row fixed justify-center top-16 right-2 z-40 text-white animate-slideInRight rounded h-auto py-2 bg-black"
    >
      {{ message }}
      <p
        @click="clearMessage"
        class="text-xs relative ring-1 ring-white rounded-full cursor-pointer justify-center items-end flex w-3 h-3 -right-2"
      >
        x
      </p>
    </aside>
    <nav
      class="m-auto text-white rounded mt-6 flex flex-row justify-around py-2flex-wrap border-b-[1px] border-[#212834]"
    >
      <button
        v-for="buttonText in buttons"
        :key="buttonText"
        @click="state(buttonText)"
        class="bg-transparent focus:bg-black focus:text-white w-auto px-2 mt-1 rounded-t text-black"
      >
        {{ buttonText }}
      </button>
    </nav>

    <section
      class="w-full md:w-4/6 h-auto mt-10 m-auto font-semibold rounded py-2"
    >
      <form @submit.prevent="onSubmit" method="POST">
        <div v-show="contact" class="flex flex-col space-y-3 px-1">
          <label for="name">Name:</label>
          <input
            id="name"
            name="name"
            v-model="name"
            class="bg-transparent border-2 border-black"
            type="text"
          />
          <div v-if="photo" class="flex flex-row">
            <img
              :src="`${photo ? photo : data.texts.photo}`"
              alt="edit profile image"
              class="w-72 h-72"
            />
            <svg
              class="w-6 h-6 cursor-pointer -right-2 top-1 relative"
              @click="removeImage"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              viewBox="0 0 256 256"
              xml:space="preserve"
            >
              <defs></defs>
              <g transform="translate(128 128) scale(0.72 0.72)" style="">
                <g
                  style="
                    stroke: none;
                    stroke-width: 0;
                    stroke-dasharray: none;
                    stroke-linecap: butt;
                    stroke-linejoin: miter;
                    stroke-miterlimit: 10;
                    fill: none;
                    fill-rule: nonzero;
                    opacity: 1;
                  "
                  transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)"
                >
                  <rect
                    x="-12.67"
                    y="39.03"
                    rx="0"
                    ry="0"
                    width="115.34"
                    height="11.94"
                    style="
                      stroke: none;
                      stroke-width: 1;
                      stroke-dasharray: none;
                      stroke-linecap: butt;
                      stroke-linejoin: miter;
                      stroke-miterlimit: 10;
                      fill: rgb(236, 0, 0);
                      fill-rule: nonzero;
                      opacity: 1;
                    "
                    transform=" matrix(0.7071 -0.7071 0.7071 0.7071 -18.6396 45.0037) "
                  />
                  <rect
                    x="39.03"
                    y="-12.67"
                    rx="0"
                    ry="0"
                    width="11.94"
                    height="115.34"
                    style="
                      stroke: none;
                      stroke-width: 1;
                      stroke-dasharray: none;
                      stroke-linecap: butt;
                      stroke-linejoin: miter;
                      stroke-miterlimit: 10;
                      fill: rgb(236, 0, 0);
                      fill-rule: nonzero;
                      opacity: 1;
                    "
                    transform=" matrix(0.7071 -0.7071 0.7071 0.7071 -18.6396 45.0004) "
                  />
                </g>
              </g>
            </svg>
          </div>
          <label for="photo">Profile Photo:</label>
          <input
            id="photo"
            name="photo"
            ref="photoProfile"
            accept="image/*"
            @change="onImageInput"
            type="file"
          />
          <span v-if="imageError" class="text-red-600"
            >Please select a valid image file</span
          >
          <label for="address">Address:</label>
          <input
            id="address"
            name="address"
            v-model="address"
            class="bg-transparent border-2 border-black"
            type="text"
          />
          <label for="email">Email:</label>
          <input
            id="email"
            name="email"
            v-model="email"
            class="bg-transparent border-2 border-black"
            type="email"
          />
          <label for="email2">2nd Email (Optional):</label>
          <input
            id="email2"
            name="email2"
            v-model="email2"
            class="bg-transparent border-2 border-black"
            type="email"
          />
          <label for="tel">Telephone:</label>
          <input
            id="tel"
            name="tel"
            v-model.number="tel"
            class="bg-transparent border-2 border-black"
            type="tel"
          />
          <label for="fb">Facebook:</label>
          <input
            id="facebook"
            name="facebook"
            v-model="facebook"
            class="bg-transparent border-2 border-black"
            type="text"
          />
          <label for="fb">LinkedIn:</label>
          <input
            id="linkedIn"
            name="linkedIn"
            v-model="linkedIn"
            class="bg-transparent border-2 border-black"
            type="text"
          />
        </div>
        <div v-show="welcome" class="flex flex-col space-y-3 px-1">
          <label for="welcome">Welcoming Text:</label>
          <textarea
            id="welcome"
            name="welcome"
            v-model="welcomeText"
            class="bg-transparent border-2 border-black w-full h-[250px]"
          />
        </div>
        <div v-show="bio" class="flex flex-col space-y-3 px-1">
          <label for="bio">Bio Text:</label>
          <textarea
            id="bio"
            name="bio"
            v-model="bioText"
            class="bg-transparent border-2 border-black w-full h-[250px]"
          />
        </div>
        <div v-show="education" class="flex flex-col space-y-3 px-1">
          <label for="education">Education Text:</label>
          <textarea
            id="education"
            name="education"
            v-model="educationText"
            class="bg-transparent border-2 border-black w-full h-[250px]"
          />
        </div>
        <div v-show="career" class="flex flex-col space-y-3 px-1">
          <label for="career">Career Text:</label>
          <textarea
            id="career"
            name="career"
            v-model="careerText"
            class="bg-transparent border-2 border-black w-full h-[250px]"
          />
        </div>
        <div v-show="publications" class="flex flex-col space-y-3">
          <label for="publications">Publications Text:</label>
          <textarea
            id="publications"
            name="publications"
            v-model="publicationsText"
            class="bg-transparent border-2 border-black w-full h-[250px]"
          />
        </div>
        <div v-show="showSaveButton" class="flex justify-center mt-2">
          <input
            type="submit"
            value="Save All"
            :disabled="imageError"
            :class="{ 'opacity-75 cursor-not-allowed': imageError }"
            class="w-5/6 bg-black rounded text-white py-2 cursor-pointer"
          />
        </div>
        <div v-show="showSpinner" class="flex justify-center mt-2">
          <button
            type="submit"
            className="w-5/6 bg-black rounded text-white py-2  hover:bg-black hover:text-white"
          >
            <svg
              role="status"
              class="inline w-6 h-6 mr-2 animate-twSpin animate-infinite"
              viewBox="0 0 100 101"
              fill="yellow"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="black"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>

            Saving...
          </button>
        </div>
      </form>
      <section class="mt-2 flex flex-row justify-center space-x-2 items-center">
        <a href="/" class="hover:underline hover:underline-offset-1"
          >Return to Home</a
        >
        <p>|</p>
        <button
          @click="signOutUser"
          class="hover:underline hover:underline-offset-1 hover:bg-[#eeeeee] hover:ring-0 hover:text-black"
        >
          Sign Out
        </button>
      </section>
    </section>
  </main>
</template>
