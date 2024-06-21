<script>
export default {
  name: "SettingsInput",
  props: {
    modelValue: String,
    type: {
      type: String,
      default: 'text'
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default:1
    },
    name: {
      type: String
    }
  },
  emits: ['update:modelValue']
}
</script>

<template>
  <label class="settings-input">
    <span>
      <slot/>
    </span>
    <input class="form-control" :name="name" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :type="type" :step="step" :min="min" :max="max"/>
  </label>
</template>

<style scoped>

</style>