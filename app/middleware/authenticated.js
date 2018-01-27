export default function ({ store, redirect }) {
  return (store.getters['user/isAuthenticated']) ? redirect('/dashboard') : null;
}
