import * as act from "../types.js"

const initstate = {
    username: "Initial Username",
    photo: ""
}

export const UserReducer = (state = initstate,action)=>{
    switch(action.type){
        case act.SETUSER: return{ ...state, username: action.payload.username,photo: action.payload.photo }
        default: return state;
    }
}