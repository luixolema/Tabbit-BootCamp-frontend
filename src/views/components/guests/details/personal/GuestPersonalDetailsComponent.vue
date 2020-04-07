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
          :disabled="disableDelete"
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
        <v-card
          class="my-0 "
          style="margin-top:1vh"
        >
          <!-- Table -->
          <v-simple-table
            height="24vh"
            :fixed-header="true"
          >
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Key
                  </th>
                  <th class="text-left">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Id</td>
                  <td>{{ guestPersonalDetails.id }}</td>
                </tr>
                <tr>
                  <td>First Name</td>
                  <td>
                    <text-inline-edit-component
                      :value="guestPersonalDetails.firstName"
                      :on-save="saveProperty"
                      payload="firstName"
                      :validation-rules="myRules"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Last Name</td>
                  <td>{{ guestPersonalDetails.lastName }}</td>
                </tr>
                <tr>
                  <td>Birthdate</td>
                  <td>
                    <date-inline-edit-component
                      :value="guestPersonalDetails.birthDate"
                      :on-save="saveProperty"
                      payload="birthDate"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Nationality</td>
                  <td>{{ guestPersonalDetails.nationality }}</td>
                </tr>
                <tr>
                  <td>Country</td>
                  <td>{{ guestPersonalDetails.country }}</td>
                </tr>
                <tr>
                  <td>City</td>
                  <td>{{ guestPersonalDetails.city }}</td>
                </tr>
                <tr>
                  <td>Postcode</td>
                  <td>{{ guestPersonalDetails.postcode }}</td>
                </tr>
                <tr>
                  <td>Street</td>
                  <td>{{ guestPersonalDetails.street }}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{{ guestPersonalDetails.email }}</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>{{ guestPersonalDetails.phone }}</td>
                </tr>
                <tr>
                  <td>PassportId</td>
                  <td>{{ guestPersonalDetails.passportId }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import DateInlineEditComponent  from '@components/formUtils/DateInlineEditComponent'
  import TextInlineEditComponent from '@components/formUtils/TextInlineEditComponent'
  import validations from '@/components/formUtils/validations'

  export default {
    name: 'GuestPersonalDetailsComponent',
    components: {
      DateInlineEditComponent,
      TextInlineEditComponent,
    },
    props: {
      guestPersonalDetails: {
        type: Object,
        default: () => ({}),
      },
    },
    data: () => ({}),
    computed: {
      StayDatailsFormated () {
        const result = []
        const stayDetailsCopy = [...this.stayDetails]

        Object.keys(stayDetailsCopy).forEach(key => {
          const name = key
          const value = stayDetailsCopy[key]

          result.push({ name, value })
        })

        return result
      },
      disableDelete () {
        const selectedGuest = this.$store.state.guestModule.selectedGuest
        return selectedGuest === undefined
      },
      myRules () {
        return [
          validations.maxLength(10),
          validations.required(),
        ]
      },
    },
    methods: {
      saveProperty (value, peyload) {
        alert('Saved ' + peyload + ': ' + value)
      },
    },
  }
</script>

<style>
</style>
