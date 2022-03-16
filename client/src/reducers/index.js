import {
    FETCH_DIETS,
    FETCH_RECIPES,
    FILTER_RECIPES,
    SET_DETAIL
} from "../actions/types"

const initialState = {
    allDiets: [],
    allRecipes: [],
    detailRecipe: {},
    filteredRecipes: []
}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DIETS:
            let diets = action.payload.map((d, i) => ({
                ...d,
                color: Math.round((360 / action.payload.length) * (i + 2))
            }))
            return { ...state, allDiets: diets }

        case FETCH_RECIPES:
            let recipes = [...action.payload]

            recipes.forEach((r) => {
                let newDiets = []
                const addDiet = (val) => {
                    newDiets.push(
                        state.allDiets.find((d) =>
                            d.name.toLowerCase().includes(val.toLowerCase())
                        )
                    )
                }

                r.diets.forEach((d) => {
                    if (d.id) {
                        addDiet(d.name)
                        return
                    }
                    if (d.includes("ovo")) addDiet("ovo")
                    if (d.includes("lacto")) addDiet("lacto")
                    if (d.includes("paleo")) addDiet("paleo")
                    if (d.includes("primal")) addDiet("primal")
                    if (d.includes("pescatarian")) addDiet("pescatarian")
                })

                if (r.vegetarian) addDiet("vegetarian")
                if (r.vegan) addDiet("vegan")
                if (r.glutenFree) addDiet("gluten free")
                if (r.dairyFree) addDiet("dairy free")
                if (r.lowFodmap) addDiet("low fodmap")

                r.diets = newDiets
            })

            return { ...state, allRecipes: recipes }

        case FILTER_RECIPES:
            return { ...state, filteredRecipes: action.payload }

        case SET_DETAIL:
            return { ...state, detailRecipe: action.payload }

        default:
            return state
    }
}
