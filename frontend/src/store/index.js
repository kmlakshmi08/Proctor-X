import { configureStore } from "@reduxjs/toolkit"
import mainReducer from "./reducer.js" 
import { UPDATEFACEDETECTED,UPDATENUMOFFACES,UPDATEYESDETECTED} from "./types.js"


const store = configureStore({
    reducer: mainReducer
})
console.log("Init state : ",store.getState())

const unsubscribe = store.subscribe(()=>{console.log("Updated state : ",store.getState())})
store.dispatch({type : UPDATEFACEDETECTED,payload : true})
store.dispatch({type : UPDATEYESDETECTED,payload : true})
store.dispatch({type : UPDATENUMOFFACES,payload : 1})

unsubscribe();