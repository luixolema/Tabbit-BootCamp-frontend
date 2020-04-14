<template>
  <v-card class="my-0">
    <base-editable-data-table
      :headers="headers"
      :table-items="stayDetailTableItems"
      :disable-edit="disableForHystoricalData"
      @item-updated="updateField"
    />
  </v-card>
</template>

<script>
  import NotificationService from '@/services/NotificationService'
  import StayService from '@/services/StayService'

  export default {
    name: 'StayDetailsComponent',
    props: {
      headers: {
        type: Array,
        default: () => ([]),
      },
      disableForHystoricalData: {
        type: Boolean,
        default: false,
      },
    },
    data: function () {
      return {
        propertiesSpecification: {
          boxNumber: { name: 'Box', type: 'text' },
          checkInDate: { name: 'Check In', type: 'date' },
          checkOutDate: { name: 'check Out', type: 'date' },
          arriveDate: { name: 'Arrival', type: 'date' },
          leaveDate: { name: 'Leave', type: 'date' },
          hotel: { name: 'Hotel', type: 'text' },
          room: { name: 'Room', type: 'text' },
          lastDiveDate: { name: 'Last Dive', type: 'date' },
          brevet: { name: 'Brevet', type: 'text' },
          divesAmount: { name: 'Number of Dives', type: 'number' },
          nitrox: {
            name: 'Nitrox',
            type: 'select',
            options: [
              {
                value: 'true',
                text: 'Yes',
              },
              {
                value: 'false',
                text: 'No',
              },
            ],
          },
          medicalStatement: {
            name: 'Medical Statement',
            type: 'select',
            options: [
              {
                value: 'true',
                text: 'Yes',
              },
              {
                value: 'false',
                text: 'No',
              },
            ],
          },
          preBoocking: { name: 'Pre Booking', type: 'text' },
        },
        date: '',
      }
    },
    computed: {
      stayDetailTableItems () {
        var stayDetails
        if (this.$store.state.stayModule.stayData) {
          stayDetails = this.$store.state.stayModule.stayData.stayDetails
        }
        if (!stayDetails) { return }

        const items = []

        Object.keys(this.propertiesSpecification).forEach(property => {
          if (!Object.prototype.hasOwnProperty.call(stayDetails, property)) { return }

          items.push({
            property: property,
            key: this.propertiesSpecification[property].name,
            type: this.propertiesSpecification[property].type,
            value: stayDetails[property] + '',
            options: this.propertiesSpecification[property].options,
          })
        })

        return items
      },
    },
    methods: {
      updateField (property, value) {
        const stayData = { ...this.$store.state.stayModule.stayData }
        stayData.stayDetails[property] = value
        StayService.updateStay(this.$store.state.stayModule.stayData).then((response) => {
          this.$store.commit('stayModule/setStayData', stayData)
        })
          .catch((error) => {
            NotificationService.error(error.message)
          })
        this.$store.commit('guestModule/updateSelectedGuest', stayData)
      },
    },
  }
</script>
