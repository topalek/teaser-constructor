<template>
  <div class="block-settings">
    <SettingsInput v-model="$store.state.block.name" name="">Название блока:</SettingsInput>
    <Select v-model="countH" :options="[1,2,3,4,5,6,7]">Кол-во по-горизонтали:</Select>
    <Select v-model="countV" :options="[1,2,3,4,5,6,7]">Кол-во по-вертикали:</Select>
    <SettingsInput v-model="blockWidth" max="3000" min="20" type="number">Ширина блока</SettingsInput>
    <SettingsInput v-model="blockHeight" max="3000" min="20" type="number">Высота блока</SettingsInput>
    <SettingsInput v-model="padding" max="200" min="0" type="number">Отступ</SettingsInput>
    <SettingsInput v-model="gap" max="200" min="0" type="number">Gap</SettingsInput>
    <ColorPicker v-model="$store.state.block.backgroundColor">Цвет фона</ColorPicker>
    <Toggle v-model="$store.state.block.responsive">Адаптивный</Toggle>
  </div>
</template>

<script>
import SettingsInput from "./parts/SettingsInput.vue";
import Select from "./parts/Select.vue";
import ColorPicker from "./parts/ColorPicker.vue";
import Toggle from "./parts/Toggle.vue";
import {mapActions, mapState} from 'vuex';

export default {
  components: {Toggle, ColorPicker, Select, SettingsInput},
  computed: {
    ...mapState({
      block: state => state.block,
    }),
    gap: {
      get() {
        return this.block.gap;
      },
      set(value) {
        this.updateGap(value);
      }
    },
    padding: {
      get() {
        return this.block.padding;
      },
      set(value) {
        this.updatePadding(value);
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
  methods: {
    ...mapActions(['updateBlockWidth', 'updateCountH', 'updateBlockHeight', 'updateCountV', 'updateGap', 'updatePadding']),
  },
}
</script>