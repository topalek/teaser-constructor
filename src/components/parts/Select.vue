<script>
export default {
  name: "Select",
  props: {
    modelValue: String,
    options: {
      type: Array,
      default: []
    },
  },
  emits: ['update:modelValue']
}
</script>

<template>
  <div class="settings-input">
    <label>
      <slot/>
    </label>
    <select class="form-control" @change="$emit('update:modelValue', $event.target.value)">
      <option v-for="option in options" :value="option.value || option" :key="option.value || option" :selected="modelValue === (option.value || option)">
        {{ option.text || option }}
      </option>
    </select>
  </div>
</template>

<style scoped>

</style>