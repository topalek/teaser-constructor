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
  <div class="settings-input">
    <label>
      <slot/>
    </label>
    <input :checked="modelValue"
           :name="name"
           class="toggle"
           type="checkbox"
           @change="emitChange"
    />
  </div>
</template>

<style scoped>

</style>