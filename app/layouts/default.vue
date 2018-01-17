<template>
  <div id="app">
    <!-- <Particles
      color="#F5F5F5"
      :particleOpacity="0.7"
      linesColor="#F5F5F5"
      :particlesNumber="30"
      shapeType="circle"
      :particleSize="3"
      :linesWidth="2"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="0.3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </Particles> -->
    <no-ssr>
      <notifications
        group="announce-info"
        position="top center"
        classes="announce-info"
        width="30%"
        v-bind:duration="5000"
        v-bind:max="3"
      />
    </no-ssr>
    <no-ssr>
      <notifications
        group="announce-error"
        position="top center"
        classes="announce-error"
        width="30%"
        v-bind:duration="5000"
        v-bind:max="3"
      />
    </no-ssr>
    <no-ssr>
      <notifications
        group="notify"
        position="bottom right"
      />
    </no-ssr>
    <transition
      appear
      mode="out-in"
      enter-active-class="animated fadeIn"
    >
      <nuxt />
    </transition>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'app',
    head() {
      return {
        title: this.appTitle,
      };
    },
    computed: {
      ...mapState([
        'appTitle',
      ]),
    },
  };
</script>

<style lang="scss">
  @import '~assets/styles/main.scss';

  body,
  #__nuxt,
  #app {
    height: 100%;
  }
  body {
    background: $blue-bg !important;
  }
  #app {
    font-family: 'Roboto', serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
  #particles-js {
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .notification.announce-info {
    margin: 10px;
    margin-bottom: 0;
    border-radius: 3px;
    padding: 10px 20px;
    color: $grey;
    background: $notify-bg;

    .notification-title {
      letter-spacing: 1px;
      text-transform: uppercase;
      color: $blue;
    }
  }

  .notification.announce-error {
    margin: 10px;
    margin-bottom: 0;
    border-radius: 3px;
    padding: 10px 20px;
    color: $white;
    background: $red;

    .notification-title {
      letter-spacing: 1px;
      text-transform: uppercase;
      color: $white;
    }
  }
</style>
