<template>
  <div class="block-content">
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

    <SettingsInput v-model="text.fontSize" max="25" min="8" type="number">Размер шрифта, px
    </SettingsInput>
    <SettingsInput v-model="text.lineHeight" max="50" min="8" type="number">Высота линии, px
    </SettingsInput>
    <SettingsInput v-model="text.paddingInline" max="50" min="0" type="number">Отступ по горизонтали, px</SettingsInput>
    <SettingsInput v-model="text.paddingBlock" max="50" min="0" type="number">Отступ по вертикали, px</SettingsInput>
    <Toggle v-model="text.shadow">Тень текста</Toggle>
    <ColorInput v-model="text.color">Цвет текста</ColorInput>
    <Toggle v-model="text.hover">Свой цвет текста при наведении</Toggle>
    <ColorInput v-if="text.colorHover" v-model="text.colorHover" name="text.colorHover">Цвет текста при наведении</ColorInput>
    <Toggle v-model="teaser.showBtn">Показать кнопку</Toggle>
    <div v-if="teaser.showBtn" class="btn-settings">
      <Select v-model="btn.text" :options="btnText">Текст кнопки</Select>
      <ColorInput v-model="btn.color">Цвет текста кнопки</ColorInput>
      <ColorInput v-model="btn.backgroundColor">Цвет фона кнопки</ColorInput>
      <ColorInput v-if="text.hover" v-model="btn.backgroundHoverColor">Цвет фона кнопки при наведении</ColorInput>
      <SettingsInput v-model="btn.fontSize" max="25" min="8" type="number">Размер шрифта кнопки, px</SettingsInput>
      <SettingsInput v-model="btn.width" max="250" min="50" type="number">Ширина кнопки, px</SettingsInput>
      <SettingsInput v-model="btn.height" max="50" min="0" type="number">Высота кнопки, px</SettingsInput>
      <SettingsInput v-model="btn.borderRadius" max="100" min="0" type="number">Скругление кнопки, px</SettingsInput>
      <SettingsInput v-model="marginTop" :empty="true" max="100" min="0" type="number">Отступ сверху, px</SettingsInput>
      <SettingsInput v-model="marginBottom" :empty="true" max="100" min="0" type="number">Отступ снизу, px</SettingsInput>
      <div class="font-settings">
        <div class="style">
          <label>Стиль шрифта</label>
          <div class="buttons">
            <label class="txt-btn font-weight-bold" title="Жирный">
              <input v-model="btn.bold" type="checkbox"/>
              Ж
            </label>
            <label class="txt-btn italic" title="Курсив">
              <input v-model="btn.italic" type="checkbox"/>
              К
            </label>
            <label class="txt-btn underline" title="Подчеркнутый">
              <input v-model="btn.underline" type="checkbox"/>
              Ч
            </label>
          </div>
        </div>
        <div class="alignment">
          <label>Выравнивание кнопки</label>
          <select v-model="btn.justifySelf" class="form-control">
            <option v-for="option in [{value:'auto',text: 'По-умолчанию'},{value:'start',text: 'Начало'},{value:'center',text: 'По-центру'},{value:'end',text: 'Конец'},]"
                    :key="option.value"
                    :selected="modelValue === option.value"
                    :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
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
  data() {
    return {
      fonts: [
        {value: '"Arial", sans-serif', text: 'Arial'},
        {value: '"Noto Sans", sans-serif', text: "Noto Sans"},
        {value: '"Noto Serif", serif', text: 'Noto Serif'},
        {value: '"Ysabeau Office", sans-serif', text: "Ysabeau Office"},
        {value: '"PT Sans", sans-serif', text: "PT Sans"},
        {value: '"PT Serif", serif', text: "PT Serif"},
        {value: "'Roboto', sans-serif", text: 'Roboto'},
        {value: '"Roboto Slab", serif', text: 'Roboto Slab'},
        {value: '"Source Sans 3", sans-serif', text: 'Source Sans'},
        {value: '"Forum", serif', text: 'Forum'},
        {value: '"Scada", sans-serif', text: 'Scada'},
        {value: '"Tinos", serif', text: 'Tinos'},
        {value: '"Alegreya Sans", sans-serif', text: 'Alegreya Sans'},
        {value: '"Lora", serif', text: 'Lora'},
        {value: '"Fira Sans", sans-serif', text: 'Fira Sans'},
        {value: '"Ubuntu", sans-serif', text: 'Ubuntu'},
        {value: '"Merriweather", serif', text: 'Merriweather'},
        {value: '"Literata", serif', text: 'Literata'},
        {value: '"Montserrat", sans-serif', text: 'Montserrat'},
        {value: '"Open Sans", sans-serif', text: 'Open Sans'},
      ],
      textAlign: [
        {value: "left", text: 'Слева'},
        {value: "center", text: 'По-центру'},
        {value: "right", text: 'Справа'},
      ],
      btnText: ["Узнать больше", "Узнать подробнее", "Подробнее", "Еще", "Читать далее"],
    }
  },
  computed: {
    ...mapState({
      teaser: state => state.teaser,
      text: state => state.text,
      btn: state => state.btn,
    }),
    marginTop: {
      get() {
        return this.btn.marginTop
      },
      set(value) {
        if (value.trim() === '') {
          this.btn.marginTop = null
          return
        }
        this.btn.marginTop = +value
      }
    },
    marginBottom: {
      get() {
        return this.btn.marginBottom
      },
      set(value) {
        if (value.trim() === '') {
          this.btn.marginBottom = null
          return
        }
        this.btn.marginBottom = +value
      }
    },
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

.buttons {
  grid-template-columns: repeat(3, 50px);
}

.btn-settings {
  display: grid;
  gap: 10px;
  padding: 1rem;
  border: 1px solid #242424;
  border-radius: 10px;
}
.font-settings {
  display: flex;
  justify-content: space-between;
}
.text-settings {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>