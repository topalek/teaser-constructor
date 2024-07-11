<script>
export default {
  name: "SettingsInput",
  props: {
    modelValue: String,
    type: {
      type: String,
      default: 'text'
    },
    empty: {
      type: Boolean,
      default: false
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
      default: 1
    },
    name: {
      type: String
    }
  },
  emits: ['update:modelValue'],
  watch: {
    modelValue(newValue) {
      if (this.type === 'number') {
        let value = Number(newValue);
        // if (isNaN(value)) {
        //   value = this.min;
        // }
        // else if (value < this.min) {
        //   value = this.min;
        // } else
        if (value > this.max) {
          value = this.max;
        }
        this.$emit('update:modelValue', value.toString() || 0);
      }
    }
  },
  methods: {
    validateValue(event) {
      let value = event.target.value;
      // if (this.type === 'number' && value !== '') {
      //   value = Number(value);
      //   if (isNaN(value)) {
      //     value = this.min;
      //   } else if (value < this.min) {
      //     value = this.min;
      //   } else if (value > this.max) {
      //     value = this.max;
      //   }
      // }
      this.$emit('update:modelValue', value.toString());
    },
    onKeydown(event) {
      const invalidKeys = ['+', '-'];
      if (this.type === 'number' && invalidKeys.includes(event.key)) {
        event.preventDefault();
      }
    }
  }
}
</script>

<template>
  <label class="settings-input">
    <span>
      <slot/>
    </span>
    <input :max="max" :min="min" :name="name" :step="step" :type="type" :value="modelValue" class="form-control" @input="validateValue" @keydown="onKeydown"/>
  </label>
</template>

<style scoped>

</style>