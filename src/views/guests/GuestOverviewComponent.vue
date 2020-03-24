<template>
  <v-card>
    <v-card-title>
      <h2>Guest Overview</h2>
    </v-card-title>

    <v-card-text>
      <!-- Radio Buttons and buttons -->

      <v-row>
        <v-col cols="6">
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
        <v-col cols="6">
          <v-btn>Add</v-btn>
          <v-btn @click="checkedInSelectedGuests">
            Check In
          </v-btn>
        </v-col>
      </v-row>

      <!-- Guest Table -->
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="guests"
        hide-default-footer
        item-key="id"
        show-select
      />
    </v-card-text>
  </v-card>
</template>

<script>
  import GuestService from '../../services/GuestService'
  import NotificationService from '../../services/NotificationService'

  const headers = [
    { text: 'Name', value: 'name' },
    { text: 'Last Name', value: 'lastName' },
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
    mounted () {
      this.loadAllGuests()
      console.log(process.env)
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
      checkedInSelectedGuests () {
        if (!this.selected.length) {
          NotificationService.info('You must select at least one guest')
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
