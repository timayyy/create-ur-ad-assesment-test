import { UNIVERSITY_LIST_REQUEST, UNIVERSITY_LIST_SUCCESS, UNIVERSITY_LIST_FAIL, UNIVERSITY_SEARCH_FAIL, UNIVERSITY_SEARCH_REQUEST, UNIVERSITY_SEARCH_SUCCESS, UNIVERSITY_FILTER_REQUEST, UNIVERSITY_FILTER_SUCCESS, UNIVERSITY_FILTER_FAIL, UNIVERSITY_CREATE_REQUEST, UNIVERSITY_CREATE_SUCCESS, UNIVERSITY_CREATE_FAIL, UNIVERSITY_DELETE_REQUEST, UNIVERSITY_DELETE_SUCCESS, UNIVERSITY_DELETE_FAIL, UNIVERSITY_CREATE_RESET, UNIVERSITY_DETAILS_REQUEST, UNIVERSITY_DETAILS_SUCCESS, UNIVERSITY_DETAILS_FAIL, UNIVERSITY_UPDATE_REQUEST, UNIVERSITY_UPDATE_SUCCESS, UNIVERSITY_UPDATE_FAIL, UNIVERSITY_UPDATE_RESET } from "../constants/universityConstants";

export const universityListReducer = (state = { universities: [] }, action) => {
    switch (action.type) {
        case UNIVERSITY_LIST_REQUEST:
            return { loading: true };
        case UNIVERSITY_LIST_SUCCESS:
            return { loading: false, universities: action.payload.data, start: action.payload.start, limit: action.payload.limit, previous: action.payload.previous, next: action.payload.next, pages: action.payload.pages };
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

export const universityCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case UNIVERSITY_CREATE_REQUEST:
            return { loading: true };
        case UNIVERSITY_CREATE_SUCCESS:
            return { loading: false, success: true, university: action.payload };
        case UNIVERSITY_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case UNIVERSITY_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const universityDetailsReducer = (
    state = { university: {} },
    action
) => {
    switch (action.type) {
        case UNIVERSITY_DETAILS_REQUEST:
            return { loading: true, ...state };
        case UNIVERSITY_DETAILS_SUCCESS:
            return {
                loading: false,
                university: action.payload
            };
        case UNIVERSITY_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const universityUpdateReducer = (state = { university: {} }, action) => {
    switch (action.type) {
        case UNIVERSITY_UPDATE_REQUEST:
            return { loading: true };
        case UNIVERSITY_UPDATE_SUCCESS:
            return { loading: false, success: true, university: action.payload };
        case UNIVERSITY_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case UNIVERSITY_UPDATE_RESET:
            return { university: {} };
        default:
            return state;
    }
};

export const universityDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case UNIVERSITY_DELETE_REQUEST:
            return { loading: true };
        case UNIVERSITY_DELETE_SUCCESS:
            return { loading: false, success: true };
        case UNIVERSITY_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};