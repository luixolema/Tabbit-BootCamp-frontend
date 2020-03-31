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
      <v-simple-table
        :height="height"
        :fixed-header="true"
      >
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Date
              </th>
              <th class="text-left">
                Activitiy Id
              </th>
              <th class="text-left">
                Type
              </th>
              <th class="text-left">
                Title
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="activity in dummyData"
              :key="activity.id"
            >
              <td>{{ activity.date }}</td>
              <td>{{ activity.id }}</td>
              <td>{{ activity.type }}</td>
              <td>{{ activity.title }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
  const dummyData = [
    { id: 1, date: '20.02.2020', type: 'Test type', title: 'Test title' },
    { id: 2, date: '20.01.2020', type: 'Test type2', title: 'Test title2' },
    { id: 3, date: '03.01.2020', type: 'Test type3', title: 'Test title3' },
    { id: 4, date: '01.01.2020', type: 'Test type4', title: 'Test title4' },
  ]

  const StayDetailsComponent = {
    data: function () {
      return {
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
