<template>
  <h3 v-if="$store.state.block.name">{{ $store.state.block.name }}</h3>
  <div :style="blockStyle" class="enigmas">
    <div class="enigmas__list" :style='listStyle'>
      <a href="{url}" v-for="n in teaserCount" :key="n" :style="teaserStyle" class="enigmas__enigma">
        <div class="enigma__picture">
          <img
              :src="`https://picsum.photos/id/${n}/500/500`"
              :style="imageStyle"
          />
        </div>
        <div class="enigma__footer">
          <p :style="textStyle" class="enigma__text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem molestiae cum minus.
          </p>
          <div v-if="teaser.showBtn" :style="btnStyle" class="enigma__btn">
            {{ teaser.btn.text }}
          </div>
        </div>

      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    block: Object,
    teaser: Object,
  },
  computed: {
    teaserCount() {
      return this.block.adsVertical * this.block.adsHorizontal;
    },
    btnStyle() {
      return {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40px',
        ...this.teaser.btn,
        borderRadius: `${this.teaser.btn.borderRadius}px`,
        fontWeight: this.teaser.btn.bold ? 'bold' : 'normal',
      }
    },
    listStyle() {
      return {
        display: "grid!important",
        gridTemplateColumns: `repeat(${this.block.adsHorizontal}, 1fr)!important`,
        gap: `${this.block.spacing}px!important`,
        backgroundColor: `${this.block.backgroundColor} !important`,
        padding: `${this.block.padding}px!important`,
      }
    },
    blockStyle() {
      let style = {
        borderRadius: `${this.block.borderRadius}px!important`,
        ...(this.block.responsive ? {width: "100%", display: "flex!important", flexWrap: "wrap!important", height: 'auto!important'} : {width: `${this.block.width}px!important`, height: `${this.block.height}px!important`})
      }
      console.log(style)
      return style
    },
    teaserStyle() {
      return {
        padding: `${this.teaser.verticalPadding}px ${this.teaser.horizontalPadding}px!important`,
        display: 'grid!important',
        gridTemplateColumns: this.teaser.textBottom ? '1fr 1fr' : '1fr',
        gridTemplateRows: this.teaser.textBottom ? '1fr' : '1fr 1fr',
        width: `${this.teaser.width}px!important`,
        height: `${this.teaser.height}px!important`,
        flexDirection: this.teaser.textBottom ? 'column!important' : 'row!important',
        borderRadius: `${this.teaser.borderRadius}px`,
        overflow: "hidden",
        ...(this.teaser.zoomOnHover && {
          transition: "transform 0.3s",
          ":hover": {transform: "scale(1.05)"},
        }),
      };
    },
    imageStyle() {
      return {
        width: `${this.teaser.imageSize}px`,
        aspectRatio: this.teaser.aspectRatio,
        // borderRadius: `${this.teaser.borderRadius}px`,
      };
    },
    textStyle() {
      return {
        fontFamily: this.teaser.text.fontFamily + '!important',
        lineHeight: this.teaser.text.lineHeight + '!important',
        fontSize: `${this.teaser.text.fontSize}px!important`,
        color: this.teaser.text.color + '!important',
        textAlign: this.teaser.text.textAlign + '!important',
        fontWeight: this.teaser.text.fontStyle === "bold" ? "bold" : "normal",
        fontStyle: this.teaser.text.fontStyle === "italic" ? "italic" : "normal",
        paddingInline: `${this.teaser.text.paddingInline}px!important`,
        paddingBlock: `${this.teaser.text.paddingBlock}px!important`,
        transition: "color 0.3s",
      };
    },
    iconStyle() {
      return {
        fontSize: `${this.teaser.iconSize}px`,
        color: this.teaser.iconColor,
        transition: "color 0.3s",
        ...(this.teaser.hoverIconColor && {
          ":hover": {color: this.teaser.hoverIconColor},
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
