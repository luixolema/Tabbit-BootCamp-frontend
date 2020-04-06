<template>
  <div>
    <v-menu
      v-model="editMode"
      :close-on-click="true"
      :close-on-content-click="false"
      offset-y
    >
      <template v-slot:activator="{}">
        <span @dblclick="toggleEditMode">
          {{ value }}
        </span>
      </template>

      <v-card
        class="my-0 pt-2"
        @keyup="keyPressed($event)"
      >
        <v-text-field
          v-model="inputValue"
          class="px-3"
          dense
          autofocus
          :rules="[validateDate]"
          @input="updateDatepicker"
        />
        <v-date-picker
          v-model="editorValue"
          class="my-0"
          no-title
          scrollable
          @change="updateInput"
        >
          <v-spacer />
          <v-btn
            text
            color="primary"
            @click="toggleEditMode"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="save"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-card>
    </v-menu>
  </div>
</template>

<script>

  import moment from 'moment'

  const DateInlineEditComponet = {
    props: {
      value: {
        type: String,
        required: false,
        default: undefined,
      },
      payload: undefined,
      validationRules: {
        type: Array,
        required: false,
        default: () => [],
      },
      onInvalid: {
        type: Function,
        required: false,
        default: () => null,
      },
      onSave: {
        type: Function,
        required: true,
      },
    },
    data: () => ({
      editMode: false,
      editorValue: undefined,
      inputValue: undefined,
      menu: false,
    }),
    computed: {
      formattedDate () {
        return this.editorValue ? moment(this.editorValue).format('DD.MM.YYYY') : ''
      },
    },
    methods: {
      updateDatepicker () {
        const date = moment(this.inputValue, 'DD.MM.YYYY')
        if (date.isValid()) {
          const inputStringIsoDate = date.format().substr(0, 10)
          this.editorValue = inputStringIsoDate
        }
      },
      updateInput () {
        this.inputValue = this.formattedDate
      },
      toggleEditMode () {
        this.editorValue = new Date(Date.parse(this.value, 'dd.mm.yyyy')).toISOString().substr(0, 10)
        this.inputValue = this.value
        this.editMode = !this.editMode
      },
      save () {
        const valid = moment(this.inputValue, 'DD.MM.YYYY').isValid()
        // validate acording all the functions passed throgh rules

        if (valid) {
          this.onSave(this.formattedDate, this.payload)
          this.toggleEditMode()
        } else {
          this.onInvalid(this.formattedDate, this.payload)
        }
      },
      keyPressed ($event) {
        if ($event.key === 'Escape') {
          this.toggleEditMode()
        }

        if ($event.key === 'Enter') {
          this.save()
        }
      },
      validateDate () {
        return moment(this.inputValue, 'DD.MM.YYYY').isValid() ? true : 'Invalid date'
      },
    },
  }

  export default DateInlineEditComponet

</script>

<style lang="scss" scoped>
</style>
