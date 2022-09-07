import { reactive } from 'vue';
import { getDatabase, ref as dbref, child, get } from 'firebase/database';

// const name = ref();
const data = reactive({ texts: {} });

//db data
const dbRef = dbref(getDatabase());
get(child(dbRef, 'Texts'))
  .then((snapshot) => {
    if (snapshot.exists()) {
      data.texts = snapshot.val();
    } else {
      console.log('No data available');
    }
  })
  .catch((error) => {
    console.error(error);
  });

export default data;
