<template>
  <div>
    <v-text-field
      ref="dateTextField"
      v-model="inputDate"
      :label="label"
      class="mt-3"
      :rules="[validations.required(),validations.date()]"
    />
    <v-date-picker
      v-model="isoDate"
      show-current="true"
    />
  </div>
</template>

<script>
  import validations from '../../components/formUtils/Validations'
  const germanDatePattern = /^([0-2]\d|3[01])\.([0]\d|1[0-2])\.\d{4}$/

  export default {
    name: 'EditableDateField',

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
        validations,
        inputDate: '',
      }
    },
    computed: {
      isoDate: {
        get: function () {
          this.signalDateUpdated()
          if (germanDatePattern.test(this.inputDate)) {
            return this.germanTimeStringtoIsoString(this.inputDate)
          }
          return new Date().toISOString().substr(0, 10)
        },
        set: function (newValue) {
          this.inputDate = this.IsoStringtoGermanTimeString(newValue)
          this.signalDateUpdated()
        },
      },
      stayDataInStore () {
        return this.$store.state.stayModule.stayData
      },
    },
    watch: {
      date: function (newDate, oldDate) {
        if (this.date) {
          this.inputDate = newDate
        }
      },
    },
    mounted () {
      var inputDateTextField = this.$refs.dateTextField.$el.querySelector('input')
      setTimeout(() => {
        inputDateTextField.focus()
      }, 100) // this code is to be sure that once the dialog with the date picker opens, the text input will be on focus

      this.inputDate = this.date
    },
    methods: {
      germanTimeStringtoIsoString (germanTimeString) {
        var parts = germanTimeString.match(/(\d+)/g)
        return new Date(parts[2], parts[1] - 1, parts[0] - (-1)).toISOString().substr(0, 10)
      },
      IsoStringtoGermanTimeString (isoDateString) {
        var parts = isoDateString.match(/(\d+)/g)
        return parts[2] + '.' + parts[1] + '.' + parts[0]
      },
      signalDateUpdated () {
        this.$emit('date-updated', this.property, this.inputDate)
      },
    },
  }
</script>
