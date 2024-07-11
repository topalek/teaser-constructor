<template>
  <div class="teaser-content">
    <div class="text-settings">
      <div class="alignment">
        <label>Выравнивание текста</label>
        <div class="buttons">
          <label title="Слева">
            <input v-model="text.textAlign" type="radio" value="left">
            <svg height="1em" viewBox="0 0 1200 1200" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M618.75 99.202v178.006H0V99.202zm328.125 274.53v178.006H0V373.732zM731.25 648.262v178.006H0V648.262zM1200 922.792v178.006H0V922.792z" fill="currentColor"/>
            </svg>
          </label>
          <label title="По-центру">
            <input v-model="text.textAlign" type="radio" value="center">
            <svg height="1em" viewBox="0 0 1200 1200" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M290.625 99.202v178.006h618.75V99.202zm-164.063 274.53v178.006h946.875V373.732zm107.813 274.53v178.006h731.25V648.262zM0 922.792v178.006h1200V922.792z" fill="currentColor"/>
            </svg>
          </label>
          <label title="Справа">
            <input v-model="text.textAlign" type="radio" value="right">
            <svg height="1em" viewBox="0 0 1200 1200" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M581.25 99.202v178.006H1200V99.202zm-328.125 274.53v178.006H1200V373.732zm215.625 274.53v178.006H1200V648.262zM0 922.792v178.006h1200V922.792z" fill="currentColor"/>
            </svg>
          </label>
        </div>
      </div>
      <div class="style">
        <label>Стиль шрифта</label>
        <div class="buttons">
          <label class="txt-btn font-weight-bold" title="Жирный">
            <input v-model="text.bold" type="checkbox"/>
            Ж
          </label>
          <label class="txt-btn italic" title="Курсив">
            <input v-model="text.italic" type="checkbox"/>
            К
          </label>
          <label class="txt-btn underline" title="Подчеркнутый">
            <input v-model="text.underline" type="checkbox"/>
            Ч
          </label>
        </div>
      </div>
      <div class="font">
        <label>Шрифт</label>
        <select v-model="text.fontFamily" class="form-control">
          <option v-for="option in fonts" :key="option.value || option" :selected="modelValue === (option.value || option)" :value="option.value || option">
            {{ option.text || option }}
          </option>
        </select>
      </div>
    </div>

    <SettingsInput v-model="text.fontSize" max="22" min="8" type="number">Размер шрифта, px
    </SettingsInput>
    <SettingsInput v-model="text.lineHeight" min="8" type="number">Высота линии, px
    </SettingsInput>
    <SettingsInput v-model="text.paddingInline" max="200" min="0" type="number">Отступ по горизонтали, px</SettingsInput>
    <SettingsInput v-model="text.paddingBlock" max="200" min="0" type="number">Отступ по вертикали, px</SettingsInput>
    <Toggle v-model="text.shadow">Тень текста</Toggle>
    <ColorInput v-model="text.color">Цвет текста</ColorInput>
    <Toggle v-model="teaser.showBtn">Показать кнопку</Toggle>
    <template v-if="teaser.showBtn">
      <Select v-model="$store.state.btn.text" :options="btnText">Текст кнопки</Select>
      <ColorInput v-model="$store.state.btn.color">Цвет текста кнопки</ColorInput>
      <ColorInput v-model="$store.state.btn.backgroundColor">Цвет фона кнопки</ColorInput>
      <SettingsInput v-model="$store.state.btn.borderRadius" max="100" min="0" type="number">Скругление кнопки, px</SettingsInput>
      <SettingsInput v-model="$store.state.btn.marginTop" max="100" min="0" type="number">Отступ сверху, px</SettingsInput>
      <Toggle v-model="$store.state.btn.bold">Текст жирный</Toggle>
      <Select v-model="$store.state.btn.justifySelf" :options="[
        {value:'auto',text: 'По-умолчанию'},
        {value:'start',text: 'Начало'},
        {value:'center',text: 'По-центру'},
        {value:'end',text: 'Конец'},
      ]">Выравнивание кнопки</Select>
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
        {value: "'Arial', sans-serif", text: 'Arial'},
        {value: "'League Gothic', sans-serif", text: 'League Gothic'},
        {value: '"Noto Sans", sans-serif', text: "Noto Sans"},
        {value: '"Ysabeau Office", sans-serif', text: "Ysabeau Office"},
        {value: '"PT Sans", sans-serif', text: "PT Sans"},
        {value: "'Roboto', sans-serif", text: 'Roboto'},
        {value: "'Georgia', serif", text: 'Georgia'},
        {value: "'Gill Sans', sans-serif", text: 'Gill Sans'},
        {value: "'Open Sans', sans-serif", text: 'Open Sans'},
        {value: "system-ui", text: 'System'},
      ],
      textAlign: [
        {value: "left", text: 'Слева'},
        {value: "center", text: 'По-центру'},
        {value: "right", text: 'Справа'},
      ],
      btnText: ["Узнать больше", "Подробнее", "Далее"],
    };
  },
  computed: {
    ...mapState({
      teaser: state => state.teaser,
      text: state => state.text,
    }),
  },
  methods: {
    ...mapActions(['updateTeaserWidth', 'updateTeaserHeight']),
  },
}
</script>
<style scoped>
.italic {
  font-style: italic;
  font-family: initial;
}

.underline {
  text-decoration: underline;
}

.text-settings {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  label, button {
    user-select: none;
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    border: 1px solid #e6e6e6;
    background-color: #e6e6e6;
    border-radius: 5px;
    font-size: 1.5rem;
    cursor: pointer;
    line-height: 1;
    text-align: center;
    padding: 0;

    &:hover {
      background-color: #cccccc;
    }
  }

  input {
    display: none;
  }

  label:has(:checked), .txt-btn.active {
    background-color: #FFFD58;
  }
}
</style>