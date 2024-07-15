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
  <div :class="{'resize': $store.state.block.responsive}" class="preview">
    <div ref="banana" class="banana-xR96Z2uysHrhtfA8">
      <Preview v-if="showPreview" :state="$store.state"/>
    </div>
    <div v-if="$store.state.block.responsive" class="dimensions">
      <h3>Размеры блока содержащего тизерный блок</h3>
      <p>Ширина: {{ width }}px</p>
      <p>Высота: {{ height }}px</p>
    </div>
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
      width: 0,
      height: 0
    };
  },
  watch: {
    '$store.state.block.responsive'(value) {
      if (!value) {
        document.querySelector('.preview').removeAttribute('style');
      }
    }
  },
  methods: {
    createResizeObserver() {
      this.resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          this.width = entry.contentRect.width
          this.$store.state.block.isMobile = this.width <= this.$store.state.block.breakpoint
          this.height = entry.contentRect.height
        }
      });
      this.resizeObserver.observe(this.$refs.banana);
    },
    destroyResizeObserver() {
      if (this.resizeObserver) {
        this.resizeObserver.unobserve(this.$refs.banana);
        this.resizeObserver.disconnect();
      }
    }
  },
  mounted() {
    this.showPreview = true
    this.createResizeObserver();
  },
  beforeDestroy() {
    this.destroyResizeObserver();
  },
};
</script>

<style scoped>
.dimensions {
  display: grid;
  color: white;
  font-size: 1.2rem;
  font-weight: 700;

  p {
    margin: 0;
  }
}

.resize {
  resize: horizontal;
  max-width: 100%;
  overflow: hidden;
}
.btn-group input[type="radio"] {
  display: none;
}
</style>