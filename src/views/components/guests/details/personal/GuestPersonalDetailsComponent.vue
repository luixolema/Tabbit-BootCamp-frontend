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

  import GuestService from '@/services/GuestService'
  import NotificationService from '@/services/NotificationService'
  import StayService from '@/services/StayService'

  export default {
    name: 'GuestPersonalDetailsComponent',
    props: {
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
        var guestPersonalDetails
        if (this.$store.state.stayModule.stayData) {
          guestPersonalDetails = this.$store.state.stayModule.stayData.guestPersonalDetails
        }
        if (guestPersonalDetails == null) { return }

        const items = []

        Object.keys(this.propertiesSpecification).forEach(property => {
          if (!Object.prototype.hasOwnProperty.call(guestPersonalDetails, property)) { return }

          items.push({
            property: property,
            key: this.propertiesSpecification[property].name,
            type: this.propertiesSpecification[property].type,
            value: guestPersonalDetails[property] + '',
          })
        })

        return items
      },
    },
    methods: {
      updateField (property, value) {
        const stayData = { ...this.$store.state.stayModule.stayData }
        stayData.guestPersonalDetails[property] = value
        const guest = { ...this.$store.state.guestModule.selectedGuest }
        if (guest.checkedin) {
          StayService.updateStay(this.$store.state.stayModule.stayData).then((response) => {
            this.$store.commit('stayModule/setStayData', stayData)
          })
            .catch((error) => {
              NotificationService.error(error.message)
            })
        } else {
          GuestService.updateGuest(this.$store.state.stayModule.stayData.guestPersonalDetails).then((response) => {
            this.$store.commit('stayModule/setStayData', stayData)
          })
            .catch((error) => {
              NotificationService.error(error.message)
            })
        }
        guest.firstName = stayData.guestPersonalDetails.firstName
        guest.lastName = stayData.guestPersonalDetails.lastName
        guest.boxNumber = stayData.stayDetails.boxNumber
        this.$store.commit('guestModule/updateSelectedGuest', guest)
      },
    },
  }
</script>

<style>
</style>
