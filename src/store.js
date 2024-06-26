import {createStore} from "vuex";

const store = createStore({
    state() {
        return {
            block: {
                name: "",
                type: 1,
                width: 300,
                height: 200,
                adsVertical: 1,
                adsHorizontal: 1,
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
        setAdsVertical(state, count) {
            state.block.adsVertical = count
        },
        setAdsHorizontal(state, count) {
            state.block.adsHorizontal = count
        },
        updateImage(state, payload) {
            state.image.width = payload.width !== null ? payload.width : 100; // Или другое значение по умолчанию
            state.image.height = payload.height !== null ? payload.height : 100; // Или другое значение по умолчанию
            state.image.aspectRatio = payload.aspectRatio;
        }
    },
    actions: {
        updateBlockWidth({commit, state}, width) {
            const teaserWidth = (width - state.block.padding * 2 - state.block.gap * (state.block.adsHorizontal - 1)) / state.block.adsHorizontal;
            commit('setBlockWidth', width);
            commit('setTeaserWidth', teaserWidth);
        },
        updateTeaserWidth({commit, state}, width) {
            const newBlockWidth = state.block.adsHorizontal * width + state.block.padding * 2 + state.block.gap * (state.block.adsHorizontal - 1);
            commit('setTeaserWidth', width);
            if (newBlockWidth > state.block.width) {
                commit('setBlockWidth', newBlockWidth);
            }
        },
        updateBlockHeight({commit, state}, height) {
            const teaserHeight = (height - state.block.padding * 2 - state.block.gap * (state.block.adsHorizontal - 1)) / state.block.adsHorizontal;
            commit('setBlockHeight', height);
            commit('setTeaserHeight', teaserHeight);
        },
        updateTeaserHeight({commit, state}, height) {
            const blockHeight = state.block.adsVertical * height + state.block.padding * 2 + state.block.gap * (state.block.adsHorizontal);
            commit('setTeaserHeight', height);
            commit('setBlockHeight', blockWidth > state.block.height ? blockWidth : state.block.height);
        },
        updateAdsHorizontal({commit, state}, count) {
            commit('setAdsHorizontal', count);
            const blockWidth = count * state.teaser.width + state.block.padding * 2 + state.block.gap * (count - 1);
            commit('setBlockWidth', blockWidth > state.block.width ? blockWidth : state.block.width);
        },
        updateAdsVertical({commit, state}, count) {
            commit('setAdsVertical', count);
            const blockHeight = count * state.teaser.height + state.block.padding * 2 + state.block.gap * (count - 1);
            commit('setBlockHeight', blockHeight > state.block.height ? blockHeight : state.block.height);
        }
    },
})

export default store