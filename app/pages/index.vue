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
    <div class="component-container container">
      <div class="crowdvilla-index">
        <Login />
        <!-- <div class="container-fluid">
          <div class="row mb-5">
            <div class="col-12">
              <a href="/">
                <img src="~@/assets/images/full-size-login-logo.png" alt="login" width="100%">
              </a>
            </div>
          </div>
          <div class="row justify-content-center mt-3 mb-3">
            <div class="col-12">
              <b-button size="lg" type="button" variant="success" href="/login" class="login-btn">
                Login
              </b-button>
            </div>
            <div class="col-12 mt-3 mb-2">
              <b-button size="lg" type="button" variant="outline-success" href="/registration" class="register-btn">
                Sign Up
              </b-button>
            </div>
          </div>
          <NeedHelp />
        </div> -->
      </div>
    </div>
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
