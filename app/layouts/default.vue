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
    <transition
      appear
      mode="out-in"
      enter-active-class="animated fadeIn"
    >
      <nuxt/>
    </transition>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import MiniToastr from 'mini-toastr';

  export default {
    name: 'app',
    head() {
      return {
        title: this.appTitle,
      };
    },
    mounted() {
      MiniToastr.init();
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
    background: $blue-bg-color !important;
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
</style>
