<template>
  <v-dialog
    v-model="dialog"
    width="800"
  >
    <template v-slot:activator="{ }">
      <v-btn
        small
        :disabled="!enableBill"
        @click="openDialog"
      >
        Bill
        <v-icon
          right
          dark
        >
          mdi-currency-eur
        </v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title
        primary-title
      >
        Bill OverView
      </v-card-title>
      <v-card-text>
        <h5>Invoice, #342343_mock</h5>

        <ul
          style="list-style-type:none"
          class="my-3"
        >
          <li>{{ guestPersonalDetails.firstName }} {{ guestPersonalDetails.firstName }} </li>
          <li>{{ guestPersonalDetails.street }}</li>
          <li> {{ guestPersonalDetails.postcode }} {{ guestPersonalDetails.city }}</li>
          <li> {{ guestPersonalDetails.country }}</li>
        </ul>

        <v-simple-table class="my-3">
          <template v-slot:default>
            <tbody>
              <tr>
                <td>Stay</td>
                <td>{{ stayDetails.arriveDate }} - {{ stayDetails.leaveDate }}</td>
              </tr>
              <tr>
                <td>Check In</td>
                <td>{{ stayDetails.checkInDate }}</td>
              </tr>
              <tr>
                <td>Check Out</td>
                <td>{{ stayDetails.checkOutDate }}</td>
              </tr>
              <tr>
                <td>Box</td>
                <td>{{ stayDetails.boxNumber }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>

        <v-data-table
          class="my-3"
          dense
          :headers="activitiesTableHeaders"
          :items="stayActivities"
          hide-default-footer
          item-key="id"
        />

        <div class="flex-row">
          <h5 class="text-right">
            Total: € {{ totalPrice }}
          </h5>
        </div>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-btn
          color="primary"
          :disabled="!previosStayId"
          @click="changeStay(previosStayId)"
        >
          Previus
        </v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          :disabled="!nextStayId"
          @click="changeStay(nextStayId)"
        >
          Next
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import StayService from '@/services/StayService'
  import NotificationService from '@/services/NotificationService'

  const activitiesTableHeaders = [
    { text: 'Pos', value: 'pos' },
    { text: 'Activity Type', value: 'type' },
    { text: 'Date', value: 'date' },
    { text: 'Price', value: 'price' },
  ]

  const BillComponent = {
    props: {
      possibleStays: {
        type: Array,
        default: () => ([]),
      },
      selectedStay: {
        type: Object,
        default: () => ({}),
      },
    },
    data: () => ({
      dialog: false,
      loading: true,
      guestPersonalDetails: {},
      stayDetails: {},
      stayActivities: [],
    }),
    methods: {
      openDialog () {
        this.dialog = true
        this.loading = true

        StayService.findById(this.selectedStay.id)
          .then((response) => {
            this.guestPersonalDetails = response.data.guestPersonalDetails
            this.stayDetails = response.data.stayDetails
            this.stayActivities = response.data.activities
          })
          .catch((error) => {
            NotificationService.error(error.message)
          })
          .finally(() => {
            this.loading = false
          })
      },
      changeStay (stayId) {
        this.loading = true

        StayService.findById(stayId)
          .then((response) => {
            this.guestPersonalDetails = response.data.guestPersonalDetails
            this.stayDetails = response.data.stayDetails
            this.stayActivities = response.data.activities
          })
          .catch((error) => {
            NotificationService.error(error.message)
          })
          .finally(() => {
            this.loading = false
          })
      },
    },
    computed: {
      enableBill () {
        if (this.selectedStay != null && this.selectedStay.id) {
          return true
        }

        return false
      },
      currentStayIndex () {
        const currentStay = this.stayDetails
        return this.possibleStays.findIndex((element) => element.id === currentStay.id)
      },
      nextStayId () {
        if (!this.possibleStays.length) {
          return null
        }

        const nextIndex = this.currentStayIndex + 1

        if (nextIndex < this.possibleStays.length) {
          return this.possibleStays[nextIndex].id
        }

        return null
      },
      previosStayId () {
        if (!this.possibleStays.length) {
          return null
        }

        const previousIndex = this.currentStayIndex - 1

        if (previousIndex >= 0) {
          return this.possibleStays[previousIndex].id
        }

        return null
      },
      activitiesTableHeaders () {
        return activitiesTableHeaders
      },
      totalPrice () {
        let total = 0

        this.stayActivities.forEach(activity => {
          total += activity.price
        })

        return total.toFixed(2)
      },
    },
  }

  export default BillComponent
</script>

<style>

</style>
