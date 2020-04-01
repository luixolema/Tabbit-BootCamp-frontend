<template>
  <div>
    <v-row>
      <v-col
        class="py-0"
        cols="8"
      >
        <h5 class="display-2 pt-1">
          Equipment
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
          Add
          <v-icon
            right
            dark
            size="15"
          >
            mdi-plus
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-card class="my-0">
      <!-- Table -->
      <v-simple-table
        height="44vh"
        :fixed-header="true"
      >
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Key
              </th>
              <th class="text-left">
                ID
              </th>
              <th class="text-left">
                Date Out
              </th>
              <th class="text-left">
                Date Return
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="equipment in dummyData"
              :key="equipment.id"
            >
              <td>{{ equipment.type }}</td>
              <td>{{ equipment.id }}</td>
              <td>{{ equipment.dateOut }}</td>
              <td>{{ equipment.dateReturn }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
  const dummyData = [{ id: 'XD_S_255', type: 'Suite', dateOut: '15.09.2019', dateReturn: null },
                     { id: 'XD_F_547', type: 'Fins', dateOut: '15.09.2019', dateReturn: '20.09.2019' },
                     { id: 'XD_M_17', type: 'Mask', dateOut: '15.09.2019', dateReturn: '20.09.2019' }]
  const EquipmentComponent = {
    data: function () {
      return {
        height: '350px',
        dummyData,
      }
    },
    props: {
      equipments: Array,
    },
  }

  export default EquipmentComponent
</script>

<style>
    .highlight {
        background-color: #EEEEEE
    }
</style>
