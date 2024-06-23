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
                spacing: 0,
                backgroundColor: "#ffffff",
                borderRadius: 0,
                responsive: false,
            },
            teaser: {
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
                textBottom: true,
                width: 300,
                height: 200,
                borderRadius: 0,
                showBtn: false,
                btn: {
                    text: 'Узнать больше',
                    bold: false,
                    color: "#ffffff",
                    backgroundColor: "#165da8",
                    borderRadius: 0,

                }
            }
        }
    },
    mutations: {
        increment(state) {
            state.count++
        }
    }
})

export default store
