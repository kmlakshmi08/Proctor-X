import * as act from "../types.js"

const initstate = {
    id: "",
    username: "",
    photo: "",
    password:"",
};

export const UserReducer = (state = initstate, action) => {
    console.log(action);
    switch (action.type) {
        case act.SETUSER:
            return { 
                ...state, 
                id: action.payload.id, 
                username: action.payload.username, 
                photo: action.payload.photo 
            };

        case act.UPDATE_USERNAME:
            return {
                ...state,
                username: action.payload
            };
            case act.UPDATE_PASSWORD:
                return {
                    ...state,
                    password: action.payload
                };
        default:
            return state;
    }
};
