<script>
export default {
  name: "ColorPicker",
  props: {
    modelValue: {
      type: String,
      required: true,
      validator(value) {
        return /^#[0-9A-Fa-f]{8}$/.test(value); // Проверяем формат HEX с альфа-каналом
      }
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      color: '#ffffff',
      opacity: 1
    }
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(newValue) {
        this.parseColor(newValue);
      }
    }
  },
  methods: {
    parseColor(value) {
      if (/^#[0-9A-Fa-f]{8}$/.test(value)) {
        const r = parseInt(value.slice(1, 3), 16);
        const g = parseInt(value.slice(3, 5), 16);
        const b = parseInt(value.slice(5, 7), 16);
        const a = parseInt(value.slice(7, 9), 16) / 255;

        this.color = `#${value.slice(1, 7)}`;
        this.opacity = a;
      } else {
        console.error('Invalid color format');
      }
    },
    updateColor(event) {
      const color = event.target.value;
      this.updateModelValue(color, this.opacity);
    },
    updateOpacity(event) {
      const opacity = event.target.value;
      this.updateModelValue(this.color, opacity);
    },
    updateModelValue(color, opacity) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      const a = Math.round(opacity * 255).toString(16).padStart(2, '0');

      const newColor = `#${color.slice(1, 7)}${a}`;
      this.$emit('update:modelValue', newColor);
    }
  }
}
</script>

<template>
  <label class="settings-input">
    <span>
      <slot/>
    </span>
    <div ref="wrapper" :style="{'background-color': modelValue}" class="color-wrapper">
      <input v-model="color" type="color" @input="updateColor">
      <input v-model="opacity" max="1" min="0" step="0.01" type="range" @input="updateOpacity"/>
    </div>

  </label>
</template>

<style scoped>

.color-wrapper {
  background-color: white;
  display: inline-grid;
  grid-template-columns: 1fr 5fr;
  align-items: center;
  grid-gap: 5px;
  visibility: hidden;
}

.color-wrapper::before {
  content: "";
  position: absolute;
  border-radius: 3px;
  outline: black solid 2px;
  border: white solid 3px;
  height: 20px;
  width: 20px;
  pointer-events: none;
  background-color: inherit;
  visibility: visible;
  box-sizing: border-box;
}

.color-wrapper [type="color"] {
  opacity: 0;
  height: 2rem;
  width: 2rem;
  box-sizing: border-box;
  pointer-events: initial;
  visibility: visible;
}

.color-wrapper [type="range"] {
  filter: grayscale(100%);
  visibility: visible;
}
</style>