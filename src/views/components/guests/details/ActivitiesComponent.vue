<template>
  <div>
    <div class="d-flex flex-row justify-space-between">
      <h5>
        Activities
      </h5>
      <v-btn
        class="my-0 align-self-end"
        x-small
      >
        Add
        <v-icon
          right
          dark
          size="15"
        >
          mdi-plus
        </v-icon>
      </v-btn>
    </div>
    <v-card>
      <!-- Table -->
      <v-data-table
        dense
        :headers="headers"
        :items="dummyData"
        hide-default-footer
        item-key="id"
      />
    </v-card>
  </div>
</template>

<script>
  const headers = [
    { text: 'Date', value: 'date' },
    { text: 'Activitiy Id', value: 'id' },
    { text: 'Type', value: 'type' },
    { text: 'Title', value: 'title' },
  ]
  const dummyData = [
    { id: 1, date: '20.02.2020', type: 'Test type', title: 'Test title' },
    { id: 2, date: '20.01.2020', type: 'Test type2', title: 'Test title2' },
    { id: 3, date: '03.01.2020', type: 'Test type3', title: 'Test title3' },
    { id: 4, date: '01.01.2020', type: 'Test type4', title: 'Test title4' },
  ]

  const StayDetailsComponent = {
    data: function () {
      return {
        headers,
        height: '200px',
        dummyData,
      }
    },
    props: {
      activities: Array,
    },
  }

  export default StayDetailsComponent
</script>

<style>
</style>
