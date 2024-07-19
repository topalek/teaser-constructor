<template>
  <div class="block-settings">
    <SettingsInput v-model="block.name">Название блока:</SettingsInput>
    <Select v-model="type" :options="types">Тип блока</Select>
    <Select v-model="countH" :options="[1,2,3,4,5,6,7,8,9,10]">Кол-во тизеров по-горизонтали:</Select>
    <Select v-model="countV" :options="[1,2,3,4,5,6,7,8,9,10]">Кол-во тизеров по-вертикали:</Select>
    <SettingsInput v-model="blockWidth" max="3000" min="20" type="number">Ширина блока, px</SettingsInput>
    <SettingsInput v-model="blockHeight" max="3000" min="20" type="number">Высота блока, px</SettingsInput>
    <SettingsInput v-model="paddingInline" max="100" min="0" type="number">Отступ по горизонтали, px</SettingsInput>
    <SettingsInput v-model="paddingBlock" max="100" min="0" type="number">Отступ по вертикали, px</SettingsInput>
    <SettingsInput v-model="gap" max="20" min="0" type="number">Расстояние между тизерами, px</SettingsInput>
    <SettingsInput v-model="block.borderRadius" max="100" min="0" type="number">Скругление, px</SettingsInput>
    <ColorPicker v-model="block.backgroundColor">Цвет фона</ColorPicker>
    <div class="adaptive">
      <Toggle v-model="block.responsive">Адаптивный</Toggle>
      <div v-if="block.responsive" class="adaptive-settings">
        <SettingsInput v-model="block.breakpoint" max="1000" min="20" type="number">Ширина блока для перестройки тизеров, px</SettingsInput>
        <Select v-model="block.adaptiveBy" :options="[{value:'media',text: 'Устройство'},{value:'container',text: 'Контейнер'}]">Адаптив в зависимости от:</Select>
      </div>
    </div>
    <div class="border-settings">
      <label>Границы</label>
      <div class="buttons">
        <label class="" title="Левая">
          <input v-model="bl" type="checkbox"/>
          <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M3.5 3c-.6 0-1 .4-1 1v16c0 .6.4 1 1 1s1-.4 1-1V4c0-.6-.4-1-1-1m4 8c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m4 0c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m4 0c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m4 0c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m-12-8c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m4 0c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m4 0c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m4 2c.6 0 1-.4 1-1s-.4-1-1-1s-1 .4-1 1s.4 1 1 1m0 2c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m0 8c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m-8-8c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m0 8c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m-4 4c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m4 0c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m4 0c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m4 0c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1"
                fill="currentColor"/>
          </svg>
        </label>
        <label class="" title="Верхняя">
          <input v-model="bt" type="checkbox"/>
          <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M4 4.5h16c.6 0 1-.4 1-1s-.4-1-1-1H4c-.6 0-1 .4-1 1s.4 1 1 1m8 2c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m0 4c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m0 4c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m0 4c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m8-12c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m0 4c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m0 4c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m0 4c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m-4 0c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m-8 0c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m8-8c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m-8 0c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m-4-4c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m0 4c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m0 4c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m0 4c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1"
                fill="currentColor"/>
          </svg>
        </label>
        <label class="" title="Все">
          <input v-model="allBorder" type="checkbox"/>
          <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M20 3H4c-.6 0-1 .4-1 1v16c0 .6.4 1 1 1h16c.6 0 1-.4 1-1V4c0-.6-.4-1-1-1m-1 16H5V5h14zm-7-6c.6 0 1-.4 1-1s-.4-1-1-1s-1 .4-1 1s.4 1 1 1m0 4c.6 0 1-.4 1-1s-.4-1-1-1s-1 .4-1 1s.4 1 1 1m0-8c.6 0 1-.4 1-1s-.4-1-1-1s-1 .4-1 1s.4 1 1 1m-4 4c.6 0 1-.4 1-1s-.4-1-1-1s-1 .4-1 1s.4 1 1 1m8 0c.6 0 1-.4 1-1s-.4-1-1-1s-1 .4-1 1s.4 1 1 1"
                fill="currentColor"/>
          </svg>
        </label>
        <label class="" title="Правая">
          <input v-model="br" type="checkbox"/>
          <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M20.5 3c-.6 0-1 .4-1 1v16c0 .6.4 1 1 1s1-.4 1-1V4c0-.6-.4-1-1-1m-4 8c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m-4 0c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m-4 0c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m-4 0c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m12 8c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m-4 0c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m-4 0c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m-4 0c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m0-4c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m0-8c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m8 8c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m0-8c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m4-4c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m-4 0c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m-4 0c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m-4 0c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1"
                fill="currentColor"/>
          </svg>
        </label>
        <label class="" title="Нижняя">
          <input v-model="bb" type="checkbox"/>
          <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12 9.5c.6 0 1-.4 1-1s-.4-1-1-1s-1 .4-1 1s.4 1 1 1m0 4c.6 0 1-.4 1-1s-.4-1-1-1s-1 .4-1 1s.4 1 1 1m0 4c.6 0 1-.4 1-1s-.4-1-1-1s-1 .4-1 1s.4 1 1 1m0-12c.6 0 1-.4 1-1s-.4-1-1-1s-1 .4-1 1s.4 1 1 1m8 0c.6 0 1-.4 1-1s-.4-1-1-1s-1 .4-1 1s.4 1 1 1m-12 0c.6 0 1-.4 1-1s-.4-1-1-1s-1 .4-1 1s.4 1 1 1m8 0c.6 0 1-.4 1-1s-.4-1-1-1s-1 .4-1 1s.4 1 1 1m0 8c.6 0 1-.4 1-1s-.4-1-1-1s-1 .4-1 1s.4 1 1 1m-12-4c.6 0 1-.4 1-1s-.4-1-1-1s-1 .4-1 1s.4 1 1 1m16 6c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m0-4c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m0-4c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m0 12H4c-.6 0-1 .4-1 1s.4 1 1 1h16c.6 0 1-.4 1-1s-.4-1-1-1m-16-6c.6 0 1-.4 1-1s-.4-1-1-1s-1 .4-1 1s.4 1 1 1m0-8c.6 0 1-.4 1-1s-.4-1-1-1s-1 .4-1 1s.4 1 1 1m4 8c.6 0 1-.4 1-1s-.4-1-1-1s-1 .4-1 1s.4 1 1 1m-4 4c.6 0 1-.4 1-1s-.4-1-1-1s-1 .4-1 1s.4 1 1 1"
                fill="currentColor"/>
          </svg>
        </label>
      </div>
      <div v-if="isBorder" class="border-detail">
        <SettingsInput v-model="borderWidth" max="20" min="1" type="number">Ширина границы, px</SettingsInput>
        <Select v-model="block.borderStyle" :options="[
            {value:'solid',text: 'Сплошная'},
            {value:'dashed',text: 'Пунктир'},
            {value:'dotted',text: 'Точками'},
            {value:'double',text: 'Двойная'},
            ]">Стиль границы</Select>
        <ColorPicker v-model="block.borderColor">Цвет границы</ColorPicker>
      </div>
    </div>
  </div>
