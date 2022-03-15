import axios from "axios"

import { FETCH_RECIPES, FILTER_RECIPES, SET_DETAIL } from "./types"

const baseUrl = "http://localhost:3001"

const fetchRecipes = () => {
    return function (dispatch) {
        return axios.get(`${baseUrl}/recipes`).then((res) => {
            dispatch({ type: FETCH_RECIPES, payload: res.data })
        })
    }
}

const fetchDetail = (id) => {
    return function (dispatch) {
        return axios.get(`${baseUrl}/recies/${id}`).then((res) => {
            dispatch({ type: SET_DETAIL, payload: res.data })
        })
    }
}

const filterRecipes = () => {
    return { type: FILTER_RECIPES }
}

export { fetchRecipes, fetchDetail, filterRecipes }
