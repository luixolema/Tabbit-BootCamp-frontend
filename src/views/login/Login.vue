<template>
  <v-app>
    <v-container
      id="login"
      fluid
      tag="section"
    >
      <v-divider class="my-12" />
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <base-material-card>
            <template v-slot:heading>
              <div class="display-2 font-weight-light">
                Dive Center Manager
              </div>

              <div class="subtitle-1 font-weight-light">
                Login
              </div>
            </template>

            <v-form
              ref="form"
              v-model="isLoginFormValid"
            >
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="login"
                      label="User"
                      :rules="[validations.required('The user email cannot be empty'), validations.email()]"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="password"
                      :rules="[validations.required('The password cannot be empty'),validations.minLength(8,'The password cannot be less than 8 characters')]"
                      type="password"
                      label="Password"
                      counter
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    class="text-right"
                  >
                    <v-btn
                      :disabled="!isLoginFormValid"
                      color="success"
                      class="mr-0"
                      @click="onLogin"
                    >
                      Login
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </base-material-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>

  import validations from '@/components/formUtils/Validations'
  import AuthenticationService from '@/services/AuthenticationService'
  import NotificationService from '@/services/NotificationService'
  import router from '@/router'
  export default {
    name: 'Login',
    data () {
      return {
        isLoginFormValid: false,
        login: '',
        password: '',
        validations,
        router,
      }
    },
    methods: {
      onLogin (index) {
        const loginDto = {
          login: this.login,
          password: this.password,
        }

        AuthenticationService.loginUser(loginDto)
          .then(response => {
            sessionStorage.token = response.data.token
            this.router.push('/')
          })
          .catch(error => {
            if (error.response.status === 404) {
              NotificationService.error(error.response.data.message)
            } else {
              NotificationService.error(error.message)
            }
          })
      },
    },
  }
</script>
