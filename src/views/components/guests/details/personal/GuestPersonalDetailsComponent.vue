<template>
  <div>
    <v-row>
      <v-col
        class="py-0"
        cols="8"
      >
        <h5 class="display-2 pt-1">
          Details
        </h5>
      </v-col>
      <v-col
        class="py-0"
        cols="4"
      >
        <v-btn
          class="my-2"
          x-small
          block
        >
          Delete
          <v-icon
            right
            dark
            size="15"
          >
            mdi-close-thick
          </v-icon>
        </v-btn>
      </v-col>

      <v-col
        class="py-0"
        cols="12"
      >
        <v-data-table
          :headers="headers"
          height="20vh"
          :items="guestPersonalDetailsData"
          :disable-pagination="true"
          hide-default-footer
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>

  export default {
    name: 'GuestPersonalDetailsComponent',
    props: {
      headers: {
        type: Array,
        default: function () {
          return []
        },
      },
      guestPersonalDetailsData: {
        type: Array,
        default: function () {
          return []
        },
      },
    },
    data: () => {
      return {
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
