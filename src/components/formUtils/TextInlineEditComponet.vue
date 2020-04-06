<template>
  <div class="inputContent">
    <span
      v-if="!editMode"
      @dblclick="toggleEditMode"
    >
      {{ value }}
    </span>
    <v-text-field
      v-else
      ref="input"
      v-model="editorValue"
      dense
      :placeholder="placeholder"
      autofocus
      counter
      :rules="validationRules"
      @blur="toggleEditMode"
      @keyup="keyPressed($event)"
      @error="setInvalid()"
    />
  </div>
</template>

<script>
  const TextInlineEditComponet = {
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
      placeholder: {
        type: String,
        required: false,
        default: 'Enter the new value',
      },
      onSave: {
        type: Function,
        required: true,
      },
    },
    data: () => ({
      editMode: false,
      editorValue: undefined,
    }),
    mounted () {
      this.editionValue = this.value
      console.log(this.value)
    },
    methods: {
      toggleEditMode () {
        this.editMode = !this.editMode
        this.editorValue = this.value
      },
      keyPressed ($event) {
        if ($event.key === 'Escape') {
          this.toggleEditMode()
        }

        if ($event.key === 'Enter') {
          if (this.$refs.input.validate()) {
            this.onSave(this.editorValue, this.payload)
            this.toggleEditMode()
          } else {
            this.onInvalid(this.editorValue, this.payload)
          }
        }
      },
    },
  }

  export default TextInlineEditComponet
</script>

<style lang="scss" scoped>
  .inputContent{
    width: 90%;
  }
</style>
