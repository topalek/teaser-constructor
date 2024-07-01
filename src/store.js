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
                    const data = JSON.parse(settings);
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

export default store