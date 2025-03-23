import * as act from "../types"

const initState = {
    mode: "Light"
}

export const themeReducer = (state = initState, action) => {
    switch (action.type) {
        case act.CHANGETHEME: return { theme: (state.theme === "light" ? "dark" : "light") }
        default: return initState;
    }
}