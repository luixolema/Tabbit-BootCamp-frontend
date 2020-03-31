<template>
  <div>
    <v-row>
      <v-col
        cols="8"
      >
        <h5 class="headline">
          Details
        </h5>
      </v-col>
      <v-col
        cols="4"
      >
        <v-btn
          class="my-1"
          x-small
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

      <v-col cols="12">
        <v-data-table
          :headers="headers"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>

  export default {
    name: 'GuestPersonalDetailsComponent',
    props: ['headers'],
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
