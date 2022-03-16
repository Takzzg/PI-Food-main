import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    fetchDiets,
    fetchRecipes,
    fetchDetail,
    filterRecipes
} from "../../actions"
import { Card } from "../../components"

import styles from "./Home.module.scss"

const Home = () => {
    const recipes = useSelector((state) => state.allRecipes)
    const diets = useSelector((state) => state.allDiets)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchDiets())
        dispatch(fetchRecipes())
    }, [])

    const handleFetchRecipes = () => {
        console.log(recipes)
        console.log(diets)
    }

    return (
        <div className={styles.home}>
            <input type="text" name="search" id="search" />
            <button onClick={handleFetchRecipes}>Buscar</button>

            <div className={styles.cardsContainer}>
                {recipes.map((r) => (
                    <Card key={r.id} recipe={r} />
                ))}
            </div>
        </div>
    )
}

export default Home
