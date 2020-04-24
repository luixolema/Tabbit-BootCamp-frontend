<template>
  <div>
    <v-text-field
      v-model="inputDate"
      :label="label"
      :rules="computedRules"
      append-icon="mdi-calendar"
      :class="{required: 'required'}"
      @click:append="isDateDialogOpen=true"
      @change="$emit('date-updated', property, inputDate)"
    />
    <v-dialog
      ref="datePickerDialog"
      v-model="isDateDialogOpen"
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
  import validations from '../formUtils/Validations'
  export default {
    name: 'Datepicker',
    props: {
      required: {
        type: Boolean,
        default: false,
      },
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
      rules: {
        type: Array,
        default: () => ([]),
      },
    },
    data: () => {
      return {
        isDateDialogOpen: false,
        inputDate: '',
        tempDate: '',
        validations,
      }
    },
    computed: {
      computedRules () {
        var ruleArray = []
        if (this.required) {
          ruleArray = [validations.required()]
        }
        return [...this.rules, ...ruleArray, validations.date()]
      },
    },
    watch: {
      inputDate (newInputDate, oldInputDate) {
        this.tempDate = newInputDate
      },
      date (newDate, oldDate) {
        this.inputDate = newDate
      },
    },
    mounted () {
      this.inputDate = this.date
      this.tempDate = this.date
      var self = this
      window.addEventListener('keyup', function (event) {
        // If enter key was pressed...

        if (self.isDateDialogOpen) {
          if (event.keyCode === 13) {
            self.isDateDialogOpen = false
            self.inputDate = self.tempDate
            self.$emit('date-updated', self.property, self.inputDate)
          }
          if (event.keyCode === 27) {
            self.isDateDialogOpen = false
          }
        }
      })
    },
    methods: {
      signalDateUpdated (property, value) {
        this.tempDate = value
      },
    },
  }
</script>
