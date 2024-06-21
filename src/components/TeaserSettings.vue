<template>
  <div class="teaser-settings">
    <SettingsInput v-model="settings.width" max="3000" min="20" type="number">Ширина тизера</SettingsInput>
    <SettingsInput v-model="settings.height" max="3000" min="20" type="number">Высота тизера</SettingsInput>
    <SettingsInput v-model="settings.borderRadius" max="100" min="0" type="number">Скругление</SettingsInput>
    <label class="settings-text">
      <span>Текст снизу</span>
      <input v-model="settings.textBottom" class="toggle" type="checkbox"/>
      <span>Текст справа</span>
    </label>

    <h3>Текст</h3>
    <Select v-model="settings.text.fontStyle" :options="['normal','bold','italic']">Стиль теста</Select>
    <Select v-model="settings.text.fontFamily" :options="fonts">Шрифт</Select>
    <Select v-model="settings.text.textAlign" :options="textAlign">Выравнивание текста</Select>
    <SettingsInput v-model="settings.text.fontSize" max="22" min="8" type="number">Размер шрифта</SettingsInput>
    <SettingsInput v-model="settings.text.lineHeight" :step="0.1" min="0.8" type="number">Ширина линии</SettingsInput>
    <SettingsInput v-model="settings.text.paddingInline" max="200" min="0" type="number">Отступы Inline</SettingsInput>
    <SettingsInput v-model="settings.text.paddingBlock" max="200" min="0" type="number">Отступы Block</SettingsInput>
    <ColorInput v-model="settings.text.color">Цвет текста</ColorInput>
    <Toggle v-model="settings.showBtn">Показать кнопку</Toggle>
    <template v-if="settings.showBtn">
      <Select v-model="settings.btn.text" :options="btnText">Текст кнопки</Select>
      <ColorInput v-model="settings.btn.color">Цвет текста кнопки</ColorInput>
      <ColorInput v-model="settings.btn.backgroundColor">Цвет фона кнопки</ColorInput>
      <SettingsInput v-model="settings.btn.borderRadius" max="100" min="0" type="number">Скругление кнопки</SettingsInput>
      <Toggle v-model="settings.btn.bold">Текст жирный</Toggle>
    </template>
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
      btnText: ["Узнать больше", "Подробнее", "Далее"],
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
        showBtn: false,
        btn: {
          text: 'Узнать больше',
          bold: false,
          color: "#ffffff",
          backgroundColor: "#165da8",
          borderRadius: 0,

        }
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
.settings-text {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
}
</style>