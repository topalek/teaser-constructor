<template>
  <div class="teaser-$store.state.teaser">
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
.enigmas__enigma.enigma__zoom .enigma__picture img {
  transform: scale(0);
  transition: transform 0.5s;
}

.enigmas__enigma.enigma__zoom:hover .enigma__picture img {
  transform: scale(1.2);
}
.settings-text {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
}
</style>