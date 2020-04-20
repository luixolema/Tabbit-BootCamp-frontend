<template>
  <div>
    <base-material-card color="green">
      <template v-slot:heading>
        <div class="display-2  pt-1 font-weight-thin">
          {{ profile.title }}
        </div>
      </template>

      <v-card-text class="pb-0">
        <v-row>
          <v-col
            cols="8"
            sm="10"
            md="8"
            class="py-0"
          >
            <v-radio-group
              v-model="filterBYCheckedIn"
              class="mt-0"
              @change="filterByCheckin"
            >
              <v-radio
                class="my-0"
                label="All"
                value="all"
              />
              <v-radio
                class="my-0"
                label="Checked In"
                value="checkedIn"
              />
              <v-radio
                class="my-0"
                label="Not Checked In"
                value="notCheckedIn"
              />
            </v-radio-group>
          </v-col>
          <v-col
            cols="4"
            sm="2"
            md="4"
            class="py-0"
          >
            <v-btn
              block
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
              block
              small
              :disabled="!noCheckedinGuestIsSelected"
              @click="openCheckinDialog"
            >
              Check In
              <v-icon
                right
                dark
              >
                mdi-account-check
              </v-icon>
            </v-btn>
            <checkin-dialog-component
              ref="checkinDialog"
              @onSave="checkInSelectedGuest"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <!-- Guest Table -->
      <v-data-table
        dense
        :headers="headers"
        :items="guests"
        hide-default-footer
        disable-pagination
        height="73vh"
        item-key="id"
        fixed-header
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
              {{ item.boxNumber }}
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
  </div>
</template>

<script>
  import GuestService from '@/services/GuestService'
  import NotificationService from '@/services/NotificationService'
  import CheckinDialogComponent from '@/views/components/guests/overview/CheckinDialogComponent'

  const headers = [
    { text: 'Id', value: 'id' },
    { text: 'Name', value: 'firstName' },
    { text: 'Last Name', value: 'lastName' },
    { text: 'Box', value: 'boxNumber' },
    { text: 'Checked In', value: 'checkedin', align: 'center' },
  ]

  export default {
    name: 'GuestOverviewComponent',
    components: {
      CheckinDialogComponent,
    },
    data: () => {
      return {
        guests: [],
        headers,
        filterBYCheckedIn: 'all',
        isOpenCheckinDialog: false,
      }
    },
    computed: {
      noCheckedinGuestIsSelected: function () {
        if (this.selectedGuest !== undefined) {
          return this.selectedGuest.checkedin === false
        }

        return false
      },
      selectedGuest () {
        return this.$store.state.guestModule.selectedGuest
      },
      profile () {
        return {
          title: this.$t('guestOverview'),
        }
      },
    },
    mounted () {
      this.loadAllGuests()
    },
    beforeDestroy () {
      this.$store.commit('guestModule/removeSelectedGuest')
      this.$store.commit('stayModule/removeStayData')
    },
    methods: {
      loadAllGuests () {
        GuestService.findAll()
          .then(response => {
            this.guests = response.data.guests
            this.$store.commit('guestModule/removeSelectedGuest')
          }).catch(error => {
            NotificationService.error(null, error)
          })
      },
      filterByCheckin () {
        if (this.filterBYCheckedIn === 'all') {
          this.loadAllGuests()
        } else {
          const checkedIn = this.filterBYCheckedIn === 'checkedIn' ? 1 : 0
          GuestService.findByCheckin(checkedIn)
            .then(response => {
              this.guests = response.data.guests
              this.$store.commit('guestModule/removeSelectedGuest')
            }).catch(error => {
              NotificationService.error(null, error)
            })
        }
      },
      openCheckinDialog () {
        this.$refs.checkinDialog.open()
      },
      closeCheckinDialog () {
        this.$refs.checkinDialog.cancel()
      },
      checkInSelectedGuest (stayDto) {
        this.closeCheckinDialog()
        alert('Saved!!')
      },
      selectGuest (guest) {
        this.$store.commit('guestModule/setSelectedGuest', guest)
      },
    },
  }
</script>

<style>
</style>
