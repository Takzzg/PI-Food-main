import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchRecipes, fetchDetail, filterRecipes } from "../../actions"
import { Card } from "../../components"

import styles from "./Home.module.scss"

const Home = () => {
    const recipes = useSelector((state) => state.allRecipes)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchRecipes())
    }, [])

    const handleFetchRecipes = () => {
        console.log(recipes)
    }

    return (
        <div>
            <input type="text" name="search" id="search" />
            <button onClick={handleFetchRecipes}>Buscar</button>

            <div className={styles.cardsContainer}>
                {console.log(recipes)}
                {recipes.map((r) => (
                    <Card key={r.id} recipe={r} />
                ))}
            </div>
        </div>
    )
}

export default Home
