<template>
    <BlockSettings @update-settings="updateBlockSettings" :teaserSettings="teaserSettings"/>
    <TeaserSettings @update-settings="updateTeaserSettings" :blockSettings="blockSettings"/>
    <div class="preview">
      <BlockPreview :blockSettings="blockSettings" :teaserSettings="teaserSettings" />
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
      text:555,
      blockSettings: {},
      teaserSettings: {},
    };
  },
  methods: {
    updateBlockSettings(settings) {
      this.blockSettings = settings;
    },
    updateTeaserSettings(settings) {
      this.teaserSettings = settings;
    },
  },
  mounted() {
    console.log(this.data)
  }
};
</script>
