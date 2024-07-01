import {createStore} from "vuex";

const store = createStore({
    state() {
        return {
            block: {
                name: "",
                type: 1,
                width: 300,
                height: 200,
                countV: 1,
                countH: 1,
                padding: 0,
                gap: 0,
                backgroundColor: "#ffffff",
                responsive: false,
            },
            text: {
                fontStyle: "normal",
                fontSize: 14,
                fontFamily: "Arial, sans-serif",
                lineHeight: 1.5,
                textSize: 14,
                color: "#000000",
                paddingInline: 0,
                paddingBlock: 0,
                textAlign: 'left',
            },
            image: {
                width: '100%',
                height: '100%',
                aspectRatio: '1:1',
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
            },
            btn: {
                text: 'Узнать больше',
                bold: false,
                color: "#ffffff",
                backgroundColor: "#165da8",
                borderRadius: 0,
                marginTop: 0,
            },
            teaser: {
                textBottom: true,
                width: 300,
                height: 200,
                borderRadius: 0,
                showBorder: false,
                backgroundColor: '#ffffff',
                showBtn: false,
            }
        }
    },
    mutations: {
        setState(state, payload) {
            state.block = payload.block;
            state.text = payload.text;
            state.image = payload.image;
            state.btn = payload.btn;
            state.teaser = payload.teaser;
        },
        setBlockWidth(state, width) {
            state.block.width = width;
        },
        setTeaserWidth(state, width) {
            state.teaser.width = width;
        },
        setBlockHeight(state, height) {
            state.block.height = height;
        },
        setTeaserHeight(state, height) {
            state.teaser.height = height;
        },
        setCountV(state, count) {
            state.block.countV = count
        },
        setCountH(state, count) {
            state.block.countH = count
        },
        updateImage(state, payload) {
            state.image.width = payload.width !== null ? payload.width : 100; // Или другое значение по умолчанию
            state.image.height = payload.height !== null ? payload.height : 100; // Или другое значение по умолчанию
            state.image.aspectRatio = payload.aspectRatio;
        },
        setBlockPadding(state, padding) {
            state.block.padding = padding;
        },
        setBlockGap(state, gap) {
            state.block.gap = gap;
        },
    },
    actions: {
        initializeStore({commit}) {
            const rootElement = document.getElementById('app');
            const settings = rootElement ? rootElement.getAttribute('data-settings') : null;

            if (settings) {
                try {
                    const data = JSON.parse(settings.replaceAll("'", '"'));
                    convertStringsToNumbers(data)
                    commit('setState', data);
                } catch (error) {
                    console.error('Error parsing JSON from data-settings:', error);
                }
            }
        },
        updatePadding({commit, state}, padding) {
            commit('setBlockPadding', padding);
            const teaserWidth = Math.round((state.block.width - padding * 2 - state.block.gap * (state.block.countH - 1)) / state.block.countH);
            const teaserHeight = Math.round((state.block.height - padding * 2 - state.block.gap * (state.block.countV - 1)) / state.block.countV);
            commit('setTeaserWidth', teaserWidth);
            commit('setTeaserHeight', teaserHeight);

        },
        updateGap({commit, state}, gap) {
            commit('setBlockGap', gap);
            const teaserWidth = Math.round((state.block.width - state.block.padding * 2 - gap * (state.block.countH - 1)) / state.block.countH);
            const teaserHeight = Math.round((state.block.height - state.block.padding * 2 - gap * (state.block.countV - 1)) / state.block.countV);
            commit('setTeaserWidth', teaserWidth);
            commit('setTeaserHeight', teaserHeight);
        },
        updateBlockWidth({commit, state}, width) {
            const teaserWidth = Math.round((width - state.block.padding * 2 - state.block.gap * (state.block.countH - 1)) / state.block.countH);
            commit('setBlockWidth', width);
            commit('setTeaserWidth', teaserWidth);
        },
        updateTeaserWidth({commit, state}, width) {
            const newBlockWidth = state.block.countH * width + state.block.padding * 2 + state.block.gap * (state.block.countH - 1);
            commit('setTeaserWidth', width);
            if (newBlockWidth > state.block.width) {
                commit('setBlockWidth', newBlockWidth);
            }
        },
        updateTeaserHeight({commit, state}, height) {
            const blockHeight = state.block.countV * height + state.block.padding * 2 + state.block.gap * (state.block.countV - 1);
            commit('setTeaserHeight', height);
            if (blockHeight > state.block.height) {
                commit('setBlockHeight', blockHeight);
            }
        },
        updateBlockHeight({commit, state}, height) {
            const teaserHeight = Math.round((height - state.block.padding * 2 - state.block.gap * (state.block.countH - 1)) / state.block.countH);
            commit('setBlockHeight', height);
            commit('setTeaserHeight', teaserHeight);
        },
        updateCountH({commit, state}, count) {
            commit('setCountH', count);
            const newBlockWidth = count * state.teaser.width + state.block.padding * 2 + state.block.gap * (count - 1);
            if (newBlockWidth > state.block.width) {
                commit('setBlockWidth', newBlockWidth);
            }
        },
        updateCountV({commit, state}, count) {
            commit('setCountV', count);
            const newBlockHeight = count * state.teaser.height + state.block.padding * 2 + state.block.gap * (count - 1);
            if (newBlockHeight > state.block.height) {
                commit('setBlockHeight', newBlockHeight);
            }
        }
    },
})

function convertStringsToNumbers(data) {
    if (data.block) {
        data.block.width = Number(data.block.width);
        data.block.height = Number(data.block.height);
        data.block.countV = Number(data.block.countV);
        data.block.countH = Number(data.block.countH);
        data.block.padding = Number(data.block.padding);
        data.block.gap = Number(data.block.gap);
    }
    if (data.text) {
        data.text.fontSize = Number(data.text.fontSize);
        data.text.lineHeight = Number(data.text.lineHeight);
        data.text.textSize = Number(data.text.textSize);
        data.text.paddingInline = Number(data.text.paddingInline);
        data.text.paddingBlock = Number(data.text.paddingBlock);
    }
    if (data.image) {
        data.image.borderTopLeftRadius = Number(data.image.borderTopLeftRadius);
        data.image.borderBottomLeftRadius = Number(data.image.borderBottomLeftRadius);
        data.image.borderTopRightRadius = Number(data.image.borderTopRightRadius);
        data.image.borderBottomRightRadius = Number(data.image.borderBottomRightRadius);
    }
    if (data.btn) {
        data.btn.borderRadius = Number(data.btn.borderRadius);
        data.btn.marginTop = Number(data.btn.marginTop);
    }
    if (data.teaser) {
        data.teaser.width = Number(data.teaser.width);
        data.teaser.height = Number(data.teaser.height);
        data.teaser.borderRadius = Number(data.teaser.borderRadius);
    }
}
export default store