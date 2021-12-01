import {createStore} from "redux";
import allReducers from "./reducers";



const GlobalStore = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export {
    GlobalStore
}
