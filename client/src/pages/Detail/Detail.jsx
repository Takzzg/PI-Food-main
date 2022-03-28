import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { fetchDetail } from "../../actions"
import { Ingredients } from "../../components/Ingredients/Ingredients"
import { Insructions } from "../../components/Instructions/Insructions"
import styles from "./Detail.module.scss"
import stock from "../../assets/stock.jpg"

export const Detail = () => {
    let detail = useSelector((state) => state.detailRecipe)
    let dispatch = useDispatch()
    let { id } = useParams()

    useEffect(() => {
        dispatch(fetchDetail(id))
    }, [id, dispatch])

    return !detail.id || detail.id.toString() !== id.toString() ? (
        <h1>Loading recipe</h1>
    ) : (
        <div className={styles.cont}>
            <div className={styles.title}>{detail.name || detail.title}</div>

            <div className={styles.main}>
                <div className={styles.section}>
                    <img src={detail.image || stock} alt="recipe" />

                    <div
                        className={styles.summary}
                        dangerouslySetInnerHTML={{ __html: detail.summary }}
                    />
                </div>

                <ul className={styles.info}>
                    {detail.servings && (
                        <li>
                            <b>Servings:</b> {detail.servings}
                        </li>
                    )}
                    <li>
                        <b>Price per serving:</b> {detail.pricePerServing}
                    </li>
                    <li>
                        <b>Score:</b> {detail.score || detail.spoonacularScore}
                    </li>
                    <li>
                        <b>Health score:</b> {detail.healthScore}
                    </li>
                    {detail.weightWatcherSmartPoints && (
                        <li>
                            <b>Weight watcher score:</b>{" "}
                            {detail.weightWatcherSmartPoints}
                        </li>
                    )}
                    {detail.readyInMinutes && (
                        <li>
                            Ready in <b>{detail.readyInMinutes}</b> minutes
                        </li>
                    )}
                    {detail.creditsText && (
                        <li>
                            <b>Author:</b> {detail.creditsText}
                        </li>
                    )}
                    {!!detail.cuisines && (
                        <li>
                            <b>Cuisines:</b> {detail.cuisines.join(", ")}
                        </li>
                    )}
                    {!!detail.dishTypes && (
                        <li>
                            <b>Dish types:</b> {detail.dishTypes.join(", ")}
                        </li>
                    )}
                    {!!detail.diets && (
                        <li>
                            <b>Diets:</b> {detail.diets.join(", ")}
                        </li>
                    )}
                </ul>
            </div>

            <div className={styles.body}>
                {!!detail.extendedIngredients && (
                    <Ingredients ingredients={detail.extendedIngredients} />
                )}

                <Insructions
                    instructions={
                        detail.analyzedInstructions
                            ? detail.analyzedInstructions
                            : detail.instructions
                    }
                />
            </div>
        </div>
    )
}