</template>

<style scoped>
.border-settings {
  padding: .3rem 2rem 1rem;
  border: 1px solid #555;
  border-radius: 10px;
  margin-bottom: 10px;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(5, 60px);

  label, button {
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    border: 1px solid #ccc;
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
    border: 1px solid #b7b530;
  }
}
</style>
<script>
import SettingsInput from "./parts/SettingsInput.vue";
import Select from "./parts/Select.vue";
import ColorPicker from "./parts/ColorPicker.vue";
import Toggle from "./parts/Toggle.vue";
import {mapActions, mapState} from 'vuex';

export default {
  components: {Toggle, ColorPicker, Select, SettingsInput},
  data() {
    return {
      type: 1,
      types: [
        {value: 1, text: 'Блок текст снизу с кнопкой'},
        {value: 2, text: 'Текст справа без кнопки'},
        {value: 3, text: 'Текст поверх изображения'},
        {value: 4, text: 'Текст под изображением'},
        {value: 5, text: 'Текст поверх картинки с кнопкой'},
        {value: 6, text: 'Текст справа с кнопкой'},
      ],
      blocks: {
        1: {
          block: {
            width: 627,
            height: 270,
            countV: 1,
            countH: 3,
            paddingInline: 5,
            paddingBlock: 5,
            gap: 7,
            bb: false,
            bt: false,
            br: false,
            bl: false,
            borderStyle: 'solid',
            borderWidth: 1,
            borderRadius: 0,
            borderColor: "#000000ff",
            backgroundColor: "#ffffff80",
            responsive: false,
            breakpoint: 400,
            isMobile: false,
          },
          teaser: {text: 'bottom', width: 200, height: 260, gap: 5, borderRadius: 10, paddingInline: 0, paddingBlock: 0, showBorder: false, backgroundColor: '#ffffffff', showBtn: true, zoom: true, shadow: true, imgFr: 3, textFr: 2,},
          text: {
            bold: true,
            italic: false,
            underline: false,
            fontSize: 16,
            fontFamily: '"Roboto Slab", serif',
            lineHeight: 14,
            textSize: 14,
            color: "#000000",
            colorHover: "#FFFD58",
            paddingInline: 5,
            paddingBlock: 0,
            textAlign: 'left',
            shadow: false,
            hover: true,
          },
          image: {width: '100%', height: '100%', aspectRatio: '1:1', cover: false, justifySelf: 'auto', alignSelf: 'auto', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0,},
          btn: {
            text: 'Еще',
            textAlign: 'left',
            color: "#000000",
            backgroundColor: "#d1d1d1",
            backgroundHoverColor: "#FFFD58",
            borderRadius: 5,
            marginTop: 0,
            marginBottom: 0,
            width: 66,
            height: 28,
            fontSize: 14,
            justifySelf: 'end',
            bold: true,
            italic: false,
            underline: false,
          },
        },
        2: {
          block: {
            width: 520,
            height: 430,
            countV: 4,
            countH: 1,
            paddingInline: 5,
            paddingBlock: 5,
            gap: 7,
            bb: false,
            bt: false,
            br: false,
            bl: false,
            borderStyle: 'solid',
            borderWidth: 1,
            borderRadius: 0,
            borderColor: "#000000ff",
            backgroundColor: "#ffffff80",
            responsive: false,
            breakpoint: 400,
            isMobile: false
          },
          teaser: {
            "text": "right",
            "width": 510,
            "height": 100,
            "gap": 0,
            "borderRadius": 1,
            "paddingInline": 0,
            "paddingBlock": 0,
            "showBorder": false,
            "backgroundColor": "#ffffffff",
            "showBtn": false,
            "zoom": true,
            "shadow": true,
            "imgFr": "1",
            "textFr": "4"
          },
          text: {
            "bold": true,
            "italic": false,
            "underline": false,
            "fontSize": 16,
            "fontFamily": '"Roboto Slab", serif',
            "lineHeight": 14,
            "textSize": 14,
            "color": "#000000",
            "colorHover": "#FFFD58",
            "paddingInline": 5,
            "paddingBlock": 5,
            "textAlign": "left",
            "shadow": false,
            "hover": true
          },
          image: {"width": "95px", "height": "95px", "aspectRatio": "1:1", "cover": false, "justifySelf": "auto", "alignSelf": "auto", "borderTopLeftRadius": 0, "borderBottomLeftRadius": 0, "borderTopRightRadius": 0, "borderBottomRightRadius": 0},
          btn: {
            "text": "Еще",
            "textAlign": "left",
            "color": "#000000",
            "backgroundColor": "#d1d1d1",
            "backgroundHoverColor": "#FFFD58",
            "borderRadius": 5,
            "marginTop": 0,
            "marginBottom": 0,
            "width": 66,
            "height": 28,
            "fontSize": 14,
            "justifySelf": "end",
            "bold": true,
            "italic": false,
            "underline": false
          },
        },
        3: {
          block: {
            "width": 764,
            "height": 236,
            "countV": 1,
            "countH": 4,
            "paddingInline": 5,
            "paddingBlock": 5,
            "gap": 7,
            "bb": false,
            "bt": false,
            "br": false,
            "bl": false,
            "borderStyle": "solid",
            "borderWidth": 1,
            "borderRadius": 0,
            "borderColor": "#000000ff",
            "backgroundColor": "#ffffff80",
            "responsive": false,
            "breakpoint": 400,
            "isMobile": false
          },
          teaser: {
            "text": "bottom",
            "width": 183,
            "height": 226,
            "gap": 5,
            "borderRadius": 10,
            "paddingInline": 0,
            "paddingBlock": 0,
            "showBorder": false,
            "backgroundColor": "#ffffffff",
            "showBtn": false,
            "zoom": true,
            "shadow": true,
            "imgFr": 3,
            "textFr": 2
          },
          text: {
            "bold": true,
            "italic": false,
            "underline": false,
            "fontSize": 14,
            "fontFamily": '"Noto Sans", sans-serif',
            "lineHeight": 16,
            "textSize": 14,
            "color": "#ffffff",
            "colorHover": "#FFFD58",
            "paddingInline": 9,
            "paddingBlock": 0,
            "textAlign": "left",
            "shadow": true,
            "hover": true
          },
          image: {"width": "100%", "height": "100%", "aspectRatio": "1:1", "cover": true, "justifySelf": "auto", "alignSelf": "auto", "borderTopLeftRadius": 0, "borderBottomLeftRadius": 0, "borderTopRightRadius": 0, "borderBottomRightRadius": 0},
          btn: {
            "text": "Еще",
            "textAlign": "left",
            "color": "#000000",
            "backgroundColor": "#d1d1d1",
            "backgroundHoverColor": "#FFFD58",
            "borderRadius": 5,
            "marginTop": 0,
            "marginBottom": 0,
            "width": 66,
            "height": 28,
            "fontSize": 14,
            "justifySelf": "end",
            "bold": true,
            "italic": false,
            "underline": false
          },
        },
        4: {
          block: {
            "width": 560,
            "height": 236,
            "countV": 1,
            "countH": 3,
            "paddingInline": 5,
            "paddingBlock": 5,
            "gap": 7,
            "bb": false,
            "bt": false,
            "br": false,
            "bl": false,
            "borderStyle": "solid",
            "borderWidth": 1,
            "borderRadius": 0,
            "borderColor": "#000000ff",
            "backgroundColor": "#ffffff80",
            "responsive": false,
            "breakpoint": 400,
            "isMobile": false
          },
          teaser: {
            "text": "bottom",
            "width": 179,
            "height": 226,
            "gap": 5,
            "borderRadius": 10,
            "paddingInline": 0,
            "paddingBlock": 0,
            "showBorder": false,
            "backgroundColor": "#ffffffff",
            "showBtn": false,
            "zoom": true,
            "shadow": true,
            "imgFr": 3,
            "textFr": 2
          },
          text: {
            "bold": true,
            "italic": false,
            "underline": false,
            "fontSize": 16,
            "fontFamily": "\"Roboto Slab\", serif",
            "lineHeight": 14,
            "textSize": 14,
            "color": "#000000",
            "colorHover": "#c70000",
            "paddingInline": 5,
            "paddingBlock": 0,
            "textAlign": "left",
            "shadow": false,
            "hover": true
          },
          image: {"width": "100%", "height": "100%", "aspectRatio": "1:1", "cover": false, "justifySelf": "auto", "alignSelf": "auto", "borderTopLeftRadius": 0, "borderBottomLeftRadius": 0, "borderTopRightRadius": 0, "borderBottomRightRadius": 0},
          btn: {
            "text": "Еще",
            "textAlign": "left",
            "color": "#000000",
            "backgroundColor": "#d1d1d1",
            "backgroundHoverColor": "#FFFD58",
            "borderRadius": 5,
            "marginTop": 0,
            "marginBottom": 0,
            "width": 66,
            "height": 28,
            "fontSize": 14,
            "justifySelf": "end",
            "bold": true,
            "italic": false,
            "underline": false
          },
        },
        5: {
          block: {
            "width": 561,
            "height": 600,
            "countV": 3,
            "countH": 1,
            "paddingInline": 5,
            "paddingBlock": 5,
            "gap": 11,
            "bb": false,
            "bt": false,
            "br": false,
            "bl": false,
            "borderStyle": "solid",
            "borderWidth": 1,
            "borderRadius": 0,
            "borderColor": "#000000ff",
            "backgroundColor": "#ffffff80",
            "responsive": false,
            "breakpoint": 400,
            "isMobile": false
          },
          teaser: {
            "text": "left",
            "width": 551,
            "height": 189,
            "gap": 5,
            "borderRadius": 0,
            "paddingInline": 0,
            "paddingBlock": 0,
            "showBorder": false,
            "backgroundColor": "#ffffffff",
            "showBtn": true,
            "zoom": true,
            "shadow": true,
            "imgFr": "2",
            "textFr": 2
          },
          text: {
            "bold": true,
            "italic": false,
            "underline": false,
            "fontSize": 18,
            "fontFamily": "\"PT Sans\", sans-serif",
            "lineHeight": 25,
            "textSize": 14,
            "color": "#ffffff",
            "colorHover": "#c70000",
            "paddingInline": 5,
            "paddingBlock": 6,
            "textAlign": "left",
            "shadow": true,
            "hover": true
          },
          image: {"width": "100%", "height": "100%", "aspectRatio": "1:1", "cover": true, "justifySelf": "auto", "alignSelf": "auto", "borderTopLeftRadius": 0, "borderBottomLeftRadius": 0, "borderTopRightRadius": 0, "borderBottomRightRadius": 0},
          btn: {
            "text": "Еще",
            "textAlign": "left",
            "color": "#ffffff",
            "backgroundColor": "#00c26e",
            "backgroundHoverColor": "#006eb3",
            "borderRadius": 3,
            "marginTop": null,
            "marginBottom": 0,
            "width": 66,
            "height": 28,
            "fontSize": 14,
            "justifySelf": "start",
            "bold": true,
            "italic": false,
            "underline": false
          },
        },
        6: {
          block: {
            "width": 560,
            "height": 378,
            "countV": "3",
            "countH": "1",
            "paddingInline": 5,
            "paddingBlock": 5,
            "gap": 8,
            "bb": false,
            "bt": false,
            "br": false,
            "bl": false,
            "borderStyle": "solid",
            "borderWidth": 1,
            "borderRadius": 0,
            "borderColor": "#000000ff",
            "backgroundColor": "#ffffff80",
            "responsive": false,
            "breakpoint": 400,
            "isMobile": false
          },
          teaser: {
            "text": "right",
            "width": 550,
            "height": 117,
            "gap": 0,
            "borderRadius": 0,
            "paddingInline": 0,
            "paddingBlock": 0,
            "showBorder": false,
            "backgroundColor": "#ffffffff",
            "showBtn": true,
            "zoom": true,
            "shadow": true,
            "imgFr": "1",
            "textFr": "4"
          },
          text: {
            "bold": true,
            "italic": false,
            "underline": false,
            "fontSize": 18,
            "fontFamily": "\"Source Sans 3\", sans-serif",
            "lineHeight": 20,
            "textSize": 14,
            "color": "#000000",
            "colorHover": "#c70000",
            "paddingInline": 5,
            "paddingBlock": 6,
            "textAlign": "left",
            "shadow": false,
            "hover": true
          },
          image: {"width": "110px", "height": "110px", "aspectRatio": "1:1", "cover": false, "justifySelf": "auto", "alignSelf": "auto", "borderTopLeftRadius": 0, "borderBottomLeftRadius": 0, "borderTopRightRadius": 0, "borderBottomRightRadius": 0},
          btn: {
            "text": "Еще",
            "textAlign": "left",
            "color": "#ffffff",
            "backgroundColor": "#cccccc",
            "backgroundHoverColor": "#006eb3",
            "borderRadius": 3,
            "marginTop": null,
            "marginBottom": 0,
            "width": 66,
            "height": 28,
            "fontSize": 14,
            "justifySelf": "end",
            "bold": true,
            "italic": false,
            "underline": false
          },
        }
      }
    }
  },
  computed: {
    ...mapState({
      block: state => state.block,
    }),
    isBorder() {
      return this.block.br || this.block.bt || this.block.bl || this.block.bb
    },
    br: {
      get() {
        return this.block.br || this.border
      },
      set(value) {
        this.block.br = value
        this.updateBorderWidth(this.borderWidth);
      }
    },
    bt: {
      get() {
        return this.block.bt || this.border
      },
      set(value) {
        this.block.bt = value
        this.updateBorderWidth(this.borderWidth);
      }
    },
    bl: {
      get() {
        return this.block.bl || this.border
      },
      set(value) {
        this.block.bl = value
        this.updateBorderWidth(this.borderWidth);
      }
    },
    bb: {
      get() {
        return this.block.bb || this.border
      },
      set(value) {
        this.block.bb = value
        this.updateBorderWidth(this.borderWidth);
      }
    },
    borderWidth: {
      get() {
        return this.block.borderWidth
      },
      set(value) {
        this.updateBorderWidth(value);
      }
    },
    allBorder: {
      get() {
        return this.block.br && this.block.bt && this.block.bl && this.block.bb
      },
      set(value) {
        this.block.br = this.block.bt = this.block.bl = this.block.bb = value
        this.updateBorderWidth(this.borderWidth);
      }
    },
    gap: {
      get() {
        return this.block.gap;
      },
      set(value) {
        this.updateGap(value);
      }
    },
    paddingInline: {
      get() {
        return this.block.paddingInline;
      },
      set(value) {
        this.updatePaddingInline(value);
      }
    },
    paddingBlock: {
      get() {
        return this.block.paddingBlock;
      },
      set(value) {
        this.updatePaddingBlock(value);
      }
    },
    blockWidth: {
      get() {
        return this.block.width;
      },
      set(value) {
        this.updateBlockWidth(value);
      }
    },
    blockHeight: {
      get() {
        return this.block.height;
      },
      set(value) {
        this.updateBlockHeight(value);
      }
    },
    countH: {
      get() {
        return this.block.countH;
      },
      set(value) {
        this.updateCountH(value);
      }
    },
    countV: {
      get() {
        return this.block.countV;
      },
      set(value) {
        this.updateCountV(value);
      }
    },
  },
  watch: {
    type(newVal, oldVal) {
      let payload = this.blocks[newVal]
      if (Object.keys(payload).length) {
        this.updateState(payload)
      }
    }
  },
  methods: {
    ...mapActions(['updateBlockWidth', 'updateCountH', 'updateBlockHeight', 'updateCountV', 'updateGap', 'updatePaddingInline', 'updatePaddingBlock', 'updateBorderWidth', 'updateState']),
  },
}
</script>