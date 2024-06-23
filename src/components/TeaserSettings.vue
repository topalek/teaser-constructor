<template>
  <div class="teaser-$store.state.teaser">
    <SettingsInput v-model="$store.state.teaser.width" max="3000" min="20" type="number">Ширина тизера</SettingsInput>
    <SettingsInput v-model="$store.state.teaser.height" max="3000" min="20" type="number">Высота тизера</SettingsInput>
    <SettingsInput v-model="$store.state.teaser.borderRadius" max="100" min="0" type="number">Скругление</SettingsInput>
    <label class="settings-text">
      <span>Текст снизу</span>
      <input v-model="$store.state.teaser.textBottom" class="toggle" type="checkbox"/>
      <span>Текст справа</span>
    </label>

    <h3>Текст</h3>
    <Select v-model="$store.state.teaser.text.fontStyle" :options="['normal','bold','italic']">Стиль теста</Select>
    <Select v-model="$store.state.teaser.text.fontFamily" :options="fonts">Шрифт</Select>
    <Select v-model="$store.state.teaser.text.textAlign" :options="textAlign">Выравнивание текста</Select>
    <SettingsInput v-model="$store.state.teaser.text.fontSize" max="22" min="8" type="number">Размер шрифта</SettingsInput>
    <SettingsInput v-model="$store.state.teaser.text.lineHeight" :step="0.1" min="0.8" type="number">Ширина линии</SettingsInput>
    <SettingsInput v-model="$store.state.teaser.text.paddingInline" max="200" min="0" type="number">Отступы Inline</SettingsInput>
    <SettingsInput v-model="$store.state.teaser.text.paddingBlock" max="200" min="0" type="number">Отступы Block</SettingsInput>
    <ColorInput v-model="$store.state.teaser.text.color">Цвет текста</ColorInput>
    <Toggle v-model="$store.state.teaser.showBtn">Показать кнопку</Toggle>
    <template v-if="$store.state.teaser.showBtn">
      <Select v-model="$store.state.teaser.btn.text" :options="btnText">Текст кнопки</Select>
      <ColorInput v-model="$store.state.teaser.btn.color">Цвет текста кнопки</ColorInput>
      <ColorInput v-model="$store.state.teaser.btn.backgroundColor">Цвет фона кнопки</ColorInput>
      <SettingsInput v-model="$store.state.teaser.btn.borderRadius" max="100" min="0" type="number">Скругление кнопки</SettingsInput>
      <Toggle v-model="$store.state.teaser.btn.bold">Текст жирный</Toggle>
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
    };
  },
};
</script>
<style scoped>
.settings-text {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
}
</style>