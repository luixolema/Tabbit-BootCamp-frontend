<template>
  <v-card class="my-0">
    <base-editable-data-table
      :headers="headers"
      :table-items="stayDetailTableItems"
      @item-updated="updateField"
    />
  </v-card>
</template>

<script>
  export default {
    name: 'StayDetailsComponent',
    props: {
      stayDetails: {
        type: Object,
        default: () => ({}),
      },
      headers: {
        type: Array,
        default: () => ([]),
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
              {
                value: 'null',
                text: 'Maybe',
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
              {
                value: 'null',
                text: 'Maybe',
              },
            ],
          },
          preBoocking: { name: 'Pre Booking', type: 'fixed' },
        },
        date: '',
      }
    },
    computed: {
      stayDetailTableItems () {
        if (!this.stayDetails) { return }

        const items = []

        Object.keys(this.propertiesSpecification).forEach(property => {
          if (!Object.prototype.hasOwnProperty.call(this.stayDetails, property)) { return }

          items.push({
            property: property,
            key: this.propertiesSpecification[property].name,
            type: this.propertiesSpecification[property].type,
            value: this.stayDetails[property] + '',
            options: this.propertiesSpecification[property].options,
          })
        })

        return items
      },
    },
    methods: {
      updateField (property, value) {
        this.stayDetails[property] = value
        console.log(this.stayDetails)
      },
    },
  }
</script>
