<script>
export default {
  name: "Toggle",
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
    <input class="toggle" :name="name" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)" type="checkbox"/>
  </label>
</template>

<style scoped>

</style>