<template>
  <div>
    <v-row>
      <v-col
        class="py-0"
        cols="10"
      >
        <h5 class="display-2   pt-1">
          Activities
        </h5>
      </v-col>
      <v-col
        class="py-0"
        cols="2"
      >
        <v-btn
          class="my-2"
          x-small
          block
          :disabled="disableForHystoricalData"
        >
          Add
          <v-icon
            right
            dark
            size="15"
          >
            mdi-plus
          </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12 py-0">
        <!-- Table -->
        <v-card class="my-0">
          <v-data-table
            height="22vh"
            fixed-header
            :headers="headers"
            :items="dummyData"
            hide-default-footer
            disable-pagination
          />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>

  export default {
    name: 'ActivitiesComponent',
    props: {
      activities: {
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
        dummyData: [
          { id: 1, date: '20.02.2020', type: 'Test type', title: 'Test title' },
          { id: 2, date: '20.01.2020', type: 'Test type2', title: 'Test title2' },
          { id: 3, date: '03.01.2020', type: 'Test type3', title: 'Test title3' },
          { id: 4, date: '01.01.2020', type: 'Test type4', title: 'Test title4' },
        ],
        headers: [
          { text: 'Date', value: 'date' },
          { text: 'ActivityId', value: 'activity_id' },
          { text: 'Type', value: 'type' },
          { text: 'Title', value: 'title' },
        ],
      }
    },
<<<<<<< HEAD
    computed: {
      disableAdd () {
        const selectedGuest = this.$store.state.guestModule.selectedGuest
        if (selectedGuest !== undefined) {
          return selectedGuest.checkedin === false
        } else {
          return true
        }
      },
    },
=======
>>>>>>> #DCM2-14 #DCM2-81 Disable hystorical data editing
  }

</script>

<style>
</style>
