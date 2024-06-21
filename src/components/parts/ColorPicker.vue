<script>
export default {
  name: "ColorPicker",
  props: {
    modelValue: String,
  },
  emits: ['update:modelValue'],
  data() {
    return {
      rgba: '',
      color: '#ffffff',
      opacity: 255
    }
  },
  methods: {
    setColor() {
      this.rgba = this.color + (this.opacity === 255 ? "" : parseInt(this.opacity).toString(16).padStart(2, "0"))
      this.$emit('update:modelValue', this.rgba)
    }
  }
}
</script>

<template>
  <label class="settings-input">
    <span>
      <slot/>
    </span>
    <div class="color-wrapper" ref="wrapper" :style="{'background-color': rgba}">
      <input @input="setColor" v-model="color" type="color">
      <input @input="setColor" v-model="opacity" type="range" min="0" max="255" step="1" value="255"/>
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