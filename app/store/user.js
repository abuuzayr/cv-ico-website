import decode from 'jwt-decode';

export const state = () => ({
  email: null,
  emailVerified: null,
  kycVerified: null,
  userID: null,
});

/* eslint no-param-reassign:
  ["error", {
    "props": true,
    "ignorePropertyModificationsFor": ["_state"]
  }]
*/
export const mutations = {
  SET_EMAIL(_state, email) {
    _state.email = email || null;
  },
  SET_EMAILVERIFIED(_state, verified) {
    _state.emailVerified = verified || null;
  },
  SET_KYCVERIFIED(_state, verified) {
    _state.kycVerified = verified || null;
  },
  SET_USERID(_state, userID) {
    _state.userID = userID || null;
  },
};

export const getters = {
  isAuthenticated(_state) {
    return !!_state.userID;
  },
  isEmailVerified(_state) {
    return !!_state.emailVerified;
  },
  isKYCVerified(_state) {
    return !!_state.kycVerified;
  },
};

export const actions = {
  setPersistence({ commit, rootState }) {
    const { authentication } = rootState;
    const {
      email,
      emailVerified,
      kycVerified,
      userId,
    } = decode(authentication.accessToken);

    commit('SET_EMAIL', email);
    commit('SET_EMAILVERIFIED', emailVerified);
    commit('SET_KYCVERIFIED', kycVerified);
    commit('SET_USERID', userId);
  },
  unsetPersistence({ commit }) {
    commit('SET_EMAIL', null);
    commit('SET_EMAILVERIFIED', null);
    commit('SET_KYCVERIFIED', null);
    commit('SET_USERID', null);
  },
};
