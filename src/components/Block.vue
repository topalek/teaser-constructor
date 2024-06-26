<template>
  <div class="block-settings">
    <SettingsInput v-model="$store.state.block.name" name="">Название блока:</SettingsInput>
    <Select v-model="adsHorizontal" :options="[1,2,3,4,5,6,7]">Кол-во по-горизонтали:</Select>
    <Select v-model="adsVertical" :options="[1,2,3,4,5,6,7]">Кол-во по-вертикали:</Select>
    <SettingsInput v-model="blockWidth" max="3000" min="20" type="number">Ширина блока</SettingsInput>
    <SettingsInput v-model="blockHeight" max="3000" min="20" type="number">Высота блока</SettingsInput>
    <SettingsInput v-model="$store.state.block.padding" max="200" min="0" type="number">Отступ</SettingsInput>
    <SettingsInput v-model="$store.state.block.gap" max="200" min="0" type="number">Расстояние</SettingsInput>
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
    blockWidth: {
      get() {
        return this.block.width;
      },
      set(value) {
        this.updateBlockWidth(value);
      },
    },
    blockHeight: {
      get() {
        return this.block.height;
      },
      set(value) {
        this.updateBlockHeight(value);
      },
    },
    adsHorizontal: {
      get() {
        return this.block.adsHorizontal;
      },
      set(value) {
        this.updateAdsHorizontal(value);
      },
    },
    adsVertical: {
      get() {
        return this.block.adsVertical;
      },
      set(value) {
        this.updateAdsVertical(value);
      },
    },
  },
  methods: {
    ...mapActions(['updateBlockWidth', 'updateAdsHorizontal', 'updateBlockHeight', 'updateAdsVertical']),
  },
}
</script>