<script>
export default {
  name: "ColorInput",
  props: ['modelValue'],
  emits: ['update:modelValue'],
}
</script>

<template>
  <div class="settings-input">
    <label>
      <slot/>
    </label>
    <input :value="modelValue" class="color" type="color" @change="$emit('update:modelValue', $event.target.value)"/>
  </div>
</template>
