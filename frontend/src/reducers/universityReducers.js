import { UNIVERSITY_LIST_REQUEST, UNIVERSITY_LIST_SUCCESS, UNIVERSITY_LIST_FAIL, UNIVERSITY_SEARCH_FAIL, UNIVERSITY_SEARCH_REQUEST, UNIVERSITY_SEARCH_SUCCESS, UNIVERSITY_FILTER_REQUEST, UNIVERSITY_FILTER_SUCCESS, UNIVERSITY_FILTER_FAIL } from "../constants/universityConstants";

export const universityListReducer = (state = { universities: [] }, action) => {
    switch (action.type) {
        case UNIVERSITY_LIST_REQUEST:
            return { loading: true };
        case UNIVERSITY_LIST_SUCCESS:
            return { loading: false, universities: action.payload };
        case UNIVERSITY_LIST_FAIL:
            return { loading: false, error: action.payload };
        //   case UNIVERSITY_LIST_RESET:
        //     return { UNIVERSITYs: [] };
        default:
            return state;
    }
};

export const universitySearchReducer = (state = {}, action) => {
    switch (action.type) {
        case UNIVERSITY_SEARCH_REQUEST:
            return { loading: true };
        case UNIVERSITY_SEARCH_SUCCESS:
            return {
                loading: false,
            };
        case UNIVERSITY_SEARCH_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const universityFilterReducer = (state = {}, action) => {
    switch (action.type) {
        case UNIVERSITY_FILTER_REQUEST:
            return { loading: true };
        case UNIVERSITY_FILTER_SUCCESS:
            return {
                loading: false,
            };
        case UNIVERSITY_FILTER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};