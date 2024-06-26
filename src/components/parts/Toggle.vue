<script>
export default {
  name: "Toggle",
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    }
  },
  emits: ['update:modelValue'],
  methods: {
    emitChange(e) {
      this.$emit('update:modelValue', e.target.checked)
    }
  }
}
</script>

<template>
  <label class="settings-input">
    <span>
      <slot/>
    </span>
    <input :checked="modelValue"
           :name="name"
           class="toggle"
           type="checkbox"
           @change="emitChange"
    />
  </label>
</template>

<style scoped>

</style>