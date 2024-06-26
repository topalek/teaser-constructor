<template>
  <div class="teaser-$store.state.teaser">
    <SettingsInput v-model="teaserWidth" max="3000" min="20" type="number">Ширина тизера</SettingsInput>
    <SettingsInput v-model="$store.state.teaser.height" max="3000" min="20" type="number">Высота тизера</SettingsInput>
    <SettingsInput v-model="$store.state.teaser.borderRadius" max="100" min="0" type="number">Скругление</SettingsInput>
    <Toggle v-model="$store.state.teaser.showBorder">Обводка</Toggle>
    <ColorPicker v-model="$store.state.teaser.backgroundColor">Цвет фона</ColorPicker>
    <label class="settings-text">
      <span>Текст снизу</span>
      <input v-model="$store.state.teaser.textBottom" class="toggle" type="checkbox"/>
      <span>Текст справа</span>
    </label>
  </div>
</template>

<script>
import Select from "./parts/Select.vue";
import ColorPicker from "./parts/ColorPicker.vue";
import Toggle from "./parts/Toggle.vue";
import ColorInput from "./parts/ColorInput.vue";
import SettingsInput from "./parts/SettingsInput.vue";
import {mapActions, mapState} from 'vuex';

export default {
  components: {SettingsInput, ColorInput, Toggle, ColorPicker, Select},
  // data() {
  //   return {
  //     border: false
  //   }
  // },
  computed: {
    ...mapState({
      teaser: state => state.teaser,
    }),
    teaserWidth: {
      get() {
        return this.teaser.width;
      },
      set(value) {
        this.updateTeaserWidth(value);
      },
    },
    teaserHeight: {
      get() {
        return this.teaser.height;
      },
      set(value) {
        this.updateTeaserHeight(value);
      },
    },
  },
  methods: {
    ...mapActions(['updateTeaserWidth', 'updateTeaserHeight']),
  },
}
</script>
<style scoped>
.settings-text {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
}
</style>