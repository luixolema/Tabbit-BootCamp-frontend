<template>
  <v-dialog
    v-model="openDialog"
    width="700"
    scrollable
    persistent
  >
    <v-card>
      <v-toolbar
        flat
        dark
        color="primary"
      >
        <v-toolbar-title>Check in Guest</v-toolbar-title>
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
        <v-stepper
          v-model="step"
          non-linear
        >
          <v-stepper-header>
            <v-stepper-step
              editable
              step="1"
            >
              Personal Data
            </v-stepper-step>

            <v-divider />

            <v-stepper-step
              editable
              step="2"
            >
              Stay Related Data
            </v-stepper-step>

            <v-divider />

            <v-stepper-step
              editable
              step="3"
            >
              Dive Data
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <!--FORM init -->
            <v-form
              ref="form"
              v-model="isCheckinFormValid"
            >
              <v-stepper-content step="1">
                <div class="mb-3">
                  <v-text-field
                    v-model="checkInDto.guestPersonalDetails.lastName"
                    label="Lastname"
                    autofocus
                    :rules="[rules.required]"
                  />
                  <v-text-field
                    v-model="checkInDto.guestPersonalDetails.firstName"
                    label="Firstname"
                    :rules="[rules.required]"
                  />
                  <base-datepicker
                    :date="checkInDto.guestPersonalDetails.birthDate"
                    label="Birthdate"
                    property="birthDate"
                    @date-updated="updateGuestPersonalDetailsField"
                  />
                  <v-autocomplete
                    v-model="checkInDto.guestPersonalDetails.nationality"
                    :items="nationalities"
                    label="Nationality"
                    :rules="[rules.required]"
                  />
                  <v-text-field
                    v-model="checkInDto.guestPersonalDetails.passportId"
                    label="Passport ID"
                    :rules="[rules.required]"
                  />
                  <v-divider />
                  <v-text-field
                    v-model="checkInDto.guestPersonalDetails.street"
                    label="Street"
                    :rules="[rules.required]"
                  />
                  <v-text-field
                    v-model="checkInDto.guestPersonalDetails.city"
                    label="City"
                    :rules="[rules.required]"
                  />
                  <v-text-field
                    v-model="checkInDto.guestPersonalDetails.postcode"
                    label="postcode"
                    :rules="[rules.required]"
                  />
                  <v-autocomplete
                    v-model="checkInDto.guestPersonalDetails.country"
                    :items="countries"
                    label="Country"
                    :rules="[rules.required]"
                  />
                  <v-divider />
                  <v-text-field
                    v-model="checkInDto.guestPersonalDetails.email"
                    label="email"
                    :rules="[rules.required,rules.email]"
                  />
                  <v-text-field
                    v-model="checkInDto.guestPersonalDetails.phone"
                    label="Phone"
                    :rules="[rules.required]"
                  />
                </div>
              </v-stepper-content>

              <v-stepper-content step="2">
                <div class="mb-3">
                  <v-text-field
                    v-model="checkInDto.stayDetails.boxNumber"
                    label="Box Number"
                    :error-messages="boxErrorMessages"
                    :rules="[rules.required]"
                  />
                  <base-datepicker
                    :date="checkInDto.stayDetails.checkInDate"
                    label="Check In"
                    property="checkInDate"
                    @date-updated="updateStayPersonalDetailsField"
                  />
                  <base-datepicker
                    :date="checkInDto.stayDetails.arriveDate"
                    label="Arrive"
                    property="arriveDate"
                    @date-updated="updateStayPersonalDetailsField"
                  />
                  <base-datepicker
                    :date="checkInDto.stayDetails.leaveDate"
                    label="Leave"
                    property="leaveDate"
                    @date-updated="updateStayPersonalDetailsField"
                  />
                  <v-text-field
                    v-model="checkInDto.stayDetails.hotel"
                    label="Hotel"
                    :rules="[rules.required]"
                  />
                  <v-text-field
                    v-model="checkInDto.stayDetails.room"
                    label="Room"
                    :rules="[rules.required]"
                  />
                  <v-text-field
                    v-model="checkInDto.stayDetails.preBooking"
                    label="Pre Booking"
                    :rules="[rules.required]"
                  />
                </div>
              </v-stepper-content>

              <v-stepper-content step="3">
                <div class="mb-3">
                  <base-datepicker
                    :date="checkInDto.stayDetails.lastDiveDate"
                    label="last Dive"
                    property="lastDiveDate"
                    @date-updated="updateStayPersonalDetailsField"
                  />
                  <v-text-field
                    v-model="checkInDto.stayDetails.divesAmount"
                    label="Number of Dives"
                    type="number"
                    :rules="[rules.required, rules.nonNegative]"
                  />
                  <v-text-field
                    v-model="checkInDto.stayDetails.brevet"
                    label="brevet"
                    :rules="[rules.required]"
                  />
                  <v-autocomplete
                    v-model="checkInDto.stayDetails.nitrox"
                    :items="booleanItems"
                    label="Nitrox"
                  />
                  <v-autocomplete
                    v-model="checkInDto.stayDetails.medicalStatement"
                    :items="booleanItems"
                    label="Medical Statement"
                  />
                </div>
              </v-stepper-content>
            </v-form>
          </v-stepper-items>
        </v-stepper>
      </v-card-text>
      <v-divider />
      <v-card-actions class="d-flex flex-row justify-space-between">
        <v-btn
          :disabled="step==1"
          @click="backStep"
        >
          Back
        </v-btn>

        <v-btn
          v-if="step < 3"
          @click="nextStep"
        >
          Next
        </v-btn>
        <v-btn
          v-else
          @click="save"
        >
          CHECK IN!
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import validations from '../../../../components/formUtils/Validations'
  import StayService from '@/services/StayService'
  import GuestService from '@/services/GuestService'
  import NotificationService from '@/services/NotificationService'
  import countries from '@/constants/countries'
  import nationalities from '@/constants/nationalities'

  export default {
    data: () => ({
      openDialog: false,
      checkInDto: {
        guestPersonalDetails: {
          id: undefined,
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
        stayDetails: {
          id: undefined,
          boxNumber: '',
          checkInDate: '',
          arriveDate: '',
          leaveDate: '',
          hotel: '',
          room: '',
          lastDiveDate: '',
          brevet: '',
          divesAmount: null,
          nitrox: true,
          medicalStatement: true,
          preBooking: '',
        },
      },
      step: 1,
      validations,
      rules: {
        required: value => (!!value && value.match(/^ *$/) === null) || 'Required.',
        counter: value => value.length <= 20 || 'Max 20 characters',
        nonNegative: value => value >= 0 || 'The number can not be negative',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail'
        },
      },
      boxErrorMessages: [],
      isCheckinFormValid: false,
      booleanItems: [
        {
          value: 'true',
          text: 'Yes',
        },
        {
          value: 'false',
          text: 'No',
        },
      ],
      countries,
      nationalities,
    }),
    computed: {
      validForm () {
        return this.$refs.form.validate()
      },
      selectedGuest () {
        return this.$store.state.guestModule.selectedGuest
      },
      boxNumber () {
        return this.checkInDto.stayDetails.boxNumber
      },
    },
    watch: {
      boxNumber (newBoxnumber, oldBoxnumber) {
        if (newBoxnumber && newBoxnumber.trim().length) {
          StayService.isBoxEmpty(newBoxnumber.trim())
            .then((response) => {
              if (response.data) {
                this.boxErrorMessages = []
              } else {
                this.boxErrorMessages.push('This box is not free')
              }
            })
        }
      },
    },
    mounted () {
      var self = this
      window.addEventListener('keyup', function (event) {
        // If dialog is open and ESC key was pressed...
        if (self.openDialog && event.keyCode === 27) {
          self.close()
        }
      })
    },
    methods: {
      open () {
        this.openDialog = true
      },
      close () {
        this.openDialog = false
        this.step = 1
        this.boxErrorMessages = []
        this.$refs.form.reset()
        this.$refs.form.resetValidation()
      },
      save () {
        if (this.validForm) {
          this.checkInDto.guestPersonalDetails.id = this.selectedGuest.id
          GuestService.checkInGuest(this.checkInDto)
            .then((response) => {
              this.$emit('onSave', this.checkInDto)
              this.$refs.form.reset()
              this.$refs.form.resetValidation()
              this.close()
            }).catch(error => NotificationService.error(null, error))
        } else {
          NotificationService.warning('The form is invalid, please check it')
        }
      },
      updateGuestPersonalDetailsField (property, value) {
        this.checkInDto.guestPersonalDetails[property] = value
      },
      nextStep () {
        this.step = parseInt(this.step) + 1
      },
      backStep () {
        this.step = parseInt(this.step) - 1
      },
      updateStayPersonalDetailsField (property, value) {
        this.checkInDto.stayDetails[property] = value
      },
    },
  }
</script>

<style scoped>
  .v-stepper__header{
    box-shadow: none !important;
  }
  .v-stepper{
    box-shadow: none !important;
  }
  .v-stepper__content{
    padding: 0px 0px 0px 0px;
  }
</style>
