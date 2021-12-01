import {combineReducers} from "redux";

const membersAbsent = (state = [], action) => {
    switch (action.type) {
        case 'membersAbsent':
            return action.mutation
        default:
            return state
    }
}

const allReducers = combineReducers({
    membersAbsent
});

export default allReducers
