import axios from "axios"

import { FETCH_DIETS, FETCH_RECIPES, FILTER_RECIPES, SET_DETAIL } from "./types"

const baseUrl = "http://localhost:3001"

export const fetchDiets = () => (dispatch) =>
    axios
        .get(`${baseUrl}/types`)
        .then((res) => dispatch({ type: FETCH_DIETS, payload: res.data }))

export const fetchRecipes = () => (dispatch) =>
    axios
        .get(`${baseUrl}/recipes`)
        .then((res) => dispatch({ type: FETCH_RECIPES, payload: res.data }))
// .then(() => dispatch({ type: FILTER_RECIPES }))

export const fetchDetail = (id) => (dispatch) =>
    axios
        .get(`${baseUrl}/recipes/${id}`)
        .then((res) => dispatch({ type: SET_DETAIL, payload: res.data }))

export const filterRecipes = (name, diet, orderBy, dir) => {
    return { type: FILTER_RECIPES, payload: { name, diet, orderBy, dir } }
}
