<template>
  <h3 v-if="$store.state.block.name">{{ $store.state.block.name }}</h3>
  <div :class="cssClass" :style="blockStyle" class="enigmas">
    <div ref="list" :style='listStyle' class="enigmas__list">
      <a href="{url}" v-for="n in teaserCount" :key="n" :style="teaserStyle" class="enigmas__enigma">
        <div :style="imageStyle" class="enigma__picture">
          <img
              :src="`https://picsum.photos/id/${n}/500/500`"
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
  <div class="mt-4 d-flex justify-content-end">
    <button @click="getPayload">Сохранить</button>
  </div>
</template>

<script>
import {toBlob} from 'html-to-image';

export default {
  props: {
    state: Object,
  },
  methods: {
    convertToCss(styleObj, selector) {
      const styles = Object.entries(styleObj).map(([key, value]) => {
        const kebabKey = key.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase())
        return `${kebabKey}: ${value};`;
      }).join(' ');
      return `${selector} { ${styles} }`;
    },
    async getPayload() {
      let {csrfToken, user, url, returnUrl} = document.getElementById('app').dataset;
      let formData = new FormData()
      let name = this.cssClass
      formData.append('_csrf', csrfToken)

      formData.append('CommonTemplate[name]', this.state.block.name || name + '-template')
      formData.append('CommonTemplate[max_teaser]', this.teaserCount)
      formData.append('CommonTemplate[max_column]', this.state.block.countH)
      formData.append('CommonTemplate[max_row]', this.state.block.countV)
      formData.append('CommonTemplate[width]', this.state.block.width)
      formData.append('CommonTemplate[height]', this.state.block.height)
      formData.append('CommonTemplate[is_common]', false)
      formData.append('CommonTemplate[user_id]', user)

      formData.append('TeaserTemplate[name]', this.state.block.name || name + '-teaser')
      formData.append('TeaserTemplate[user_id]', user)
      formData.append('TeaserTemplate[is_common]', false)
      formData.append('TeaserTemplate[css]', this.teaserCssRules)
      formData.append('TeaserTemplate[html]', `<a class="enigmas__enigma" href="{url}"  target="_blank" {data}>
        <div class="enigma__picture"><img src="{imgUrl}"/></div>
        <div class="enigma__footer">
          <p class="enigma__text">{text}</p>${this.state.teaser.showBtn ? '<div class="enigma__btn">' + this.state.btn.text + '</div>' : ''}
        </div>
      </a>`)

      formData.append('SiteBlockTemplate[name]', this.state.block.name || name + '-teaser')
      formData.append('SiteBlockTemplate[user_id]', user)
      formData.append('SiteBlockTemplate[is_common]', false)
      formData.append('SiteBlockTemplate[css]', this.convertToCss(this.blockStyle, `${this.cssSelector}`) + this.convertToCss(this.listStyle, `${this.cssSelector} .enigma__list`))
      formData.append('SiteBlockTemplate[html]', `<div id="{id}" class="enigmas ${this.cssClass}"><div class="enigmas__list">{teasers}</div></div>`)
      toBlob(document.querySelector('.enigmas'), {skipFonts: true, preferredFontFormat: 'woff2'}).then(blob => {
        formData.append('CommonTemplate[imageFile]', blob, `${name}.png`)
        fetch(url,
            {
              method: 'post',
              mode: 'no-cors',
              body: formData,
              headers: {
                'X-CSRF-Token': csrfToken,
              }
            })
            .then(resp => resp.json()).then(resp => {
          if (resp.status) {
            window.location.href = returnUrl
          }
          console.error(resp.errors)
        })
      })
    }
  },
  computed: {
    teaserCssRules() {
      const rules = [];
      rules.push(this.convertToCss(this.teaserStyle, `${this.cssSelector} a.enigmas__enigma`));
      rules.push(this.convertToCss(this.imageStyle, `${this.cssSelector} .enigma__picture`));
      rules.push(this.convertToCss(this.contentStyle, `${this.cssSelector} .enigma__footer`));
      rules.push(this.convertToCss(this.textStyle, `${this.cssSelector} .enigma__text`));
      if (this.state.teaser.showBtn) {
        rules.push(this.convertToCss(this.btnStyle, `${this.cssSelector} .enigma__btn`));
      }

      return rules.join('');
    },
    cssSelector() {
      return `#{id}.enigmas.${this.cssClass}`
    },
    cssClass() {
      return `enigmas__custom-${(Math.random() + 1).toString(36).substring(7)}`
    },
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