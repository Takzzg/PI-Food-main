import React, { useEffect, useRef, useState } from "react"
import { Card } from "../Card/Card"

import styles from "./Pagination.module.scss"

export const Pagination = ({ recipes }) => {
    const [page, setPage] = useState(1)
    const pageBtnContainer = useRef(null)

    const selectRecipes = () => {
        return recipes.slice((page - 1) * 9, (page - 1) * 9 + 9)
    }
    let selectedRecipes = selectRecipes()

    useEffect(() => {
        selectedRecipes = selectRecipes()
    }, [page, pageBtnContainer])

    const handleChangePage = (val) => {
        if (page + val < 0) setPage(1)
        else if (page + val > Math.ceil(recipes.length / 9))
            setPage(Math.ceil(recipes.length / 9))
        else setPage(page + val)
    }

    const Controls = () => (
        <div className={styles.controls}>
            <button onClick={() => handleChangePage(-1)} disabled={page === 1}>
                &lt; Anterior
            </button>
            <button
                onClick={() => handleChangePage(1)}
                disabled={page === Math.ceil(recipes.length / 9)}
            >
                &gt; Siguiente
            </button>
        </div>
    )

    return (
        <div>
            <Controls />
            <div className={styles.cardsContainer}>
                {selectedRecipes.map((r) => (
                    <Card key={r.id} recipe={r} />
                ))}
            </div>
            <Controls />
        </div>
    )
}
