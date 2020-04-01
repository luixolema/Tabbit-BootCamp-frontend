<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-row>
          <!-- Stay selection -->
          <v-combobox
            v-model="selectedStay"
            class="pl-4 pr-4"
            :items="staysOptions"
            item-text="description"
            item-value="id"
            @change="selectStay"
          />
          <v-btn
            small
            :disabled="disableBill"
          >
            Bill
            <v-icon
              right
              dark
            >
              mdi-currency-eur
            </v-icon>
          </v-btn>

          <v-btn
            small
            :disabled="disableCheckOut"
          >
            Checkout
            <v-icon
              right
              dark
            >
              mdi-text-box-check-outline
            </v-icon>
          </v-btn>
        </v-row>
        <general-area-component
          :guest-personal-details="guestPersonalDetails"
          :stay-details="stayDetails"
        />
        <!-- Example to pass info to another component -->
        <!-- <activities-ifo :guest="selectedStay.activities"> -->
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>

  import GeneralAreaComponent from '@/views/components/guests/details/GeneralAreaComponent'
  import GuestService from '@/services/GuestService'
  import NotificationService from '@/services/NotificationService'
  import StayService from '@/services/StayService'

  export default {
    components: {
      GeneralAreaComponent,
    },
    data: () => {
      return {
        selectedStay: null,
        guestInfo: { stays: [] },
        staysOptions: [],
        guestPersonalDetails: {},
        stayDetails: {},
      }
    },
    computed: {
      guest () {
        const selectedGuest = this.$store.state.guestModule.selectedGuest
        return selectedGuest
      },
      profile () {
        return {
          title: this.$t('guestDetail'),
        }
      },
      disableBill () {
        if (this.guest) {
          return false
        }
        return true
      },
      disableCheckOut () {
        return true
      },
    },
    watch: {
      guest () {
        const selectedGuest = this.$store.state.guestModule.selectedGuest
        if (selectedGuest) {
          GuestService.getGuestInfo(selectedGuest.id)
            .then((response) => {
              this.guestInfo = response.data
              this.guestPersonalDetails = this.guestInfo.stayDto.guestPersonalDetails
              this.stayDetails = this.guestInfo.stayDto.stayDetails || {}
              this.buildStaysOptions()
            })
            .catch((error) => {
              NotificationService.error(error.message)
            })
        }
      },
    },
    methods: {
      selectStay (selectedStay) {
        if (selectedStay.id !== null) {
          StayService.findById(selectedStay.id)
            .then((response) => {
              this.guestPersonalDetails = response.data.guestPersonalDetails
              this.stayDetails = response.data.stayDetails
            })
            .catch((error) => {
              NotificationService.error(error.message)
            })
        } else {
          this.stayDetails = {}
        }
      },
      buildStaysOptions () {
        this.staysOptions = this.guestInfo.staySummaries.map((stay) => {
          return {
            id: stay.id,
            description: stay.description || (stay.checkInDate + ' - ' + stay.checkOutDate),
          }
        })

        if (!this.guest.checkedin) {
          this.staysOptions.unshift({ id: null, description: 'None' })
        }

        this.selectedStay = this.staysOptions[0]
      },
    },
  }
</script>

<style>
</style>
