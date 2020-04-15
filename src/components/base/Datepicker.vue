<template>
  <div>
    <v-text-field
      v-model="inputDate"
      :label="label"
      :rules="[rules.required,rules.validDate]"
      append-icon="mdi-calendar"
      @click:append="dateDialog=true"
      @change="self.$emit('date-updated', self.property, self.inputDate)"
    />
    <v-dialog
      v-model="dateDialog"
      max-width="340"
    >
      <v-card>
        <v-card-text class="pt-1">
          <base-editable-date-field
            :date="inputDate"
            :label="label"
            :property="property"
            @date-updated="signalDateUpdated"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  const germanDatePattern = /^([0-2]\d|3[01])\.([0]\d|1[0-2])\.\d{4}$/
  export default {
    name: 'Datepicker',
    props: {
      date: {
        type: String,
        default: '',
      },
      label: {
        type: String,
        default: '',
      },
      property: {
        type: String,
        default: '',
      },
    },
    data: () => {
      return {
        dateDialog: false,
        inputDate: '',
        rules: {
          required: value => !!value || 'Required.',
          validDate: value => {
            return germanDatePattern.test(value) || 'Invalid Date'
          },
        },
      }
    },
    mounted () {
      this.inputDate = this.date
      var self = this
      window.addEventListener('keyup', function (event) {
        // If enter key was pressed...
        if (event.keyCode === 13) {
          self.dateDialog = false
          self.$emit('date-updated', self.property, self.inputDate)
        }
      })
    },
    methods: {
      signalDateUpdated (property, value) {
        this.inputDate = value
      },
    },
  }
</script>
