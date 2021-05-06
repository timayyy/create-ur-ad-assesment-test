import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
    universityListReducer, universitySearchReducer, universityFilterReducer, universityCreateReducer, universityDeleteReducer, universityDetailsReducer, universityUpdateReducer
} from "./reducers/universityReducers";

const reducer = combineReducers({
    universityList: universityListReducer,
    universitySearch: universitySearchReducer,
    universityFilter: universityFilterReducer,
    universityCreate: universityCreateReducer,
    universityDelete: universityDeleteReducer,
    universityDetails: universityDetailsReducer,
    universityUpdate: universityUpdateReducer,
});




const initialState = {
    universityList: { universities: [] }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;