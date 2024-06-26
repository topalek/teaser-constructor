<template>
  <div class="settings">
    <h2>Настройки</h2>
    <div aria-label="First group" class="btn-group me-2 mb-4" role="group">
      <label :class="{'active': active === 'block'}" class="btn btn-outline-secondary" for="block">Блок</label>
      <input id="block" v-model="active" autocomplete="off" class="btn-check" type="radio" value="block">
      <input id="teaser" v-model="active" autocomplete="off" class="btn-check" type="radio" value="teaser">
      <label :class="{'active': active === 'teaser'}" class="btn btn-outline-secondary" for="teaser">Тизер</label>
      <input id="image" v-model="active" autocomplete="off" class="btn-check" type="radio" value="image">
      <label :class="{'active': active === 'image'}" class="btn btn-outline-secondary" for="image">Картинка</label>
      <input id="content" v-model="active" autocomplete="off" class="btn-check" type="radio" value="content">
      <label :class="{'active': active === 'content'}" class="btn btn-outline-secondary" for="content">Контент</label>
    </div>
    <Block v-show="active === 'block'"/>
    <Ads v-show="active === 'teaser'"/>
    <Image v-show="active === 'image'"/>
    <Content v-show="active === 'content'"/>
  </div>
    <div class="preview">
      <Preview v-if="showPreview" :state="$store.state"/>
    </div>
</template>

<script>
import Block from "./components/Block.vue";
import Preview from "./components/Preview.vue";
import Ads from "./components/Ads.vue";
import Image from "./components/Image.vue";
import Content from "./components/Content.vue";

export default {
  components: {
    Content,
    Image,
    Ads,
    Block,
    Preview,
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