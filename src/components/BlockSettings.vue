<template>
  <div class="block-settings">
    <SettingsInput v-model="settings.blockName" name="">Название блока:</SettingsInput>
    <Select v-model="settings.adsHorizontal" :options="[1,2,3,4,5,6,7]">Кол-во по-горизонтали:</Select>
    <Select v-model="settings.adsVertical" :options="[1,2,3,4,5,6,7]">Кол-во по-вертикали:</Select>
    <SettingsInput v-model="settings.width" max="3000" min="20" type="number">Ширина блока</SettingsInput>
    <SettingsInput v-model="settings.height" max="3000" min="20" type="number">Высота блока</SettingsInput>
    <SettingsInput v-model="settings.padding" max="200" min="0" type="number">Отступ</SettingsInput>
    <SettingsInput v-model="settings.spacing" max="200" min="0" type="number">Расстояние</SettingsInput>
    <SettingsInput v-model="settings.borderRadius" max="200" min="0" type="number">Скругление</SettingsInput>
    <ColorPicker v-model="settings.backgroundColor">Цвет фона</ColorPicker>
    <Toggle v-model="settings.responsive">Адаптивный</Toggle>
  </div>
</template>

<script>
import SettingsInput from "./parts/SettingsInput.vue";
import Select from "./parts/Select.vue";
import ColorPicker from "./parts/ColorPicker.vue";
import Toggle from "./parts/Toggle.vue";

export default {
  components: {Toggle, ColorPicker, Select, SettingsInput},
  props:['teaserSettings'],
  data() {
    return {
      settings: {
        blockName: "",
        blockType: 1,
        width: 300,
        height: 200,
        adsVertical: 1,
        adsHorizontal: 1,
        padding: 0,
        spacing: 0,
        backgroundColor: "#ffffff",
        borderRadius: 0,
        responsive: false,
      },
    };
  },
  watch: {
    settings:{
        handler(newValue, oldValue) {
          this.$emit("update-settings", this.settings);
        },
        deep: true
    },
    'settings.responsive'() {
      if (this.settings.responsive) {

      } else {

      }
    }
  },
  methods: {
    emitUpdate() {
      this.$emit("update-settings", this.settings);
    },
  },
  computed: {
    blockWidth() {
      return this.teaserSettings.width * this.settings.adsHorizontal + this.settings.padding * 2 > this.settings.width ? this.teaserSettings.width * this.settings.adsHorizontal + this.settings.padding * 2 : this.settings.width;
    },
  },
  mounted() {
    this.$emit("update-settings", this.settings);
  }
};
</script>
