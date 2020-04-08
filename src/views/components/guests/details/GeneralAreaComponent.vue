<template>
  <div class="my-0">
    <v-row>
      <v-col
        class="py-0"
        cols="12"
        md="6"
        lg="6"
      >
        <v-row>
          <v-col
            class="py-0"
            cols="12"
          >
            <guest-personal-details-component
              :headers="headers"
              :guest-personal-details="guestPersonalDetails"
            />
          </v-col>
          <div style="margin:1vh" />
          <v-col
            class="py-0"
            cols="12"
          >
            <stay-details-component
              :headers="headers"
              :stay-details="stayDetails"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        md="6"
        lg="6"
        class="py-0"
      >
        <equipment-component />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        class="mt-1 mb-0 pb-0"
      >
        <activities-component />
      </v-col>
    </v-row>
  </div>
</template>

<script>

  import GuestPersonalDetailsComponent from '@/views/components/guests/details/personal/GuestPersonalDetailsComponent'
  import StayDetailsComponent from '@/views/components/guests/details/stay/StayDetailsComponent'
  import EquipmentComponent from '@/views/components/guests/details/equipment/EquipmentComponent'
  import ActivitiesComponent from '@/views/components/guests/details/activity/ActivitiesComponent'

  export default {
    name: 'GeneralAreaComponent',
    components: {
      GuestPersonalDetailsComponent,
      StayDetailsComponent,
      EquipmentComponent,
      ActivitiesComponent,
    },
    props: {
      guestPersonalDetails: {
        type: Object,
        default: () => ({}),
      },
      stayDetails: {
        type: Object,
        default: () => ({}),
      },
    },
    data: () => {
      return {
        headers: [
          { text: 'Key', value: 'key', sortable: false, width: '120' },
          { text: 'Value', value: 'value', sortable: false },
        ],
      }
    },
    computed: {
      profile () {
        return {
          title: this.$t('guestOverview'),
        }
      },
    },
    mounted () {
      this.test()
    },
    methods: {
      test () {
      },
    },
  }
</script>

<style>
</style>
