export const state = () => ({
  kycVerified: null,
});

/* eslint no-param-reassign:
  ["error", {
    "props": true,
    "ignorePropertyModificationsFor": ["_state"]
  }]
*/
export const mutations = {
  SET_KYCVERIFIED(_state, verified) {
    _state.kycVerified = verified || null;
  },
};

export const getters = {
  isKYCVerified(_state) {
    return !!_state.kycVerified;
  },
};

export const actions = {
  async verify({ commit }) {
    try {
      const res = await this.$axios.$get('users?$select=kyc.isVerified');

      if (res.data.length > 0) {
        commit('SET_KYCVERIFIED', res.data[0].kyc.isVerified);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials');
      }
    }
  },
};
