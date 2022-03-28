import React from "react"
import styles from "./Ingredients.module.scss"
// import ingredients from "../../assets/ingredients.jpg"

export const Ingredients = ({ ingredients }) => {
    const Ingredient = ({ ing }) => {
        console.log(ing)
        const imgUrl = `https://spoonacular.com/cdn/ingredients_100x100/${ing.image}`

        return (
            <span className={styles.ing}>
                <img src={imgUrl} alt="ingredient" />
                <div className={styles.info}>
                    <b>{ing.name}</b>
                    {ing.original}
                </div>
            </span>
        )
    }

    return (
        <div className={styles.ingredients}>
            <div className={styles.title}>Ingredients</div>
            {ingredients &&
                ingredients.map((i) => <Ingredient key={i.id} ing={i} />)}
        </div>
    )
}
