<template>
  <div class="teaser-content">
    <Select v-model="$store.state.text.fontStyle" :options="['normal','bold','italic']">Стиль теста</Select>
    <Select v-model="$store.state.text.fontFamily" :options="fonts">Шрифт</Select>
    <Select v-model="$store.state.text.textAlign" :options="textAlign">Выравнивание текста</Select>
    <SettingsInput v-model="$store.state.text.fontSize" max="22" min="8" type="number">Размер шрифта
    </SettingsInput>
    <SettingsInput v-model="$store.state.text.lineHeight" :step="0.1" min="0.8" type="number">Ширина линии
    </SettingsInput>
    <SettingsInput v-model="$store.state.text.paddingInline" max="200" min="0" type="number">Отступы Inline
    </SettingsInput>
    <SettingsInput v-model="$store.state.text.paddingBlock" max="200" min="0" type="number">Отступы Block
    </SettingsInput>
    <ColorInput v-model="$store.state.text.color">Цвет текста</ColorInput>
    <Toggle v-model="$store.state.teaser.showBtn">Показать кнопку</Toggle>
    <template v-if="$store.state.teaser.showBtn">
      <Select v-model="$store.state.btn.text" :options="btnText">Текст кнопки</Select>
      <ColorInput v-model="$store.state.btn.color">Цвет текста кнопки</ColorInput>
      <ColorInput v-model="$store.state.btn.backgroundColor">Цвет фона кнопки</ColorInput>
      <SettingsInput v-model="$store.state.btn.borderRadius" max="100" min="0" type="number">Скругление кнопки</SettingsInput>
      <SettingsInput v-model="$store.state.btn.marginTop" max="100" min="0" type="number">Отступ сверху</SettingsInput>
      <Toggle v-model="$store.state.btn.bold">Текст жирный</Toggle>
    </template>
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
  computed: {
    ...mapState({
      teaser: state => state.teaser,
    }),
  },
  methods: {
    ...mapActions(['updateTeaserWidth', 'updateTeaserHeight']),
  },
}
</script>
<style scoped>

</style>