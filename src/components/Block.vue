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
  data() {
    return {
      gap: this.$store.state.block.gap,
      padding: this.$store.state.block.padding,
      blockWidth: this.$store.state.block.width,
      blockHeight: this.$store.state.block.height,
      countH: this.$store.state.block.countH,
      countV: this.$store.state.block.countV,
    }
  },
  watch: {
    gap(newGap) {
      this.updateGap(newGap);
    },
    padding(newPadding) {
      this.updatePadding(newPadding);
    },
    blockWidth(value) {
      this.updateBlockWidth(value);
    },
    blockHeight(value) {
      this.updateBlockHeight(value);
    },
    countH(value) {
      this.updateAdsHorizontal(value);
    },
    countV(value) {
      this.updateAdsVertical(value);
    },
  },
  computed: {
    ...mapState({
      block: state => state.block,
    }),
  },
  methods: {
    ...mapActions(['updateBlockWidth', 'updateAdsHorizontal', 'updateBlockHeight', 'updateAdsVertical', 'updateGap', 'updatePadding']),
  },
}
</script>