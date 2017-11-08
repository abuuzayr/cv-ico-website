<template>
  <div class="navigation">
    <b-navbar class="topbar" v-bind:toggleable="true" toggle-breakpoint="sm" type="dark" variant="info">
      <b-nav-toggle target="nav-collapse"></b-nav-toggle>
      <b-collapse is-nav id="nav-collapse">
        <b-nav is-nav-bar class="ml-auto">
          <b-nav-item v-if="!isAuthenticated" v-b-modal="'modal-registration'" class="label">Login/Sign-up</b-nav-item>
          <b-nav-item v-b-modal="'modal-terms'" class="label">Terms</b-nav-item>
        </b-nav>
      </b-collapse>
    </b-navbar>

    <b-modal id="modal-registration"
             v-bind:hide-footer="true"
             size="lg"
    >
      <div class="custom-modal-header" slot="modal-header">
        REIDAO TOKENSALE ACCESS
      </div>
      <Modal-Registration />
    </b-modal>

    <b-modal id="modal-terms"
             v-bind:hide-footer="true"
             size="lg"
    >
      <div class="custom-modal-header" slot="modal-header">
        Terms and Conditions
      </div>
      <Modal-Terms />
    </b-modal>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

let vm;

export default {
  name: 'Navigation',
  created() {
    // Instantiate view model
    vm = this;
  },
  computed: {
    ...mapGetters({ isAuthenticated: 'auth/isAuthenticated' }),
  },
  methods: {
    gotoRoute(route) {
      vm.$router.push(route);
    },
  },
};
</script>
<style lang="scss" scoped>
  @import '~assets/styles/main.scss';

  #nav-collapse {
    border-color: transparent;
    border: 0;
  }
  .label {
    font-family: $font-normal;
  }
  .custom-modal-header {
    background-color: $dark-green;
    border-top-left-radius: 0.5vw;
    border-top-right-radius: 0.5vw;
    color: $white;
    font-family: $font-condensed;
    font-weight: bold;
    letter-spacing: 0.5px;
    padding: 0;
    width: 100%;
  }
  .topbar {
    background-color: transparent !important;
    border: 0;
  }
  @media (max-width: $screen-xs-max) {
    .custom-modal-header {
      font-size: 5vw;
      padding: 1vw 1vw;
    }
    .label {
      font-size: 5vw;
      font-weight: 900;
      line-height: 2;
    }
  }
  @media (min-width: $screen-sm-min) {
    .custom-modal-header {
      font-size: 1.8vw;
      padding: 0.5vw 0.5vw;
    }
    .label {
      font-size: 1.5vw;
      font-weight: 900;
      line-height: 2;
    }
  }
  @media (min-width: $screen-md-min) {
    .label {
      font-size: 1.3vw;
    }
  }
  @media (min-width: $screen-lg-min) {
    .custom-modal-header {
      font-size: 1.2vw;
      padding: 1vw 1vw;
    }
    .label {
      font-size: 0.9vw;
      font-weight: 900;
      line-height: 1.88;
    }
  }
</style>
