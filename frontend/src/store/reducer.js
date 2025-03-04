import { UPDATEFACEDETECTED,UPDATENUMOFFACES,UPDATEYESDETECTED} from "./types.js"

const initstate = {
    face: false,
    eyes: false,
    numfaces: 0
}

const mainReducer = (state = initstate,action)=>{
    switch(action.type){
        case UPDATEFACEDETECTED: return{ face: action.payload}
        case UPDATEYESDETECTED: return{ eyes: action.payload}
        case UPDATENUMOFFACES: return{ numfaces: action.payload}
    }
}

export default mainReducer