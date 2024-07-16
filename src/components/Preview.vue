<template>
  <h3 v-if="state.block.name">{{ state.block.name }}</h3>
  <div :class="cssClass" :style="blockStyle" class="enigmas">
    <div ref="list" :style='state.block.isMobile ? listStyleMobile : listStyle' class="enigmas__list">
      <a v-for="n in teaserCount" :key="n" :class="{'enigma__zoom': state.teaser.zoom, 'enigma__hover': state.text.hover}" :style="teaserStyle" class="enigmas__enigma" href="{url}">
        <div :style="imageStyle" class="enigma__picture">
          <img
              :src="`https://loremflickr.com/500/500?lock=${n}`"
          />
        </div>
        <div :style="contentStyle" class="enigma__footer">
          <p :style="textStyle" class="enigma__text" @mouseleave="hover = false" @mouseover="hover = true">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem molestiae cum minus.
          </p>
          <div v-if="state.teaser.showBtn" :style="btnStyle" class="enigma__btn" @mouseleave="btnHover = false" @mouseover="btnHover = true">
            {{ state.btn.text }}
          </div>
        </div>
      </a>
    </div>
  </div>
  <div class="mt-4 d-flex justify-content-end">
    <button class="btn btn-accent" @click="getPayload">Сохранить</button>
  </div>
</template>

<script>
import {toBlob} from 'html-to-image';

