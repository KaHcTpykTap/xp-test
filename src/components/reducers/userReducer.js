import { SET_DATA } from '../actions/userActions';
import { collumnsItems, dataItems } from '../data/data';

const initialState = {
    data: dataItems,
    columns: collumnsItems
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA:
            return { ...state, data: action.payload }
        default:
            return state;
    }
}