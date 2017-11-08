<template>
  <div class="mailchimp">
    <div class="container">
      <form action="//reidao.us13.list-manage.com/subscribe/post?u=19ee2d5c3ec6d0574a670a5c7&amp;id=854741328f" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
        <b-input-group>
          <i v-bind:class="checkValidEmail" class="fa icon" />
          <b-form-fieldset>
            <b-form-input v-model="email" type="email" placeholder="E-mail address" name="EMAIL" class="form-control" id="mce-EMAIL"></b-form-input>
          </b-form-fieldset>
          <b-input-group-button slot="right">
            <b-button v-bind:disabled="disabled" size="lg" variant="primary" type="submit" name="subscribe">
              Get updates
            </b-button>
          </b-input-group-button>
        </b-input-group>
        <div id="mce-responses" class="clear">
          <div class="response" id="mce-error-response" style="display:none"></div>
          <div class="response" id="mce-success-response" style="display:none"></div>
        </div> <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups -->
        <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_19ee2d5c3ec6d0574a670a5c7_854741328f" tabindex="-1" value=""></div>
      </form>
    </div>
  </div>
</template>
<script>
  let vm;

  export default {
    name: 'MailChimp',
    created() {
      // Instantiate view model
      vm = this;
    },
    data() {
      return {
        disabled: true,
        email: '',
        icon: null,
        tester: 'null',
      };
    },
    computed: {
      checkValidEmail() {
        const re = /\S+@\S+\.\S+/;
        let result;

        if (vm.email.length === 0) {
          vm.disabled = true;
          result = null;
        } else if (re.test(vm.email)) {
          vm.disabled = false;
          result = 'fa-check success';
        } else {
          vm.disabled = true;
          result = 'fa-exclamation-triangle warning';
        }

        return result;
      },
    },
  };
</script>
<style lang="scss" scoped>
  @import url(https://cdn-images.mailchimp.com/embedcode/classic-10_7.css);
  @import '~assets/styles/main.scss';

  #mc_embed_signup {
    font-family: 'Roboto Condensed', serif;
    font-size: 0.8vw;
    color: $green;
  }
  *::-webkit-input-placeholder {
    color: $white;
  }
  *::-moz-placeholder {
    color: $white;
  }
  .btn {
    background-image: linear-gradient(to bottom, $light-green, $dark-green);
    border: 1px solid $dark-green;
    border-radius: 5vw !important;
    box-shadow: $button-shadow;
    color: $white;
    font-family: 'Roboto Condensed', serif;
    letter-spacing: 0.3px;
    text-shadow: $text-shadow;
  }
  .fa-icon {
    width: auto;
    height: 1em;
  }
  .form-control {
    color: $white;
    background-color: transparent;
  }
  .input-group {
    position: relative;

    input {
      background-color: transparent;
      border: solid 0.5px rgba(255, 255, 255, 0.3);
      border-radius: 5vw !important;
      color: $white;
      font-family: 'Roboto Condensed', serif;
      font-weight: bold;
    }
    input:focus {
      border: solid 1px rgba(255, 255, 255, 0.3);
      box-shadow: $box-shadow;
      outline: 0;
      -webkit-box-shadow: $box-shadow;
    }
    button {
      cursor: pointer;
      position: absolute;
      transition: all .2s;
      z-index: $zindex-button !important;
    }
    button.disabled {
      cursor: not-allowed;
    }
    .icon {
      position: absolute;
    }
    .warning {
      color: $orange;
      position: absolute;
    }
    .success {
      color: $green;
    }
  }
  @media (max-width: $screen-xs-max) {
    .btn {
      border-radius: 5vw;
      font-size: 2.5vw;
      height: 9.3vw;
      margin-right: 0.1vw;
      width: 28vw;
    }
    .container {
      width: 87%;
    }
    .input-group {
      input {
        border-radius: 5vw;
        font-size: 2.5vw;
        height: 10vw;
        padding-left: 6vw;
        width: 80vw;
      }
      button {
        right: 0.2vw;
        top: 0.4vw;
      }
      .icon {
        font-size: 3vw;
        left: 2vw;
        top: 3.1vw;
      }
    }
  }
  @media (min-width: $screen-sm-min) {
    .btn {
      font-size: 1.3vw;
      height: 4.7vw;
      width: 15vw;
    }
    .container {
      width: 75%;
    }
    .input-group {
      input {
        font-size: 1.3vw;
        height: 5vw;
        padding-left: 2.5vw;
        width: 72.5vw;
      }
      button {
        right: 0;
        top: 0.1vw;
      }
      .icon {
        left: 0.8vw;
        top: 1.6vw;
      }
    }
  }
  @media (min-width: $screen-md-min) {
    .btn {
      font-size: 1.5vw;
    }
    .input-group {
      input {
        font-size: 1.5vw;
      }
    }
  }
  @media (min-width: $screen-lg-min) {
    .btn {
      font-size: 1vw;
      height: 3.25vw;
      margin-right: 0.1vw;
      width: 10vw;
    }
    .container {
      width: 52%;
    }
    .input-group {
      input {
        font-size: 1vw;
        height: 3.5vw;
        padding-left: 2.2vw;
        width: 50.5vw;
      }
      button {
        right: 0;
        top: 0.15vw;
      }
      .icon {
        left: 1vw;
        top: 1.3vw;
      }
    }
  }
</style>
