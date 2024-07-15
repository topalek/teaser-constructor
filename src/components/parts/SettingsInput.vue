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
            this.$emit('update:modelValue', newValue);
            this.$refs.input.value = newValue
            return newValue
          }
          if (value > +this.max) {
            value = +this.max
          }
          this.$emit('update:modelValue', value || 0);
          this.$refs.input.value = value
          return value
        }
        this.$emit('update:modelValue', newValue);
      }
    }
  }
}
</script>

<template>
  <div class="settings-input">
    <label>
      <slot/>
    </label>
    <input ref="input" v-model="val" :max="max" :min="min" :name="name" :step="step" :type="type" class="form-control" @keydown="onKeydown"/>
  </div>
</template>

<style scoped>

</style>