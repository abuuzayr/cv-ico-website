import * as cookies from 'js-cookie';
import createPersistedState from 'vuex-persistedstate';

export default ({ store, isHMR, isClient }) => {
  if (isHMR) return;

  if (isClient) {
    window.onNuxtReady(() => {
      createPersistedState({
        storage: {
          getItem: (key) => {
            window.localStorage.getItem(key);
            cookies.get(key);
          },
          setItem: (key, value) => {
            window.localStorage.setItem(key, value);
            cookies.set(key, value, { expires: 3 });
          },
          removeItem: (key) => {
            window.localStorage.removeItem(key);
            cookies.remove(key);
          },
        },
      })(store);
    });
  }
};
