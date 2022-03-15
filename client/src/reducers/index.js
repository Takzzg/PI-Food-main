import { FETCH_RECIPES, FILTER_RECIPES, SET_DETAIL } from "../actions/types"

const initialState = {
    allRecipes: [],
    detailRecipe: {},
    filteredRecipes: []
}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RECIPES:
            return {
                ...state,
                allRecipes: action.payload
            }

        case FILTER_RECIPES:
            return {
                ...state,
                filteredRecipes: action.payload
            }

        case SET_DETAIL:
            return {
                ...state,
                detailRecipe: action.payload
            }

        default:
            return state
    }
}
