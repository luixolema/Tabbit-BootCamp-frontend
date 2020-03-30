<template>
  <v-container>
    <base-material-card color="green">
      <template v-slot:heading>
        <div class="display-2 font-weight-thin">
          Guests Overview
        </div>
      </template>

      <v-card-text>
        <v-row>
          <v-col
            cols="6"
            class="py-0"
          >
            <v-radio-group
              v-model="filterBYCheckedIn"
              class="mt-0"
              @change="filterByCheckin"
            >
              <v-radio
                id="allFilter"
                label="All"
                value="all"
              />
              <v-radio
                id="checkedInFilter"
                label="Checked in"
                value="true"
              />
              <v-radio
                id="noCheckedInFilter"
                label="Not Checked in"
                value="flase"
              />
            </v-radio-group>
          </v-col>
          <v-col
            cols="6"
            class="py-0"
          >
            <v-btn
              small
            >
              Add
              <v-icon
                right
                dark
              >
                mdi-account-plus
              </v-icon>
            </v-btn>
            <v-btn
              :disabled="!noCheckedinGuestIsSelected"
              small
              @click="checkInSelectedGuest"
            >
              Check In
              <v-icon
                right
                dark
              >
                mdi-account-check
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <!-- Guest Table -->
      <v-data-table
        dense
        :headers="headers"
        :items="guests"
        hide-default-footer
        item-key="id"
      >
        <template v-slot:item="{ item }">
          <tr
            class="cursor-pointer"
            :class="{active: selectedGuest && selectedGuest.id === item.id}"
            @click="selectGuest(item)"
          >
            <td>
              {{ item.id }}
            </td>
            <td>
              {{ item.firstName }}
            </td>
            <td>
              {{ item.lastName }}
            </td>
            <td>
              {{ item.boxId }}
            </td>
            <td
              class="text-center"
            >
              <div v-if="item.checkedin">
                <v-icon>mdi-check-bold</v-icon>
              </div>
              <div v-else>
                <v-icon>mdi-close-thick </v-icon>
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>
  import GuestService from '@/services/GuestService'
  import NotificationService from '@/services/NotificationService'

  const headers = [
    { text: 'Id', value: 'id' },
    { text: 'Name', value: 'firstName' },
    { text: 'Last Name', value: 'lastName' },
    { text: 'Box', value: 'boxId' },
    { text: 'Checked-in', value: 'checkedin', align: 'center' },
  ]

  const GuestOverviewComponent = {
    name: 'GuestOverviewComponent',
    data: () => {
      return {
        guests: [],
        headers,
        filterBYCheckedIn: 'all',
        selectedGuest: undefined,
      }
    },
    computed: {
      noCheckedinGuestIsSelected: function () {
        if (this.selectedGuest !== undefined) {
          return this.selectedGuest.checkedin === false
        }

        return false
      },
    },
    mounted () {
      this.loadAllGuests()
    },
    methods: {
      loadAllGuests () {
        GuestService.findAll()
          .then(response => {
            this.guests = response.data.guests
            this.selectedGuest = undefined
          }).catch(error => {
            NotificationService.error(null, error)
          })
      },
      filterByCheckin () {
        if (this.filterBYCheckedIn === 'all') {
          this.loadAllGuests()
        } else {
          const checkedIn = this.filterBYCheckedIn === 'true' ? 1 : 0
          GuestService.findByCheckin(checkedIn)
            .then(response => {
              this.guests = response.data.guests
              this.selectedGuest = undefined
            }).catch(error => {
              NotificationService.error(null, error)
            })
        }
      },
      checkInSelectedGuest () {
        // if (!this.noCheckedinGuestIsSelected) {
        //   NotificationService.info('You should and only select NOT checked in guests')
        //   return
        // }

        // GuestService.checkInGuests(this.selectedGuest.id)
        //   .then(() => {
        //     NotificationService.sucess('The guest has been cheked-in correctly')
        //     this.selectedGuest.checkedin = true
        //     // we need to verify if the checkedin user its correctly shown in the table
        //   }).catch(error => {
        //     NotificationService.error(null, error)
        //   })
      },
      selectGuest (guest) {
        this.$store.commit('guestModule/setSelectedGuest', guest)
        this.selectedGuest = guest
      },
    },
  }

  export default GuestOverviewComponent
</script>

<style>
</style>
