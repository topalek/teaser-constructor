<template>
  <div class="settings">
    <h2>Настройки</h2>
    <div aria-label="First group" class="btn-group me-2 mb-4" role="group">
      <label :class="{'active': active === 'block'}" class="btn btn-outline-secondary" for="block">Блок</label>
      <input id="block" v-model="active" autocomplete="off" class="btn-check" type="radio" value="block">
      <input id="teaser" v-model="active" autocomplete="off" class="btn-check" type="radio" value="teaser">
      <label :class="{'active': active === 'teaser'}" class="btn btn-outline-secondary" for="teaser">Тизер</label>
    </div>
    <BlockSettings v-show="active === 'block'"/>
    <TeaserSettings v-show="active === 'teaser'"/>
  </div>
    <div class="preview">
      <BlockPreview v-if="showPreview" :block="$store.state.block" :teaser="$store.state.teaser"/>
    </div>
</template>

<script>
import BlockSettings from "./components/BlockSettings.vue";
import BlockPreview from "./components/BlockPreview.vue";
import TeaserSettings from "./components/TeaserSettings.vue";

export default {
  components: {
    TeaserSettings,
    BlockSettings,
    BlockPreview,
  },
  data() {
    return {
      active: 'block',
      showPreview: false,
    };
  },
  mounted() {
    this.showPreview = true
  }
};
</script>

<style scoped>
.btn-group input[type="radio"] {
  display: none;
}
</style>