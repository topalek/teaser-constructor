<template>
  <div id="block-settings">
    <h2>Настройки блока</h2>
    <Input name="" v-model="settings.blockName">Название блока:</Input>
    <Select v-model="settings.adsHorizontal" :options="[1,2,3,4,5,6,7]">Кол-во по-горизонтали:</Select>
    <Select v-model="settings.adsVertical" :options="[1,2,3,4,5,6,7]">Кол-во по-вертикали:</Select>
    <Input v-model="settings.width" type="number" min="20" max="3000">Ширина блока</Input>
    <Input v-model="settings.height" type="number" min="20" max="3000">Высота блока</Input>
    <Input v-model="settings.padding" type="number" min="0" max="200">Отступ</Input>
    <Input v-model="settings.spacing" type="number" min="0" max="200">Расстояние</Input>
    <Input v-model="settings.borderRadius" type="number" min="0" max="200">Скругление</Input>
    <ColorPicker v-model="settings.backgroundColor">Цвет фона</ColorPicker>
    <Toggle v-model="settings.responsive">Адаптивный</Toggle>
  </div>
</template>

<script>
import Input from "./parts/Input.vue";
import Select from "./parts/Select.vue";
import ColorPicker from "./parts/ColorPicker.vue";
import Toggle from "./parts/Toggle.vue";

export default {
  components: {Toggle, ColorPicker, Select, Input},
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
