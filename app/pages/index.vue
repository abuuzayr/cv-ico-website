<script>
  // Declare scoped vars
  let vm;

  export default {
    name: 'Crowdvilla',
    created() {
      // Instantiate view model
      vm = this;
    },
    middleware: 'authenticated',
  };
</script>
<template>
  <div class="crowdvilla">
    <b-container class="component-container">
      <Login />
      <!-- <NeedHelp /> -->
    </b-container>
  </div>
</template>
<style lang="scss" scoped>
  @import '~assets/styles/main.scss';

  .crowdvilla {
    @include page-mixin();
  }

  .crowdvilla-index {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 100vh;
  }

  .btn {
    color: $white;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 14px;
    width: 250px;
    padding: 10px;
    border-radius: 20px;
    border: 2px solid #39b54a;
    &.register-btn {
      border: 2px solid #fff;
      &:hover {
        background: #fff;
        color: #39b54a;
      }
    }
    &.login-btn {
      border: 2px solid #39b54a;
      &:hover {
        background: transparent;
        color: #39b54a;
      }
    }
  }

  @media (max-width: $screen-xs-max) {
  }
  @media (min-width: $screen-sm-min) {
  }
  @media (min-width: $screen-md-min) {
  }
  @media (min-width: $screen-lg-min) {
  }
</style>