export default {
  props: {
    state: Object,
  },
  data() {
    return {
      hover: false,
      btnHover: false,
    }
  },
  methods: {
    convertToCss(styleObj, selector) {
      const styles = Object.entries(styleObj).map(([key, value]) => {
        const kebabKey = key.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase())
        return `${kebabKey}: ${value};`;
      }).join(' ');
      return `${selector} { ${styles} }`;
    },
    async getPayload(e) {
      e.target.disabled = true
      let {csrfToken, user, url, returnUrl, site} = document.getElementById('app').dataset;
      let formData = new FormData()
      let name = this.cssClass
      formData.append('_csrf', csrfToken)
      formData.append('CommonTemplate[name]', this.state.block.name || name + '-template')
      formData.append('CommonTemplate[max_teaser]', this.teaserCount)
      formData.append('CommonTemplate[max_column]', this.state.block.countH)
      formData.append('CommonTemplate[max_row]', this.state.block.countV)
      formData.append('CommonTemplate[width]', this.state.block.width)
      formData.append('CommonTemplate[height]', this.state.block.height)
      formData.append('CommonTemplate[is_common]', 0)
      formData.append('CommonTemplate[user_id]', user)
      formData.append('SiteBlock[settings]', JSON.stringify(this.state))
      formData.append('SiteBlock[site_id]', site)
      formData.append('SiteBlock[name]', this.state.block.name || name)

      formData.append('TeaserTemplate[name]', this.state.block.name || name + '-teaser')
      formData.append('TeaserTemplate[user_id]', user)
      formData.append('TeaserTemplate[is_common]', 0)
      formData.append('TeaserTemplate[css]', this.teaserCssRules)
      formData.append('TeaserTemplate[html]', `<a class="enigmas__enigma" href="{url}"  target="_blank" {data}>
        <div class="enigma__picture"><img src="{imgUrl}"/></div>
        <div class="enigma__footer">
          <p class="enigma__text">{text}</p>${this.state.teaser.showBtn ? '<div class="enigma__btn">' + this.state.btn.text + '</div>' : ''}
        </div>
      </a>`)

      formData.append('SiteBlockTemplate[name]', this.state.block.name || name + '-block')
      formData.append('SiteBlockTemplate[user_id]', user)
      formData.append('SiteBlockTemplate[is_common]', 0)
      let blockStyle = this.convertToCss(this.blockStyle, `${this.cssSelector}`)
      blockStyle += this.convertToCss(this.listStyle, `${this.cssSelector} .enigma__list`)
      if (this.state.block.responsive) {
        blockStyle += `@container banana (max-width: ${this.state.block.breakpoint}px){${this.convertToCss(this.listStyleMobile, `${this.cssSelector} .enigma__list`)}} `
      }
      formData.append('SiteBlockTemplate[css]', blockStyle)
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
          Object.keys(resp.errors).forEach(key => {
            if (Object.keys(resp.errors[key]).length) {
              Object.keys(resp.errors[key]).forEach(field => {
                resp.errors[key][field].forEach(errorMsg => {
                  notify(`Ошибка ${key}[${field}]: ${errorMsg}`, 'danger')
                })
              })
            }
          })
          console.error(resp.errors)
          e.target.disabled = false
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
    blockStyle() {
      let adaptive = {
        maxWidth: `${this.state.block.width}px!important`,
        width: "100%!important",
        height: 'auto!important',
      }
      let normal = {width: `${this.state.block.width}px!important`, height: `${this.state.block.height}px!important`}
      return {
        borderBottom: this.state.block.bb ? `${this.state.block.borderWidth}px ${this.state.block.borderStyle} ${this.state.block.borderColor}` : 'none',
        borderTop: this.state.block.bt ? `${this.state.block.borderWidth}px ${this.state.block.borderStyle} ${this.state.block.borderColor}` : 'none',
        borderLeft: this.state.block.bl ? `${this.state.block.borderWidth}px ${this.state.block.borderStyle} ${this.state.block.borderColor}` : 'none',
        borderRight: this.state.block.br ? `${this.state.block.borderWidth}px ${this.state.block.borderStyle} ${this.state.block.borderColor}` : 'none',
        borderRadius: `${this.state.block.borderRadius}px!important`,
        ...(this.state.block.responsive ? adaptive : normal)
      }
    },
    listStyle() {
      return {
        display: "grid!important",
        gridTemplateColumns: `repeat(${this.state.block.countH}, 1fr)!important`,
        gap: `${this.state.block.gap}px!important`,
        backgroundColor: `${this.state.block.backgroundColor} !important`,
        paddingBlock: `${this.state.block.paddingBlock}px!important`,
        paddingInline: `${this.state.block.paddingInline}px!important`,
      }
    },
    listStyleMobile() {
      return {
        display: "grid!important",
        gap: `${this.state.block.gap}px!important`,
        backgroundColor: `${this.state.block.backgroundColor} !important`,
        paddingBlock: `${this.state.block.paddingBlock}px!important`,
        paddingInline: `${this.state.block.paddingInline}px!important`,
      }
    },
    teaserStyle() {
      let grid = {
        gridTemplateColumns: `${this.state.teaser.imgFr}fr ${this.state.teaser.textFr}fr`,
        gridTemplateRows: '1fr',
      }
      if (this.state.teaser.text === 'bottom') {
        grid.gridTemplateColumns = '1fr'
        grid.gridTemplateRows = `${this.state.teaser.imgFr}fr ${this.state.teaser.textFr}fr`
      }
      if (this.state.teaser.text === 'left') {
        grid.gridTemplateColumns = `${this.state.teaser.textFr}fr ${this.state.teaser.imgFr}fr`
        grid.gridTemplateRows = '1fr'
      }
      let adaptive = {
        maxWidth: `${this.state.teaser.width}px!important`,
        width: "100%!important",
        height: `${this.state.teaser.height}px!important`,
      }
      let normal = {width: `${this.state.teaser.width}px!important`, height: `${this.state.teaser.height}px!important`}
      return {
        display: 'grid!important',
        ...(this.state.text.hover && {filter: "none"}),
        paddingBlock: `${this.state.teaser.paddingBlock}px!important`,
        paddingInline: `${this.state.teaser.paddingInline}px!important`,
        gridTemplateColumns: grid.gridTemplateColumns,
        gridTemplateRows: grid.gridTemplateRows,
        gap: `${this.state.teaser.gap}px!important`,
        ...(this.state.block.responsive ? adaptive : normal),
        borderRadius: `${this.state.teaser.borderRadius}px`,
        border: this.state.teaser.showBorder ? '1px solid #D9D9D9 !important' : 'none',
        backgroundColor: `${this.state.teaser.backgroundColor}!important`,
        overflow: "hidden",
        boxShadow: this.state.teaser.shadow ? "0 0 5px rgba(0,0,0,.5)" : "none",
      };
    },
    imageStyle() {
      let grid = {
        col: '1/2',
        row: '1/2',
        coverCol: '1/3',
        coverRow: '1/2',
      };
      if (this.state.teaser.text === 'bottom') {
        grid.col = '1/2'
        grid.row = '1/2'
        grid.coverCol = '1/2'
        grid.coverRow = '1/3'
      }
      if (this.state.teaser.text === 'left') {
        grid.col = '2/3'
        grid.row = '1/2'
        grid.coverCol = '1/3'
        grid.coverRow = '1/2'
      }
      if (this.state.image.cover) {
        grid.col = grid.coverCol
        grid.row = grid.coverRow
      }
      return {
        width: this.state.image.cover ? `100%!important` : `${this.state.image.width}!important`,
        height: this.state.image.cover ? `100%!important` : `${this.state.image.height}!important`,
        borderTopLeftRadius: `${this.state.image.borderTopLeftRadius}px!important`,
        borderBottomLeftRadius: `${this.state.image.borderBottomLeftRadius}px!important`,
        borderTopRightRadius: `${this.state.image.borderTopRightRadius}px!important`,
        borderBottomRightRadius: `${this.state.image.borderBottomRightRadius}px!important`,
        justifySelf: `${this.state.image.justifySelf}!important`,
        alignSelf: `${this.state.image.alignSelf}!important`,
        gridColumn: grid.col,
        gridRow: grid.row,
      };
    },
    contentStyle() {
      let grid = {
        col: '2/3',
        row: '1/2',
      };
      if (this.state.teaser.text === 'bottom') {
        grid.col = '1/2'
        grid.row = '2/3'
      }
      if (this.state.teaser.text === 'left') {
        grid.col = '1/2'
        grid.row = '1/2'
      }
      return {
        paddingInline: `${this.state.text.paddingInline}px!important`,
        paddingBlock: `${this.state.text.paddingBlock}px!important`,
        display: 'grid!important',
        maxWidth: `100%!important`,
        maxHeight: `100%!important`,
        gridColumn: grid.col,
        gridRow: grid.row,
        position: 'relative',
      }
    },
    textStyle() {
      return {
        ...(this.state.text.hover && {"--clr-hover-txt": this.state.text.colorHover}),
        fontFamily: this.state.text.fontFamily + '!important',
        lineHeight: `${this.state.text.lineHeight}px!important`,
        fontSize: `${this.state.text.fontSize}px!important`,
        color: this.hover && this.state.text.hover ? this.state.text.colorHover + '!important' : this.state.text.color + '!important',
        textAlign: this.state.text.textAlign + '!important',
        fontWeight: this.state.text.bold ? 700 : 400,
        textDecoration: this.state.text.underline ? `underline` : 'none',
        fontStyle: this.state.text.italic ? "italic!important" : "normal!important",
        textShadow: this.state.text.shadow ? "0 0 5px #000,0 0 3px #000,0 0 10px #000" : "none",
        transition: "color 0.3s",
      };
    },
    btnStyle() {
      return {
        ...this.state.btn,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '.5rem 0.25rem!important',
        height: `${this.state.btn.height}px`,
        width: this.state.btn.width ? `${this.state.btn.width}px` : 'auto',
        justifySelf: this.state.btn.justifySelf,
        backgroundColor: this.btnHover && this.state.text.hover ? this.state.btn.backgroundHoverColor : this.state.btn.backgroundColor,
        borderRadius: `${this.state.btn.borderRadius}px`,
        marginTop: this.state.btn.marginTop !== null ? `${this.state.btn.marginTop}px!important` : 'auto!important',
        marginBottom: this.state.btn.marginBottom !== null ? `${this.state.btn.marginBottom}px!important` : 'auto!important',
        fontWeight: this.state.btn.bold ? 700 : 400,
        textDecoration: this.state.btn.underline ? `underline` : 'none',
        fontStyle: this.state.btn.italic ? "italic!important" : "normal!important",
        fontFamily: this.state.text.fontFamily + '!important',
        fontSize: `${this.state.btn.fontSize}px!important`,
        ...(this.state.text.hover && {"--clr-hover-btn": this.state.btn.backgroundHoverColor}),
      }
    },
  },
};
</script>

<style scoped>
h3 {
  color: #fff;
}
</style>