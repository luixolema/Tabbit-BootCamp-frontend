<template>
  <div>
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
          :disable-for-hystorical-data="disableForHystoricalData"
          :selected-stay="selectedStay"
          @update-error="selectStay(selectedStay)"
        />
        <!-- Example to pass info to another component -->
        <!-- <activities-ifo :guest="selectedStay.activities"> -->
      </v-card-text>
    </v-card>
  </div>
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
        staysOptions: [],
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
      disableForHystoricalData () {
        if (!this.guest) {
          return true
        }
        if (this.selectedStay) {
          return !this.selectedStay.active
        }
        return true
      },
    },
    watch: {
      guest () {
        const selectedGuest = this.$store.state.guestModule.selectedGuest
        if (selectedGuest) {
          GuestService.getGuestInfo(selectedGuest.id)
            .then((response) => {
              const guestInfo = response.data
              const stayData = guestInfo.stayDto
              stayData.stayDetails = guestInfo.stayDto.stayDetails || {}
              stayData.loanDetails = guestInfo.stayDto.loanDetails || []
              this.$store.commit('stayModule/setStayData', stayData)
              this.buildStaysOptions(guestInfo.staySummaries)
            })
            .catch((error) => {
              NotificationService.error(error.message)
            })
        } else {
          this.selectedStay = null
          this.staysOptions = []
          this.$store.commit('stayModule/removeStayData')
        }
      },
    },
    methods: {
      selectStay (selectedStay) {
        console.log('selecting')
        if (selectedStay.id !== null) {
          StayService.findById(selectedStay.id)
            .then((response) => {
              this.$store.commit('stayModule/setStayData', response.data)
            })
            .catch((error) => {
              NotificationService.error(error.message)
            })
        } else {
          const stayData = { ...this.$store.state.stayModule.stayData }
          stayData.stayDetails = {}
          this.$store.commit('stayModule/setStayData', stayData)
        }
      },
      buildStaysOptions (staySummaries) {
        this.staysOptions = staySummaries.map((stay) => {
          return {
            id: stay.id,
            active: stay.active,
            description: stay.description || (stay.arriveDate + ' - ' + stay.leaveDate),
          }
        })

        if (!this.guest.checkedin) {
          this.staysOptions.unshift({ id: null, active: null, description: '' })
        }

        this.selectedStay = this.staysOptions[0]
      },
    },
  }
</script>

<style>
</style>
