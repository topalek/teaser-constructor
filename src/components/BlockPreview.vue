<template>
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
          <div v-if="teaserSettings.showBtn" :style="btnStyle" class="enigma__btn">
            {{ teaserSettings.btn.text }}
          </div>
        </div>

      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    blockSettings: Object,
    teaserSettings: Object,
  },
  computed: {
    teaserCount() {
      return this.blockSettings.adsVertical * this.blockSettings.adsHorizontal;
    },
    btnStyle() {
      return {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40px',
        ...this.teaserSettings.btn,
        borderRadius: `${this.teaserSettings.btn.borderRadius}px`,
        fontWeight: this.teaserSettings.btn.bold ? 'bold' : 'normal',
      }
    },
    listStyle() {
      return {
        display: "grid!important",
        gridTemplateColumns: `repeat(${this.blockSettings.adsHorizontal}, 1fr)!important`,
        gap: `${this.blockSettings.spacing}px!important`,
        backgroundColor: `${this.blockSettings.backgroundColor} !important`,
        padding: `${this.blockSettings.padding}px!important`,
      }
    },
    blockStyle() {
      let style = {
        borderRadius: `${this.blockSettings.borderRadius}px!important`,
        ...(this.blockSettings.responsive ? {width: "100%", display: "flex!important", flexWrap: "wrap!important", height: 'auto!important'} : {width: `${this.blockSettings.width}px!important`, height: `${this.blockSettings.height}px!important`})
      }
      console.log(style)
      return style
    },
    teaserStyle() {
      return {
        padding: `${this.teaserSettings.verticalPadding}px ${this.teaserSettings.horizontalPadding}px!important`,
        display: 'grid!important',
        gridTemplateColumns: this.teaserSettings.textBottom ? '1fr 1fr' : '1fr',
        gridTemplateRows: this.teaserSettings.textBottom ? '1fr' : '1fr 1fr',
        width: `${this.teaserSettings.width}px!important`,
        height: `${this.teaserSettings.height}px!important`,
        flexDirection: this.teaserSettings.textBottom ? 'column!important' : 'row!important',
        borderRadius: `${this.teaserSettings.borderRadius}px`,
        overflow: "hidden",
        ...(this.teaserSettings.zoomOnHover && {
          transition: "transform 0.3s",
          ":hover": {transform: "scale(1.05)"},
        }),
      };
    },
    imageStyle() {
      return {
        width: `${this.teaserSettings.imageSize}px`,
        aspectRatio: this.teaserSettings.aspectRatio,
        // borderRadius: `${this.teaserSettings.borderRadius}px`,
      };
    },
    textStyle() {
      return {
        fontFamily: this.teaserSettings.text.fontFamily + '!important',
        lineHeight: this.teaserSettings.text.lineHeight + '!important',
        fontSize: `${this.teaserSettings.text.fontSize}px!important`,
        color: this.teaserSettings.text.color + '!important',
        textAlign: this.teaserSettings.text.textAlign + '!important',
        fontWeight: this.teaserSettings.text.fontStyle === "bold" ? "bold" : "normal",
        fontStyle: this.teaserSettings.text.fontStyle === "italic" ? "italic" : "normal",
        paddingInline: `${this.teaserSettings.text.paddingInline}px!important`,
        paddingBlock: `${this.teaserSettings.text.paddingBlock}px!important`,
        transition: "color 0.3s",
      };
    },
    iconStyle() {
      return {
        fontSize: `${this.teaserSettings.iconSize}px`,
        color: this.teaserSettings.iconColor,
        transition: "color 0.3s",
        ...(this.teaserSettings.hoverIconColor && {
          ":hover": {color: this.teaserSettings.hoverIconColor},
        }),
      };
    },
  },
};
</script>

<style scoped>

</style>
