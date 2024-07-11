<template>
  <div class="teaser-settings">
    <SettingsInput v-model="teaserWidth" max="3000" min="20" type="number">Ширина тизера, px</SettingsInput>
    <SettingsInput v-model="teaserHeight" max="3000" min="20" type="number">Высота тизера, px</SettingsInput>
    <SettingsInput v-model="teaser.borderRadius" max="100" min="0" type="number">Скругление, px</SettingsInput>
    <SettingsInput v-model="teaser.paddingInline" max="100" min="0" type="number">Отступы по-горизонтали, px</SettingsInput>
    <SettingsInput v-model="teaser.paddingBlock" max="100" min="0" type="number">Отступы по-вертикали, px</SettingsInput>
    <Toggle v-model="teaser.showBorder">Обводка</Toggle>
    <Toggle v-model="teaser.zoom">Увеличение при наведении</Toggle>
    <ColorPicker v-model="teaser.backgroundColor">Цвет фона</ColorPicker>
    <Select v-model="teaser.imgFr" :options="[1,2,3,4,5,6,7,8,9,10]">Колонок картинки</Select>
    <Select v-model="teaser.textFr" :options="[1,2,3,4,5,6,7,8,9,10]">Колонок контента</Select>
    <div class="settings-text">
      <label>Расположение текста</label>
      <div class="buttons">
        <label title="Справа">
          <input v-model="$store.state.teaser.textBottom" :value="true" type="radio">
          <svg height="1em" viewBox="0 0 20 20" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="m16 10l-5-4v3H6v2h5v3z" fill="currentColor"/>
            <path d="M0 2h20v16H0zm5 6v4h5v4h8V4h-8v4z" fill="currentColor"/>
          </svg>
        </label>
        <label title="Внизу">
          <input v-model="$store.state.teaser.textBottom" :value="false" type="radio">
          <svg height="1em" viewBox="0 0 20 20" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="m10 16l-4-5h3V6h2v5h3z" fill="currentColor"/>
            <path d="M2 0v20h16V0zm2 10h4V5h4v5h4v8H4z" fill="currentColor"/>
          </svg>
        </label>
      </div>
    </div>
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
  grid-template-columns: 2fr 1fr;
  align-items: center;
}

.buttons {
  grid-template-columns: repeat(2, 50px);

  label {
    margin: 0;
  }
}
</style>