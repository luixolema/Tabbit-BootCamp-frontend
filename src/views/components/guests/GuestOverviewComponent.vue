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
                label="All"
                value="all"
              />
              <v-radio
                label="Checked in"
                value="checkedIn"
              />
              <v-radio
                label="Checked out"
                value="checkedOut"
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
              :disabled="!isThereACheckedInSelectedGuest"
              small
              @click="checkInSelectedGuests"
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
        v-model="selected"
        dense
        :headers="headers"
        :items="guests"
        hide-default-footer
        item-key="id"
        show-select
      >
      <template
        v-slot:item.checkedIn="{ item }"
        >
        <div v-if="item.checkedIn">
          <v-icon>mdi-check-bold</v-icon>
        </div>
        <div v-else>
          <v-icon>mdi-close-thick </v-icon>
        </div>
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
    { text: 'Name', value: 'name' },
    { text: 'Last Name', value: 'lastName' },
    { text: 'Box', value: 'box' },
    { text: 'Checked-in', value: 'checkedIn' },
  ]

  export default {
    name: 'GuestOverviewComponent',
    data: () => {
      return {
        guests: [],
        headers,
        filterBYCheckedIn: 'all',
        selected: [],
      }
    },
    computed: {
      isThereACheckedInSelectedGuest: function () {
        let checkedInGuest
        if (this.selected.length) {
          checkedInGuest = this.selected.find(guest => guest.checkedIn === true)
        }
        return checkedInGuest === undefined
      },
    },
    mounted () {
      this.loadAllGuests()
    },
    methods: {
      loadAllGuests () {
        GuestService.findAll()
          .then(response => {
            this.guests = response.data
          }).catch(error => {
            NotificationService.error(null, error)
          }).finally(() => {
            this.selected = []
          })
      },
      filterByCheckin () {
        if (this.filterBYCheckedIn === 'all') {
          this.loadAllGuests()
        } else {
          const checkedIn = this.filterBYCheckedIn === 'checkedIn'
          GuestService.findByCheckin(!!checkedIn)
            .then(response => {
              this.guests = response.data
            }).catch(error => {
              NotificationService.error(null, error)
            }).finally(() => {
              this.selected = []
            })
        }
      },
      checkInSelectedGuests () {
        if (this.isThereACheckedInSelectedGuest) {
          NotificationService.info('You should and only select NOT checked in guests')
          return
        }
        const ids = this.selected.map(object => object.id)
        GuestService.checkInGuests(ids)
          .then(() => {
            this.selected = []
            NotificationService.sucess('The guest has been chekin correctly')
          }).catch(error => {
            NotificationService.error(null, error)
          }).finally(() => {
            this.selected = []
          })
      },
    },
  }
</script>

<style>
</style>