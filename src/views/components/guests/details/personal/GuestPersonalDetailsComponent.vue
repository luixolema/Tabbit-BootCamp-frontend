<template>
  <div>
    <v-row>
      <v-col
        class="py-0"
        cols="8"
      >
        <h5 class="display-2 pt-1">
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
            :disable-edit="disableEditingPersonalDetails"
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
      selectedStay: {
        type: Object,
        default: () => ({}),
      },
    },
    data: () => {
      return {
        propertiesSpecification: {
          id: { name: 'Id', type: 'fixed' },
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
      }
    },
    computed: {
      disableDelete () {
        const selectedGuest = this.$store.state.guestModule.selectedGuest
        return selectedGuest === undefined
      },
      disableEditingPersonalDetails () {
        const selectedGuest = this.$store.state.guestModule.selectedGuest
        if (selectedGuest === undefined) {
          return true
        }
        if (this.selectedStay) {
          if (this.selectedStay.active === null) {
            return false
          } else {
            return !this.selectedStay.active
          }
        }
        return false
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
