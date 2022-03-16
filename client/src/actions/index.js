import axios from "axios"

import { FETCH_DIETS, FETCH_RECIPES, FILTER_RECIPES, SET_DETAIL } from "./types"

const baseUrl = "http://localhost:3001"

export const fetchDiets = () => {
    return function (dispatch) {
        return axios.get(`${baseUrl}/types`).then((res) => {
            dispatch({ type: FETCH_DIETS, payload: res.data })
        })
    }
}

export const fetchRecipes = () => {
    return function (dispatch) {
        return axios.get(`${baseUrl}/recipes`).then((res) => {
            dispatch({ type: FETCH_RECIPES, payload: res.data })
        })
    }
}

export const fetchDetail = (id) => {
    return function (dispatch) {
        return axios.get(`${baseUrl}/recies/${id}`).then((res) => {
            dispatch({ type: SET_DETAIL, payload: res.data })
        })
    }
}

export const filterRecipes = () => {
    return { type: FILTER_RECIPES }
}
