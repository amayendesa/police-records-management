<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar
            is-blur="blur blur-rounded my-3 py-2 start-0 end-0 mx-4 shadow"
            btn-background="bg-gradient-success"
            :dark-mode="true"
        />
      </div>
    </div>
  </div>
  <main class="mt-0 main-content main-content-bg">
    <section>
      <div class="page-header min-vh-75">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-6 d-flex flex-column">
              <div class="mt-8 card card-plain">
                <div class="pb-0 card-header text-start">
                  <h3 class="font-weight-bolder text-primary text-gradient">
                    Welcome back
                  </h3>
                  <p class="mb-0">Enter your username and password to sign in</p>
                </div>
                <div class="card-body">
                  <label>Username</label>
                  <input
                      id="email"
                      type="text"
                      placeholder="Username"
                      name="email"
                      v-model="username"
                      class="form-control"
                      required="required"
                  />
                  <label>Password</label>
                  <input
                      id="password"
                      type="password"
                      placeholder="Password"
                      name="password"
                      class="form-control"
                      required="required"
                      v-model="password"
                  />
                  <!--                  :disabled="username==='' || password===''"-->
                  <div class="text-center">
                    <soft-button
                        class="my-4 mb-2"
                        variant="gradient"
                        color="primary"
                        v-if="!loadTable"
                        full-width
                        @click="handleSubmit"
                    >Sign in
                    </soft-button>
                    <button v-if="loadTable" class="btn bg-gradient-primary my-4 mb-2 form-control" variant="gradient"
                            color="primary" type="button" disabled>
                      <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                      Signing In...
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div
                  class="top-0 oblique position-absolute h-100 d-md-block d-none me-n8"
              >
                <div
                    class="bg-cover oblique-image position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                    :style="{
                    backgroundImage:
                      'url(' +
                      require('@/assets/img/police/police-image.jpeg') +
                      ')',
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <app-footer/>
</template>

<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
// import SoftInput from "@/components/SoftInput.vue";
import SoftButton from "@/components/SoftButton.vue";

const body = document.getElementsByTagName("body")[0];
import {mapMutations} from "vuex";
import {userService} from '@/services/user.service'
// import {keyCloakFunction} from "@/services/auth-token";
// import {logout} from "../../../services/user.service";

export default {
  name: "login",
  components: {
    Navbar,
    AppFooter,
    SoftButton,
  },
  data() {
    return {
      loader: null,
      loading: false,
      loading2: false,
      loading3: false,
      loading4: false,
      loading5: false,
      loadTable: false,
      username: '',
      password: '',
      submitted: false,
      valid: false,
      firstName: '',
      showAgent: false,
      lastName: '',
      email: '',
      verify: '',
      loginPassword: '',
      loginEmail: '',
      loginEmailRules: [
        v => !!v || 'Required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      emailRules: [
        v => !!v || 'Required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],

      show1: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => (v && v.length >= 8) || 'Min 8 characters',
      },
    }
  },
  created() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.add("bg-gray-100");
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    initialize() {
    },
    async handleSubmit() {
      // const l = this.loader
      // this[l] = !this[l]
      this.loadTable = true
      this.submitted = true
      if (this.username !== '' && this.password !== '') {
        // setTimeout(() => (this[l] = false), 3000)
        const val = await userService.login(this.username, this.password)
        try {
          if (val==={}) {
            this.$swal({
              title: "Login Error!",
              text: "Check if Username and password correct!",
              icon: "error",
              customClass: {
                confirmButton: "btn bg-gradient-success",
              },
              buttonsStyling: false,
              //timer: 1500,
            });
          }
          if (val===null) {
            this.$swal({
              title: "Error!",
              text: "Process failed.",
              icon: "error",
              customClass: {
                confirmButton: "btn bg-gradient-success",
              },
              buttonsStyling: false,
              //timer: 1500,
            });
          }
            if (val.firstName) {
              window.location.href = '/'
            }
            this.loadTable = false

        } catch (e) {
          this.loadTable = false
          console.log('login error')
          this.$swal({
            title: "Login Error!",
            text: "Check if Username and password correct!",
            icon: "error",
            customClass: {
              confirmButton: "btn bg-gradient-success",
            },
            buttonsStyling: false,
            //timer: 1500,
          });
        }
        // this.loader = null
      } else {
        this.$swal({
          title: "Invalid Input",
          text: "Username and password required",
          icon: "error",
          customClass: {
            confirmButton: "btn bg-gradient-success",
          },
          buttonsStyling: false,
          //timer: 1500,
        });
        this.loadTable = false
        console.log('not valid')
      }
    },
  },
};
</script>
<style #scoped>
.table-condensed {
  font-size: 0.775rem !important;
}

a {
  cursor: pointer;
}
</style>