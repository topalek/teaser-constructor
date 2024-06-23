<template>
  <div class="block-settings">
    <SettingsInput v-model="$store.state.block.name" name="">Название блока:</SettingsInput>
    <Select v-model="$store.state.block.adsHorizontal" :options="[1,2,3,4,5,6,7]">Кол-во по-горизонтали:</Select>
    <Select v-model="$store.state.block.adsVertical" :options="[1,2,3,4,5,6,7]">Кол-во по-вертикали:</Select>
    <SettingsInput v-model="$store.state.block.width" max="3000" min="20" type="number">Ширина блока</SettingsInput>
    <SettingsInput v-model="$store.state.block.height" max="3000" min="20" type="number">Высота блока</SettingsInput>
    <SettingsInput v-model="$store.state.block.padding" max="200" min="0" type="number">Отступ</SettingsInput>
    <SettingsInput v-model="$store.state.block.spacing" max="200" min="0" type="number">Расстояние</SettingsInput>
    <SettingsInput v-model="$store.state.block.borderRadius" max="200" min="0" type="number">Скругление</SettingsInput>
    <ColorPicker v-model="$store.state.block.backgroundColor">Цвет фона</ColorPicker>
    <Toggle v-model="$store.state.block.responsive">Адаптивный</Toggle>
  </div>
</template>

<script>
import SettingsInput from "./parts/SettingsInput.vue";
import Select from "./parts/Select.vue";
import ColorPicker from "./parts/ColorPicker.vue";
import Toggle from "./parts/Toggle.vue";

export default {
  components: {Toggle, ColorPicker, Select, SettingsInput},
};
</script>
