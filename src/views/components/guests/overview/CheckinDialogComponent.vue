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
                    class="required"
                    :rules="[validations.required('The Last Name cannot be empty')]"
                  />
                  <v-text-field
                    v-model="checkInDto.guestPersonalDetails.firstName"
                    label="Firstname"
                    class="required"
                    :rules="[validations.required('The First Name cannot be empty')]"
                  />
                  <base-datepicker
                    :date="checkInDto.guestPersonalDetails.birthDate"
                    label="Birthdate"
                    property="birthDate"
                    :required="true"
                    :rules="[validations.required('The Birthdate cannot be empty')]"
                    @date-updated="updateGuestPersonalDetailsField"
                  />
                  <v-autocomplete
                    v-model="checkInDto.guestPersonalDetails.nationality"
                    :items="nationalities"
                    label="Nationality"
                    class="required"
                    :rules="[validations.required('The Nationality cannot be empty')]"
                  />
                  <v-text-field
                    v-model="checkInDto.guestPersonalDetails.passportId"
                    label="Passport ID"
                    class="required"
                    :rules="[validations.required('The Passport ID cannot be empty')]"
                  />
                  <v-divider />
                  <v-text-field
                    v-model="checkInDto.guestPersonalDetails.street"
                    label="Street"
                    class="required"
                    :rules="[validations.required('The Street cannot be empty')]"
                  />
                  <v-text-field
                    v-model="checkInDto.guestPersonalDetails.city"
                    label="City"
                    class="required"
                    :rules="[validations.required('The City cannot be empty')]"
                  />
                  <v-text-field
                    v-model="checkInDto.guestPersonalDetails.postcode"
                    label="Postcode"
                    class="required"
                    :rules="[validations.required('The Postcode cannot be empty')]"
                  />
                  <v-autocomplete
                    v-model="checkInDto.guestPersonalDetails.country"
                    :items="countries"
                    label="Country"
                    class="required"
                    :rules="[validations.required('The Country cannot be empty')]"
                  />
                  <v-divider />
                  <v-text-field
                    v-model="checkInDto.guestPersonalDetails.email"
                    label="Email"
                    class="required"
                    :rules="[validations.required('The Email cannot be empty'), validations.email()]"
                  />
                  <v-text-field
                    v-model="checkInDto.guestPersonalDetails.phone"
                    label="Phone"
                    class="required"
                    :rules="[validations.required('The Phone cannot be empty')]"
                  />
                </div>
              </v-stepper-content>

              <v-stepper-content step="2">
                <div class="mb-3">
                  <v-text-field
                    v-model="checkInDto.stayDetails.boxNumber"
                    label="Box Number"
                    :error-messages="boxErrorMessages"
                    class="required"
                    :rules="[validations.required('The Box Number cannot be empty')]"
                  />
                  <base-datepicker
                    :date="checkInDto.stayDetails.checkInDate"
                    label="Check In"
                    property="checkInDate"
                    :required="true"
                    :rules="[validations.required('The Check In cannot be empty'), validations.validateStayDates(checkInDto, 'checkInDate')]"
                    @date-updated="updateStayDetailsField"
                  />
                  <base-datepicker
                    :date="checkInDto.stayDetails.arriveDate"
                    label="Arrive"
                    property="arriveDate"
                    :required="true"
                    :rules="[validations.required('The Arrive cannot be empty'), validations.validateStayDates(checkInDto, 'arriveDate')]"
                    @date-updated="updateStayDetailsField"
                  />
                  <base-datepicker
                    :date="checkInDto.stayDetails.leaveDate"
                    label="Leave"
                    property="leaveDate"
                    :required="true"
                    :rules="[validations.required('The Leave cannot be empty'), validations.validateStayDates(checkInDto, 'leaveDate')]"
                    @date-updated="updateStayDetailsField"
                  />
                  <v-text-field
                    v-model="checkInDto.stayDetails.hotel"
                    label="Hotel"
                    class="required"
                    :rules="[validations.required('The Hotel cannot be empty')]"
                  />
                  <v-text-field
                    v-model="checkInDto.stayDetails.room"
                    label="Room"
                    class="required"
                    :rules="[validations.required('The Room cannot be empty')]"
                  />
                  <v-text-field
                    v-model="checkInDto.stayDetails.preBooking"
                    label="Pre Booking"
                    class="required"
                    :rules="[validations.required('The Prebooking cannot be empty')]"
                  />
                </div>
              </v-stepper-content>

              <v-stepper-content step="3">
                <div class="mb-3">
                  <base-datepicker
                    :date="checkInDto.stayDetails.lastDiveDate"
                    label="Last Dive"
                    property="lastDiveDate"
                    :staydto="checkInDto"
                    :required="true"
                    :rules="[validations.required('The Last Dive cannot be empty'), validations.validateStayDates(checkInDto, 'lastDiveDate')]"
                    @date-updated="updateStayDetailsField"
                  />
                  <v-text-field
                    v-model="checkInDto.stayDetails.divesAmount"
                    label="Number of Dives"
                    type="number"
                    class="required"
                    :rules="[validations.required('The Number of Dives cannot be empty'), validations.checkPositiveNumber()]"
                    @date-updated="updateStayDetailsField"
                  />
                  <v-text-field
                    v-model="checkInDto.stayDetails.brevet"
                    label="Brevet"
                    class="required"
                    :rules="[validations.required('The Brevet cannot be empty')]"
                  />
                  <v-autocomplete
                    v-model="checkInDto.stayDetails.nitrox"
                    :items="booleanItems"
                    label="Nitrox"
                    class="required"
                    :rules="[validations.required('The Nitrox cannot be empty')]"
                  />
                  <v-autocomplete
                    v-model="checkInDto.stayDetails.medicalStatement"
                    :items="booleanItems"
                    label="Medical Statement"
                    class="required"
                    :rules="[validations.required('The Medical Statement cannot be empty')]"
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
          :disabled="!isCheckinFormValid"
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
  import BoxManagementService from '@/services/BoxManagementService'
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
      boxErrorMessages: [],
      isCheckinFormValid: true,
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
          BoxManagementService.isBoxEmpty(newBoxnumber.trim())
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
    methods: {
      open () {
        GuestService.getGuestPersonalDetails(this.selectedGuest.id).then((response) => {
          this.checkInDto.guestPersonalDetails = response.data
        })
          .catch((error) => {
            NotificationService.error(error.response.data.message)
          })
        this.openDialog = true
      },
      close () {
        this.step = 1
        this.boxErrorMessages = []
        this.$refs.form.reset()
        this.$refs.form.resetValidation()
        this.openDialog = false
        this.clearCheckInDtoFields()
      },
      save () {
        if (this.validForm) {
          this.checkInDto.guestPersonalDetails.id = this.selectedGuest.id
          GuestService.checkInGuest(this.checkInDto)
            .then((response) => {
              this.$emit('onSave', this.checkInDto)
              this.close()
            }).catch(error => {
              if (error.response.status === 409 && error.response.data.message === 'The box number is already used.') {
                this.boxErrorMessages.push('This box is not free')
                this.step = 2
              }
              NotificationService.error(error.response.data.message)
            })
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
      updateStayDetailsField (property, value) {
        this.validateDate(property)
        this.checkInDto.stayDetails[property] = value
      },
      validateDate (property) {
        const array = ['checkInDate', 'leaveDate', 'arriveDate']
        if (array.indexOf(property) !== -1) {
          array.forEach(element => {
            if (element !== property && this.checkInDto.stayDetails[element]) {
              var self = this
              this.checkInDto.stayDetails[element] = this.checkInDto.stayDetails[element] + ' '
              setTimeout(function () {
                self.checkInDto.stayDetails[element] = self.checkInDto.stayDetails[element].substring(0, self.checkInDto.stayDetails[element].length - 1)
              }, 0)
            }
          })
        }
      },
      clearCheckInDtoFields () {
        Object.keys(this.checkInDto).forEach(property => {
          Object.keys(this.checkInDto.stayDetails).forEach(property => {
            delete this.checkInDto.stayDetails[property]
          })

          Object.keys(this.checkInDto.guestPersonalDetails).forEach(property => {
            delete this.checkInDto.stayDetails[property]
          })
        })
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
