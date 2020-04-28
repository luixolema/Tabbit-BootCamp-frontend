<template>
  <v-dialog
    v-model="openDialog"
    width="700"
    scrollable
    persistent
  >
    <v-card
      v-if="openDialog"
    >
      <v-toolbar
        flat
        dark
        color="primary"
      >
        <v-toolbar-title>Add New Guest</v-toolbar-title>
        <v-spacer />
        <v-menu
          bottom
          right
          offset-y
        >
          <template v-slot:activator="{ on }">
            <v-btn
              dark
              icon
              v-on="on"
              @click="close"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-menu>
      </v-toolbar>
      <v-card-text>
        <!--FORM init -->
        <v-form
          ref="form"
          v-model="isAddGuestFormValid"
        >
          <div class="mb-3">
            <v-subheader class="justify-center display-2">
              Personal Data
            </v-subheader>
            <v-text-field
              v-model="guestCreationDto.lastName"
              label="Lastname"
              autofocus
              class="required"
              :rules="[validations.required('The Last Name cannot be empty')]"
            />
            <v-text-field
              v-model="guestCreationDto.firstName"
              label="Firstname"
              class="required"
              :rules="[validations.required('The First Name cannot be empty')]"
            />
            <base-datepicker
              :date="guestCreationDto.birthDate"
              label="Birthdate"
              property="birthDate"
              :requiered="true"
              :rules="[validations.required('The Birthdate cannot be empty')]"
              @date-updated="updateguestCreationDtoField"
            />
            <v-autocomplete
              v-model="guestCreationDto.nationality"
              :items="nationalities"
              label="Nationality"
              class="required"
              :rules="[validations.required('The Nationality cannot be empty')]"
            />
            <v-text-field
              v-model="guestCreationDto.passportId"
              label="Passport ID"
            />
            <v-divider class="my-3" />
            <v-text-field
              v-model="guestCreationDto.street"
              label="Street"
              class="required"
              :rules="[validations.required('The Street cannot be empty')]"
            />
            <v-text-field
              v-model="guestCreationDto.city"
              label="City"
              class="required"
              :rules="[validations.required('The City cannot be empty')]"
            />
            <v-text-field
              v-model="guestCreationDto.postcode"
              label="Postcode"
              class="required"
              :rules="[validations.required('The Postcode cannot be empty')]"
            />
            <v-autocomplete
              v-model="guestCreationDto.country"
              :items="countries"
              label="Country"
              class="required"
              :rules="[validations.required('The Country cannot be empty')]"
            />
            <v-divider class="my-3" />
            <v-text-field
              v-model="guestCreationDto.email"
              label="Email"
              class="required"
              :rules="[validations.required('The Email cannot be empty'), validations.email()]"
            />
            <v-text-field
              v-model="guestCreationDto.phone"
              label="Phone"
            />
          </div>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions class="d-flex flex-row justify-space-between">
        <v-btn
          :disabled="!isAddGuestFormValid"
          @click="addGuest"
        >
          Save
        </v-btn>

        <v-btn
          @click="close"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import validations from '../../../../components/formUtils/Validations'
  import GuestService from '@/services/GuestService'
  import NotificationService from '@/services/NotificationService'
  import countries from '@/constants/countries'
  import nationalities from '@/constants/nationalities'

  export default {
    data: () => ({
      openDialog: false,
      guestCreationDto: {
        firstName: '',
        lastName: '',
        birthDate: '',
        nationality: '',
        country: '',
        city: '',
        postcode: '',
        street: '',
        email: '',
        phone: '',
        passportId: '',
      },
      validations,
      boxErrorMessages: [],
      isAddGuestFormValid: true,
      countries,
      nationalities,
    }),
    methods: {
      open () {
        this.openDialog = true
      },
      close () {
        this.openDialog = false
        this.boxErrorMessages = []
        this.$refs.form.reset()
        this.$refs.form.resetValidation()
        this.clearguestCreationDtoFields()
      },
      addGuest () {
        GuestService.AddGuest(this.guestCreationDto)
          .then((response) => {
            this.$emit('onAddGuest', response.data) //  response.data should hold the new guest id
            this.close()
          }).catch(error => {
            NotificationService.error(error.response.data.message)
          })
      },
      updateguestCreationDtoField (property, value) {
        this.guestCreationDto[property] = value
      },
      clearguestCreationDtoFields () {
        Object.keys(this.guestCreationDto).forEach(property => {
          delete this.guestCreationDto[property]
        })
      },
    },
  }
</script>

<style>
</style>
