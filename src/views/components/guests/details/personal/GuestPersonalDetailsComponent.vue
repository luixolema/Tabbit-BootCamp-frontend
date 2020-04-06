<template>
  <div>
    <v-row>
      <v-col
        class="py-0"
        cols="8"
      >
        <h5 class="display-2  font-weight-bold pt-1">
          Details
        </h5>
      </v-col>
      <v-col
        class="py-0"
        cols="4"
      >
        <v-btn
          color="success"
          class="my-2"
          x-small
          block
          :disabled="disableDelete"
        >
          Delete
          <v-icon
            right
            dark
            size="15"
          >
            mdi-close-thick
          </v-icon>
        </v-btn>
      </v-col>

      <v-col
        class="py-0"
        cols="12"
      >
        <v-card
          class="my-0 "
          style="margin-top:1vh"
        >
          <v-data-table
            height="24vh"
            :headers="headers"
            :items="tableItems"
            :hide-default-footer="true"
            :disable-pagination="true"
            :fixed-header="true"
          >
            <template v-slot:item.value="props">
              <base-edit-dialog
                :return-value.sync="props.item.value"
                :disable-enter="isEditTextDisabled"
                @save="saveField(props.item)"
                @open="openEditableData()"
              >
                {{ props.item.value }}
                <template v-slot:input>
                  <v-text-field
                    v-if="props.item.type==='text'"
                    v-model="props.item.value"
                    :label="props.item.key"
                    single-line
                    :rules="[rules.required]"
                    maxlength="400"
                    counter
                    @keydown="validateText(props.item.value)"
                  />
                  <base-edit-date-field
                    v-if="props.item.type==='date'"
                    :date="props.item.value"
                    :label="props.item.key"
                    :property="props.item.property"
                    @validate-field="editDateFieldAction"
                  />
                  <v-text-field
                    v-if="props.item.type==='number'"
                    v-model="props.item.value"
                    single-line
                    type="number"
                    :rules="[rules.required, rules.nonNegative]"
                    @keydown="validateNumber(props.item.value)"
                  />
                  <v-text-field
                    v-if="props.item.type==='email'"
                    v-model="props.item.value"
                    :label="props.item.key"
                    :rules="[rules.required, rules.email]"
                    single-line
                    @keydown="validateEmail(props.item.value)"
                  />
                </template>
              </base-edit-dialog>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    name: 'GuestPersonalDetailsComponent',
    props: {
      guestPersonalDetails: {
        type: Object,
        default: () => ({}),
      },
      headers: {
        type: Array,
        default: () => ([]),
      },
    },
    data: () => {
      return {
        propertiesSpecification: {
          firstName: { name: 'First Name', type: 'text' },
          lastName: { name: 'Last Name', type: 'text' },
          birthDate: { name: 'Birthdate', type: 'date' },
          nationality: { name: 'Nationality', type: 'text' },
          country: { name: 'Country', type: 'text' },
          city: { name: 'City', type: 'text' },
          postcode: { name: 'Postcode', type: 'text' },
          street: { name: 'Street', type: 'text' },
          email: { name: 'Email', type: 'email' },
          phone: { name: 'Phone', type: 'number' },
          passportId: { name: 'PassportId', type: 'text' },
        },
        isEditTextDisabled: false,
        validationMessage: '',
        rules: {
          required: value => !!value || 'Required.',
          counter: value => value.length <= 20 || 'Max 20 characters',
          nonNegative: value => value >= 0 || 'The number can not be negative',
          validDate: value => {
            const pattern = /^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])$/
            return pattern.test(value) || 'Invalid Date'
          },
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail'
          },
        },
      }
    },
    computed: {
      disableDelete () {
        const selectedGuest = this.$store.state.guestModule.selectedGuest
        return selectedGuest === undefined
      },
      tableItems () {
        if (this.guestPersonalDetails == null) {
          return
        }

        const items = []
        const propertiesGuestPersonalDetails = Object.keys(this.guestPersonalDetails)

        propertiesGuestPersonalDetails.forEach(property => {
          const value = this.guestPersonalDetails[property]
          const type = this.propertiesSpecification[property].type
          const key = this.propertiesSpecification[property].name

          items.push({
            property: property,
            key: key,
            type: type,
            value: value,
          })
        })

        return items
      },
    },
    methods: {
      saveField (item) {
        this.guestPersonalDetails[item.property] = item.value
        console.log(this.guestPersonalDetails)
      },
      openEditableData () {
      },
      germanTimeStringtoIsoString (germanTimeString) {
        var parts = germanTimeString.match(/(\d+)/g)
        return new Date(parts[2], parts[1] - 1, parts[0]).toISOString().substr(0, 10)
      },
      IsoStringtoGermanTimeString (isoDateString) {
        var parts = isoDateString.match(/(\d+)/g)
        return parts[0] + '.' + parts[1] + '.' + parts[2]
      },
      validateEmail (emailString) {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        this.isEditTextDisabled = !(pattern.test(emailString))
      },
      validateNumber (number) {
        this.isEditTextDisabled = number < 0 || number.length === 0
      },
      validateText (text) {
        this.isEditTextDisabled = text.length === 0
      },
      editDateFieldAction (isEditTextDisabledParam, property, value) {
        this.isEditTextDisabled = isEditTextDisabledParam
        if (!this.isEditTextDisabled) {
          this.guestPersonalDetails[property] = value
        }
      },
    },
  }
</script>

<style>
</style>
