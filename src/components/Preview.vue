<template>
  <h3 v-if="$store.state.block.name">{{ $store.state.block.name }}</h3>
  <div :style="blockStyle" class="enigmas">
    <div class="enigmas__list" :style='listStyle'>
      <a href="{url}" v-for="n in teaserCount" :key="n" :style="teaserStyle" class="enigmas__enigma">
        <div :style="imageStyle" class="enigma__picture">
          <img
              :src="`https://picsum.photos/id/${n}/500/500`"
              :style="imageStyle"
          />
        </div>
        <div :style="contentStyle" class="enigma__footer">
          <p :style="textStyle" class="enigma__text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem molestiae cum minus.
          </p>
          <div v-if="state.teaser.showBtn" :style="btnStyle" class="enigma__btn">
            {{ state.btn.text }}
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    state: Object,
  },
  computed: {
    teaserCount() {
      return this.state.block.countV * this.state.block.countH;
    },
    btnStyle() {
      return {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40px',
        ...this.state.btn,
        borderRadius: `${this.state.btn.borderRadius}px`,
        marginTop: `${this.state.btn.marginTop}px!important`,
        fontWeight: this.state.btn.bold ? 'bold' : 'normal',
      }
    },
    listStyle() {
      return {
        display: "grid!important",
        gridTemplateColumns: `repeat(${this.state.block.countH}, 1fr)!important`,
        gap: `${this.state.block.gap}px!important`,
        backgroundColor: `${this.state.block.backgroundColor} !important`,
        padding: `${this.state.block.padding}px!important`,
      }
    },
    blockStyle() {
      return {
        ...(this.state.block.responsive ? {width: "100%", display: "flex!important", flexWrap: "wrap!important", height: 'auto!important'} : {width: `${this.state.block.width}px!important`, height: `${this.state.block.height}px!important`})
      }
    },
    teaserStyle() {
      return {
        padding: `${this.state.teaser.verticalPadding}px ${this.state.teaser.horizontalPadding}px!important`,
        display: 'grid!important',
        gridTemplateColumns: this.state.teaser.textBottom ? '1fr 1fr' : '1fr',
        gridTemplateRows: this.state.teaser.textBottom ? '1fr' : '1fr 1fr',
        width: `${this.state.teaser.width}px!important`,
        height: `${this.state.teaser.height}px!important`,
        flexDirection: this.state.teaser.textBottom ? 'column!important' : 'row!important',
        borderRadius: `${this.state.teaser.borderRadius}px`,
        border: this.state.teaser.showBorder ? '1px solid #D9D9D9 !important' : 'none',
        backgroundColor: `${this.state.teaser.backgroundColor}!important`,
        overflow: "hidden",
        ...(this.state.teaser.zoomOnHover && {
          transition: "transform 0.3s",
          ":hover": {transform: "scale(1.05)"},
        }),
      };
    },
    imageStyle() {
      return {
        width: `${this.state.image.width}!important`,
        height: `${this.state.image.height}!important`,
        borderTopLeftRadius: `${this.state.image.borderTopLeftRadius}px!important`,
        borderBottomLeftRadius: `${this.state.image.borderBottomLeftRadius}px!important`,
        borderTopRightRadius: `${this.state.image.borderTopRightRadius}px!important`,
        borderBottomRightRadius: `${this.state.image.borderBottomRightRadius}px!important`,
      };
    },
    contentStyle() {
      return {
        paddingInline: `${this.state.text.paddingInline}px!important`,
        paddingBlock: `${this.state.text.paddingBlock}px!important`,
      }
    },
    textStyle() {
      return {
        fontFamily: this.state.text.fontFamily + '!important',
        lineHeight: this.state.text.lineHeight + '!important',
        fontSize: `${this.state.text.fontSize}px!important`,
        color: this.state.text.color + '!important',
        textAlign: this.state.text.textAlign + '!important',
        fontWeight: this.state.text.fontStyle === "bold" ? "bold" : "normal",
        fontStyle: this.state.text.fontStyle === "italic" ? "italic" : "normal",
        transition: "color 0.3s",
      };
    },
    iconStyle() {
      return {
        fontSize: `${this.state.teaser.iconSize}px`,
        color: this.state.teaser.iconColor,
        transition: "color 0.3s",
        ...(this.state.teaser.hoverIconColor && {
          ":hover": {color: this.state.teaser.hoverIconColor},
        }),
      };
    },
  },
};
</script>

<style scoped>
h3 {
  color: #fff;
}
</style>