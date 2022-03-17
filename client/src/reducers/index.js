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
            const { name, diet, orderBy, dir } = action.payload

            console.log(dir)
            let filtered = [...state.allRecipes]

            if (name)
                filtered = filtered.filter(
                    (r) =>
                        (r.name && r.name.toLowerCase().includes(name)) ||
                        (r.title && r.title.toLowerCase().includes(name))
                )

            if (diet !== "all") {
                let dietMatch = []
                filtered.forEach((r) => {
                    r.diets.forEach((d) => {
                        if (d.id === diet) dietMatch.push(r)
                    })
                })
                filtered = [...dietMatch]
            }

            filtered.sort((a, b) => {
                let fieldA = orderBy === "name" ? a.name || a.title : a[orderBy]
                let fieldB = orderBy === "name" ? b.name || b.title : b[orderBy]

                if (fieldA > fieldB) return 1
                if (fieldA < fieldB) return -1
                return 0
            })

            if (dir === "desc") filtered.reverse()

            // console.log(action.payload, filtered)
            return { ...state, filteredRecipes: filtered }

        case SET_DETAIL:
            return { ...state, detailRecipe: action.payload }

        default:
            return state
    }
}
