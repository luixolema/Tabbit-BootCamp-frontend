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
          <base-editable-data-table
            :headers="headers"
            :table-items="guestPersonalDetailTableItems"
            @item-updated="updateField"
          />
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
          phone: { name: 'Phone', type: 'text' },
          passportId: { name: 'PassportId', type: 'text' },
        },
        pressEnterDisabled: true,
        validationMessage: '',
        rules: {
          required: value => !!value.trim() || 'Required.',
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
      guestPersonalDetailTableItems () {
        if (this.guestPersonalDetails == null) { return }

        const items = []

        Object.keys(this.propertiesSpecification).forEach(property => {
          if (!Object.prototype.hasOwnProperty.call(this.guestPersonalDetails, property)) { return }

          items.push({
            property: property,
            key: this.propertiesSpecification[property].name,
            type: this.propertiesSpecification[property].type,
            value: this.guestPersonalDetails[property] + '',
          })
        })

        return items
      },
    },
    methods: {
      updateField (property, value) {
        this.guestPersonalDetails[property] = value
        console.log(this.guestPersonalDetails)
      },
    },
  }
</script>

<style>
</style>
