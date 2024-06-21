<script>
export default {
  name: "ColorInput",
  props: ['modelValue'],
  emits: ['update:modelValue'],
}
</script>

<template>
  <label class="settings-input">
    <span>
      <slot/>
    </span>
    <input :value="modelValue" class="color" type="color" @change="$emit('update:modelValue', $event.target.value)"/>
  </label>
</template>
