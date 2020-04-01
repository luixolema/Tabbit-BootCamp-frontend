<template>
  <div class="mt-4">
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
              :guest-personal-details-data="guestPersonalDetailsData"
            />
          </v-col>
          <v-col
            class="py-0"
            cols="12"
          >
            <stay-details-component />
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
        class="py-0"
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
    data: () => {
      return {
        headers: [
          { text: 'Key', value: 'key' },
          { text: 'Value', value: 'value' },
        ],
        guestPersonalDetailsData: [
          { key: 'First name', value: 'Andrey' }, // mocked data
          { key: 'Last name', value: 'Sapozhkov' },
          { key: 'address', value: 'Willy brandt alle 14' }, // mocked data
          { key: 'telephone', value: '01765892534' },
          { key: 'passport', value: 'AB89652' }, // mocked data
          { key: 'MEdical Thing', value: 'yes' },
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
