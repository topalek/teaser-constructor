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
        updateBlockWidth(state, newWidth) {
            state.block.width = newWidth;
        },
        updateBlockHeight(state, newHeight) {
            state.block.height = newHeight;
        },
        updateTeaserWidth(state, newWidth) {
            state.teaser.width = newWidth;
        },
        updateTeaserHeight(state, newHeight) {
            state.teaser.height = newHeight;
        },
        setBlockSettings(state, settings) {
            state.block = {...state.block, ...settings};
            this.commit('recalculateTeaserDimensions');
            this.commit('recalculateBlockDimensions');
        },
        setTeaserSettings(state, settings) {
            state.teaser = {...state.teaser, ...settings};
            this.commit('recalculateTeaserDimensions');
            this.commit('recalculateBlockDimensions');
        },
        recalculateBlockDimensions(state) {
            const {countH, countV, padding, gap} = state.block;
            const newWidth = state.teaser.width * countH + padding * 2 + gap * (countH - 1);
            const newHeight = state.teaser.height * countV + padding * 2 + gap * (countV - 1);

            if (newWidth < state.block.width) {
                state.teaser.width = (state.block.width - padding * 2 - gap * (countH - 1)) / countH;
            } else {
                state.block.width = newWidth;
            }

            if (newHeight < state.block.height) {
                state.teaser.height = (state.block.height - padding * 2 - gap * (countV - 1)) / countV;
            } else {
                state.block.height = newHeight;
            }
        },
        recalculateTeaserDimensions(state) {
            const {countH, countV, padding, gap} = state.block;
            const maxWidth = (state.block.width - padding * 2 - gap * (countH - 1)) / countH;
            const maxHeight = (state.block.height - padding * 2 - gap * (countV - 1)) / countV;

            if (maxWidth < state.teaser.width) {
                state.teaser.width = maxWidth;
            }

            if (maxHeight < state.teaser.height) {
                state.teaser.height = maxHeight;
            }

            // Ensuring block dimensions match the calculated teaser dimensions
            const calculatedBlockWidth = state.teaser.width * countH + padding * 2 + gap * (countH - 1);
            const calculatedBlockHeight = state.teaser.height * countV + padding * 2 + gap * (countV - 1);

            state.block.width = Math.max(state.block.width, calculatedBlockWidth);
            state.block.height = Math.max(state.block.height, calculatedBlockHeight);
        },
        updateImage(state, payload) {
            state.image.width = payload.width !== null ? payload.width : 100; // Или другое значение по умолчанию
            state.image.height = payload.height !== null ? payload.height : 100; // Или другое значение по умолчанию
            state.image.aspectRatio = payload.aspectRatio;
        }
    },
    actions: {
        updateBlockSetting({commit}, settings) {
            commit('setBlockSettings', settings);
        },
        updateTeaserSetting({commit}, settings) {
            commit('setTeaserSettings', settings);
        }
    },
})

export default store