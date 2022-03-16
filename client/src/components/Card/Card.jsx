import React from "react"
import { Link } from "react-router-dom"

import stock from "../../assets/stock.jpg"
import styles from "./Card.module.scss"
import { DietBadge } from "./DietBagde/DietBadge"

export const Card = ({ recipe }) => {
    const { id, name, title, diets, image } = recipe

    return (
        <Link className={styles.card} to={`/recipes/${id}`}>
            <div className={styles.image}>
                <img src={image || stock} alt="Recipe" />
            </div>
            <div className={styles.title}>{name || title}</div>
            <div className={styles.diets}>
                {diets.map((d) => (
                    <DietBadge key={d.id} diet={d} />
                ))}
            </div>
        </Link>
    )
}
