export default function ({ store, redirect }) {
  return (!store.getters['auth/isAuthenticated']) ? redirect('/auth/login') : null;
}
