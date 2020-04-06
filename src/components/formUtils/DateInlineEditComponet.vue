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

      <v-card class="my-0 pt-2">
        <v-text-field
          v-if="editMode"
          v-model="editorValue"
          class="px-3"
          dense
        />
        <v-date-picker
          v-model="editorValue"
          class="my-0"
          no-title
          scrollable
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
      menu: false,
    }),
    methods: {
      toggleEditMode () {
        this.editorValue = new Date(Date.parse(this.value, 'dd.mm.yyyy')).toISOString().substr(0, 10)
        this.editMode = !this.editMode
      },
      save () {
        const valid = true // validate acording all the functions passed throgh rules

        if (valid) {
          this.onSave(this.editorValue, this.payload)
          this.toggleEditMode()
        } else {
          this.onInvalid(this.editorValue, this.payload)
        }
      },
    },
  }

  export default DateInlineEditComponet

</script>

<style lang="scss" scoped>
</style>
