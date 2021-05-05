import axios from "axios";
import { UNIVERSITY_LIST_REQUEST, UNIVERSITY_LIST_SUCCESS, UNIVERSITY_LIST_FAIL, UNIVERSITY_SEARCH_FAIL, UNIVERSITY_SEARCH_REQUEST, UNIVERSITY_SEARCH_SUCCESS, UNIVERSITY_FILTER_REQUEST, UNIVERSITY_FILTER_SUCCESS, UNIVERSITY_FILTER_FAIL } from "../constants/universityConstants";

export const listUniversities = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: UNIVERSITY_LIST_REQUEST,
        });

        const { data } = await axios.get("/api/university");

        dispatch({
            type: UNIVERSITY_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: UNIVERSITY_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const searchUniversities = (keyword = "", pageNumber = "") => async (
    dispatch
) => {
    try {
        dispatch({ type: UNIVERSITY_SEARCH_REQUEST });

        const { data } = await axios.get(
            `/api/university/search/${keyword}`
        );

        dispatch({
            type: UNIVERSITY_SEARCH_SUCCESS,
        });

        dispatch({
            type: UNIVERSITY_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: UNIVERSITY_SEARCH_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const filterUniversities = (keyword = "", pageNumber = "") => async (
    dispatch
) => {
    try {
        dispatch({ type: UNIVERSITY_FILTER_REQUEST });

        const { data } = await axios.get(
            `/api/university/search/filter/${keyword}`
        );

        dispatch({
            type: UNIVERSITY_FILTER_SUCCESS,
        });

        dispatch({
            type: UNIVERSITY_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: UNIVERSITY_FILTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};