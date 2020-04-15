<template>
  <v-dialog
    v-model="isCheckInDialogOpen"
    persistent
    width="700"
    scrollable
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
              @click="cancel"
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
                    v-model="stayDto.guestPersonalDetails.lastName"
                    label="Lastname"
                    :rules="[rules.required]"
                  />
                  <v-text-field
                    v-model="stayDto.guestPersonalDetails.firstName"
                    label="Firstname"
                    :rules="[rules.required]"
                  />
                  <base-datepicker
                    :date="stayDto.guestPersonalDetails.birthDate"
                    label="Birthdate"
                    property="birthDate"
                    @date-updated="updateGuestPersonalDetailsDateField"
                  />
                  <v-autocomplete
                    v-model="stayDto.guestPersonalDetails.nationality"
                    :items="nationalities"
                    label="Nationality"
                  />
                  <v-text-field
                    v-model="stayDto.guestPersonalDetails.passportId"
                    label="Passport ID"
                    :rules="[rules.required]"
                  />
                  <v-divider />
                  <v-text-field
                    v-model="stayDto.guestPersonalDetails.street"
                    label="Street"
                    :rules="[rules.required]"
                  />
                  <v-text-field
                    v-model="stayDto.guestPersonalDetails.city"
                    label="City"
                    :rules="[rules.required]"
                  />
                  <v-text-field
                    v-model="stayDto.guestPersonalDetails.postcode"
                    label="postcode"
                    :rules="[rules.required]"
                  />
                  <v-autocomplete
                    v-model="stayDto.guestPersonalDetails.country"
                    :items="countries"
                    label="Country"
                  />
                  <v-divider />
                  <v-text-field
                    v-model="stayDto.guestPersonalDetails.email"
                    label="email"
                    :rules="[rules.required,rules.email]"
                  />
                  <v-text-field
                    v-model="stayDto.guestPersonalDetails.phone"
                    label="Phone"
                    :rules="[rules.required]"
                  />
                </div>

                <v-divider />
                <div class="d-flex flex-row justify-space-between">
                  <v-btn
                    text
                    :disabled="true"
                  >
                    Back
                  </v-btn>

                  <v-btn
                    @click="step = 2"
                  >
                    Next
                  </v-btn>
                </div>
              </v-stepper-content>

              <v-stepper-content step="2">
                <div class="mb-3">
                  // content 2
                </div>

                <v-divider />
                <div class="d-flex flex-row justify-space-between">
                  <v-btn
                    @click="step = 1"
                  >
                    Back
                  </v-btn>

                  <v-btn
                    @click="step = 3"
                  >
                    Next
                  </v-btn>
                </div>
              </v-stepper-content>

              <v-stepper-content step="3">
                <div class="mb-3">
                  // content 3
                </div>

                <v-divider />
                <div class="d-flex flex-row justify-space-between">
                  <v-btn
                    @click="step = 2"
                  >
                    Back
                  </v-btn>

                  <v-btn
                    color="primary"
                    @click="save"
                  >
                    Check in!
                  </v-btn>
                </div>
              </v-stepper-content>
            </v-form>
          </v-stepper-items>
        </v-stepper>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          color="blue darken-1"
          text
          @click="isCheckInDialogOpen = false"
        >
          back
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="isCheckInDialogOpen = false"
        >
          Next
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  const CheckinDialogComponent = {
    props: {
      isCheckInDialogOpen: {
        type: Boolean,
        required: true,
      },
      onSave: {
        type: Function,
      },
      onCancel: {
        type: Function,
      },
    },
    data: () => ({
      stayDto: {
        guestPersonalDetails: {
          id: 1,
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
          id: 1,
          boxNumber: '',
          checkInDate: '',
          checkOutDate: '',
          arriveDate: '',
          leaveDate: '',
          hotel: '',
          room: '',
          lastDiveDate: '',
          brevet: '',
          divesAmount: null,
          nitrox: true,
          medicalStatement: true,
          active: false,
          preBooking: '',
        },
      },
      step: 1,
      rules: {
        required: value => !!value.trim() || 'Required.',
        counter: value => value.length <= 20 || 'Max 20 characters',
        nonNegative: value => value >= 0 || 'The number can not be negative',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail'
        },
      },
      isCheckinFormValid: false,
      countries: ['United States', 'Canada', 'Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and/or Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Cook Islands', 'Costa Rica', 'Croatia (Hrvatska)', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecudaor', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'France, Metropolitan', 'French Guiana', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard and Mc Donald Islands', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran (Islamic Republic of)', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, Democratic People\'s Republic of', 'Korea, Republic of', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Lao People\'s Democratic Republic', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libyan Arab Jamahiriya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia, Federated States of', 'Moldova, Republic of', 'Monaco', 'Mongolia', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfork Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russian Federation', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia South Sandwich Islands', 'South Sudan', 'Spain', 'Sri Lanka', 'St. Helena', 'St. Pierre and Miquelon', 'Sudan', 'Suriname', 'Svalbarn and Jan Mayen Islands', 'Swaziland', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Taiwan', 'Tajikistan', 'Tanzania, United Republic of', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States minor outlying islands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City State', 'Venezuela', 'Vietnam', 'Virigan Islands (British)', 'Virgin Islands (U.S.)', 'Wallis and Futuna Islands', 'Western Sahara', 'Yemen', 'Yugoslavia', 'Zaire', 'Zambia', 'Zimbabwe'],
      nationalities: ['Afghan', 'Albanian', 'Algerian', 'American', 'Andorran', 'Angolan', 'Antiguans', 'Argentinean', 'Armenian', 'Australian', 'Austrian', 'Azerbaijani', 'Bahamian', 'Bahraini', 'Bangladeshi', 'Barbadian', 'Barbudans', 'Batswana', 'Belarusian', 'Belgian', 'Belizean', 'Beninese', 'Bhutanese', 'Bolivian', 'Bosnian', 'Brazilian', 'British', 'Bruneian', 'Bulgarian', 'Burkinabe', 'Burmese', 'Burundian', 'Cambodian', 'Cameroonian', 'Canadian', 'Cape Verdean', 'Central African', 'Chadian', 'Chilean', 'Chinese', 'Colombian', 'Comoran', 'Congolese', 'Costa Rican', 'Croatian', 'Cuban', 'Cypriot', 'Czech', 'Danish', 'Djibouti', 'Dominican', 'Dutch', 'East Timorese', 'Ecuadorean', 'Egyptian', 'Emirian', 'Equatorial Guinean', 'Eritrean', 'Estonian', 'Ethiopian', 'Fijian', 'Filipino', 'Finnish', 'French', 'Gabonese', 'Gambian', 'Georgian', 'German', 'Ghanaian', 'Greek', 'Grenadian', 'Guatemalan', 'Guinea-Bissauan', 'Guinean', 'Guyanese', 'Haitian', 'Herzegovinian', 'Honduran', 'Hungarian', 'I-Kiribati', 'Icelander', 'Indian', 'Indonesian', 'Iranian', 'Iraqi', 'Irish', 'Israeli', 'Italian', 'Ivorian', 'Jamaican', 'Japanese', 'Jordanian', 'Kazakhstani', 'Kenyan', 'Kittian and Nevisian', 'Kuwaiti', 'Kyrgyz', 'Laotian', 'Latvian', 'Lebanese', 'Liberian', 'Libyan', 'Liechtensteiner', 'Lithuanian', 'Luxembourger', 'Macedonian', 'Malagasy', 'Malawian', 'Malaysian', 'Maldivan', 'Malian', 'Maltese', 'Marshallese', 'Mauritanian', 'Mauritian', 'Mexican', 'Micronesian', 'Moldovan', 'Monacan', 'Mongolian', 'Moroccan', 'Mosotho', 'Motswana', 'Mozambican', 'Namibian', 'Nauruan', 'Nepalese', 'New Zealander', 'Nicaraguan', 'Nigerian', 'Nigerien', 'North Korean', 'Northern Irish', 'Norwegian', 'Omani', 'Pakistani', 'Palauan', 'Panamanian', 'Papua New Guinean', 'Paraguayan', 'Peruvian', 'Polish', 'Portuguese', 'Qatari', 'Romanian', 'Russian', 'Rwandan', 'Saint Lucian', 'Salvadoran', 'Samoan', 'San Marinese', 'Sao Tomean', 'Saudi', 'Scottish', 'Senegalese', 'Serbian', 'Seychellois', 'Sierra Leonean', 'Singaporean', 'Slovakian', 'Slovenian', 'Solomon Islander', 'Somali', 'South African', 'South Korean', 'Spanish', 'Sri Lankan', 'Sudanese', 'Surinamer', 'Swazi', 'Swedish', 'Swiss', 'Syrian', 'Taiwanese', 'Tajik', 'Tanzanian', 'Thai', 'Togolese', 'Tongan', 'Trinidadian or Tobagonian', 'Tunisian', 'Turkish', 'Tuvaluan', 'Ugandan', 'Ukrainian', 'Uruguayan', 'Uzbekistani', 'Venezuelan', 'Vietnamese', 'Welsh', 'Yemenite', 'Zambian', 'Zimbabwean'],
    }),
    methods: {
      cancel () {
        this.step = 1
        this.$emit('onCancel')
      },
      save () {
        this.step = 1
        this.$emit('onSave', this.stayDto)
      },
      updateGuestPersonalDetailsDateField (property, value) {
        this.stayDto.guestPersonalDetails[property] = value
      },
    },
    mounted () {
      var self = this
      window.addEventListener('keyup', function (event) {
        // If  ESC key was pressed...
        if (event.keyCode === 27) {
          self.cancel()
        }
      })
    },
  }
  export default CheckinDialogComponent
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
