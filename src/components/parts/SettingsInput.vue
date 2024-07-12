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
  methods: {
    onKeydown(event) {
      const invalidKeys = ['+', '-'];
      if (this.type === 'number' && invalidKeys.includes(event.key)) {
        event.preventDefault();
      }
    }
  },
  computed: {
    val: {
      get() {
        return this.modelValue
      },
      set(newValue) {
        if (this.type === 'number') {
          let value = Number(newValue);

          if (newValue === '' && this.empty) {
            console.log(newValue, this.empty)
            this.$emit('update:modelValue', newValue);
            return true
          }
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
    }
  }
}
</script>

<template>
  <label class="settings-input">
    <span>
      <slot/>
    </span>
    <input v-model="val" :max="max" :min="min" :name="name" :step="step" :type="type" class="form-control" @keydown="onKeydown"/>
  </label>
</template>

<style scoped>

</style>