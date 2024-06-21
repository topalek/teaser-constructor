<template>
  <div id="teaser-settings">
    <h2>Настройки Тизера</h2>
    <Input v-model="settings.width" type="number" min="20" max="3000">Ширина тизера</Input>
    <Input v-model="settings.height" type="number" min="20" max="3000">Высота тизера</Input>
    <Input v-model="settings.borderRadius" type="number" min="0" max="100">Скругление</Input>
    <label class="settings-text">
      <span>Текст снизу</span>
      <input class="toggle"  v-model="settings.textBottom" type="checkbox"/>
      <span>Текст справа</span>
    </label>

    <h3>Текст</h3>
    <Select v-model="settings.text.fontStyle" :options="['normal','bold','italic']">Стиль теста</Select>
    <Select v-model="settings.text.fontFamily" :options="fonts">Шрифт</Select>
    <Select v-model="settings.text.textAlign" :options="textAlign">Выравнивание текста</Select>
    <Input v-model="settings.text.fontSize" type="number" min="8" max="22">Размер шрифта</Input>
    <Input v-model="settings.text.lineHeight" type="number" min="0.8" :step="0.1">Ширина линии</Input>
    <Input v-model="settings.text.paddingInline" type="number" min="0" max="200">Отступы Inline</Input>
    <Input v-model="settings.text.paddingBlock" type="number" min="0" max="200">Отступы Block</Input>
    <label class="settings-input">
      <span>Цвет текста</span>
      <input class="color" v-model="settings.text.color" type="color"/>
    </label>
    <hr>
  </div>
</template>

<script>
import Input from "./parts/Input.vue";
import Select from "./parts/Select.vue";
import ColorPicker from "./parts/ColorPicker.vue";
import Toggle from "./parts/Toggle.vue";

export default {
  components: {Toggle, ColorPicker, Select, Input},
  data() {
    return {
      fonts: [
        "'Arial', sans-serif",
        "'Roboto', sans-serif",
        "'Georgia', serif",
        "'Gill Sans', sans-serif",
        "'Open Sans', sans-serif",
        "cursive",
        "system-ui",
      ],
      textAlign: ["left", "center", "right"],
      settings: {
        text: {
          fontStyle: "normal",
          fontSize: 14,
          fontFamily: "Arial, sans-serif",
          lineHeight: 1.5,
          textSize: 14,
          color: "#000000",
          paddingInline: 0,
          paddingBlock: 0,
          textAlign: 'left',
        },
        textBottom: true,
        width: 300,
        height: 200,
        borderRadius: 0,
      },
    };
  },
  watch: {
    settings: {
      handler(newValue, oldValue) {
        this.$emit("update-settings", this.settings);
      },
      deep: true
    }
  },
  mounted() {
    this.$emit("update-settings", this.settings);
  }
};
</script>
<style scoped>
.settings-text{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
}
</style>