<template>
  <div class="image-settings">
    <SettingsInput v-model="width" max="3000" min="20" type="number">Ширина картинки</SettingsInput>
    <SettingsInput v-model="height" max="3000" min="20" type="number">Высота картинки</SettingsInput>
    <Select v-model="aspectRatio" :options="ratios">Соотношение сторон</Select>
    <div class="border-radius-settings">
      <label>Скругление углов</label>
      <input v-model="$store.state.image.borderTopLeftRadius" class="form-control" max="100" min="0" type="number">
      <input v-model="$store.state.image.borderTopRightRadius" class="form-control" max="100" min="0" type="number">
      <input v-model="$store.state.image.borderBottomLeftRadius" class="form-control" max="100" min="0" type="number">
      <input v-model="$store.state.image.borderBottomRightRadius" class="form-control" max="100" min="0" type="number">
    </div>

  </div>
</template>

<script>
import Select from "./parts/Select.vue";
import ColorPicker from "./parts/ColorPicker.vue";
import Toggle from "./parts/Toggle.vue";
import ColorInput from "./parts/ColorInput.vue";
import SettingsInput from "./parts/SettingsInput.vue";

export default {
  components: {SettingsInput, ColorInput, Toggle, ColorPicker, Select},
  data() {
    return {
      width: this.$store.state.image.width || null,
      height: this.$store.state.image.height || null,
      aspectRatio: this.$store.state.image.aspectRatio,
      ratios: [
        {value: '1:1', text: '1:1'},
        {value: '4:3', text: '4:3'},
        {value: '16:9', text: '16:9'},
      ]
    }
  },
  watch: {
    width(newWidth) {
      if (newWidth) {
        const [w, h] = this.aspectRatio.split(':').map(Number);
        this.height = Math.round(newWidth * h / w);
      } else {
        this.height = null;
      }
      this.updateStore();
    },
    height(newHeight) {
      if (newHeight) {
        const [w, h] = this.aspectRatio.split(':').map(Number);
        this.width = Math.round(newHeight * w / h);
      } else {
        this.width = null;
      }
      this.updateStore();
    },
    aspectRatio(newAspectRatio) {
      if (this.width) {
        const [w, h] = newAspectRatio.split(':').map(Number);
        this.height = Math.round(this.width * h / w);
      } else if (this.height) {
        const [w, h] = newAspectRatio.split(':').map(Number);
        this.width = Math.round(this.height * w / h);
      }
      this.updateStore();
    }
  },
  methods: {
    updateStore() {
      this.$store.commit('updateImage', {
        width: this.width ? this.width + 'px' : '100%',
        height: this.height ? this.height + 'px' : '100%',
        aspectRatio: this.aspectRatio
      });
    }
  }
}
</script>
<style scoped>
.border-radius-settings {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr 1fr 1fr;
  align-items: center;

  label {
    grid-column: 1/3;
  }
}
</style>