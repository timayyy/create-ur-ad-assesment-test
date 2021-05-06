import axios from "axios";
import { UNIVERSITY_LIST_REQUEST, UNIVERSITY_LIST_SUCCESS, UNIVERSITY_LIST_FAIL, UNIVERSITY_SEARCH_FAIL, UNIVERSITY_SEARCH_REQUEST, UNIVERSITY_SEARCH_SUCCESS, UNIVERSITY_FILTER_REQUEST, UNIVERSITY_FILTER_SUCCESS, UNIVERSITY_FILTER_FAIL, UNIVERSITY_CREATE_REQUEST, UNIVERSITY_CREATE_SUCCESS, UNIVERSITY_CREATE_FAIL, UNIVERSITY_DELETE_REQUEST, UNIVERSITY_DELETE_SUCCESS, UNIVERSITY_DELETE_FAIL, UNIVERSITY_UPDATE_REQUEST, UNIVERSITY_UPDATE_SUCCESS, UNIVERSITY_UPDATE_FAIL, UNIVERSITY_DETAILS_REQUEST, UNIVERSITY_DETAILS_SUCCESS, UNIVERSITY_DETAILS_FAIL } from "../constants/universityConstants";

export const listUniversities = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: UNIVERSITY_LIST_REQUEST,
        });

        const { data } = await axios.get(`/api/universities`);

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

export const searchUniversities = (keyword, start, limit) => async (
    dispatch
) => {
    try {
        dispatch({ type: UNIVERSITY_SEARCH_REQUEST });

        const { data } = await axios.get(
            `/api/universities/search/${keyword}?start=${start}&limit=${limit}`
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
            `/api/universities/search/filter/${keyword}`
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


export const previousPage = (url) => async (
    dispatch
) => {
    try {
        dispatch({ type: UNIVERSITY_LIST_REQUEST });

        console.log(url)
        const { data } = await axios.get(`${url}`);

        // dispatch({
        //     type: UNIVERSITY_FILTER_SUCCESS,
        // });

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

export const nextPage = (url) => async (
    dispatch
) => {
    try {
        dispatch({ type: UNIVERSITY_LIST_REQUEST });
        console.log(url)

        const { data } = await axios.get(`${url}`);

        // dispatch({
        //     type: UNIVERSITY_FILTER_SUCCESS,
        // });

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

export const createUniversity = (name, domain, webpage, alphaTwoCode, country, imgUrl, description) => async (dispatch) => {
    try {
        dispatch({
            type: UNIVERSITY_CREATE_REQUEST,
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(`/api/universities`, { name, domain, web_page: webpage, alpha_two_code: alphaTwoCode, country, img_url: imgUrl, description }, config);

        dispatch({
            type: UNIVERSITY_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: UNIVERSITY_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const updateUniversity = (id, name, domain, webpage, alphaTwoCode, country, imgUrl, description) => async (dispatch) => {
    try {
        dispatch({
            type: UNIVERSITY_UPDATE_REQUEST,
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(`/api/universities/${id}`, { name, domain, web_page: webpage, alpha_two_code: alphaTwoCode, country, img_url: imgUrl, description }, config);

        dispatch({
            type: UNIVERSITY_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: UNIVERSITY_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getUniversityDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: UNIVERSITY_DETAILS_REQUEST,
        });

        const { data } = await axios.get(`/api/universities/${id}`);

        dispatch({
            type: UNIVERSITY_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: UNIVERSITY_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteUniversity = (id) => async (dispatch) => {
    try {
        dispatch({
            type: UNIVERSITY_DELETE_REQUEST,
        });

        await axios.delete(`/api/universities/${id}`);

        dispatch({
            type: UNIVERSITY_DELETE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: UNIVERSITY_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

