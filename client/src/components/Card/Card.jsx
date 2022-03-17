import React from "react"
import { Link } from "react-router-dom"

import stock from "../../assets/stock.jpg"
import styles from "./Card.module.scss"
import { DietBadge } from "./DietBagde/DietBadge"

export const Card = ({ recipe }) => {
    const {
        id,
        name,
        title,
        diets,
        image,
        summary,
        pricePerServing,
        score,
        spoonacularScore
    } = recipe

    return (
        <Link className={styles.card} to={`/recipes/${id}`}>
            <div className={styles.image}>
                <img src={image || stock} alt="Recipe" />
            </div>
            <div className={styles.header}>
                <div className={styles.title}>{name || title}</div>
                <div className={styles.extras}>
                    ${pricePerServing || "???"} - Puntaje:{" "}
                    {score || spoonacularScore}
                    /100
                </div>
            </div>
            <div
                className={styles.summary}
                dangerouslySetInnerHTML={{ __html: summary }}
            ></div>
            <div className={styles.diets}>
                {diets.map((d) => (
                    <DietBadge key={d.id} diet={d} />
                ))}
            </div>
        </Link>
    )
}
