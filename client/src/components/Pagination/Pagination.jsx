import React, { useState, useEffect } from "react"
import { Card } from "../Card/Card"

import styles from "./Pagination.module.scss"

export const Pagination = ({ recipes }) => {
    const [page, setPage] = useState(1)

    let lastPageNum = Math.ceil(recipes.length / 9)

    useEffect(() => {
        setPage(1)
    }, [recipes])

    const selectRecipes = () => {
        return recipes.slice((page - 1) * 9, (page - 1) * 9 + 9)
    }
    let selectedRecipes = selectRecipes()

    const handleChangePage = (val) => {
        setPage(val)
        selectedRecipes = selectRecipes()
    }

    const Controls = () => (
        <div className={styles.controls}>
            <button
                onClick={() => handleChangePage(page - 1)}
                disabled={page === 1}
            >
                &lt; Anterior
            </button>
            <PageButtons />
            <button
                onClick={() => handleChangePage(page + 1)}
                disabled={page === lastPageNum}
            >
                Siguiente &gt;
            </button>
        </div>
    )

    const PageButtons = () => {
        let buttons = []
        let btnCount = 3
        let startI, endI

        if (page <= btnCount) {
            startI = 1
            endI = startI + btnCount * 2
            if (endI > lastPageNum) endI = lastPageNum
        } else if (page > lastPageNum - btnCount) {
            startI = lastPageNum - btnCount * 2
            endI = lastPageNum
            if (startI < 1) startI = 1
        } else {
            startI = page - btnCount
            endI = page + btnCount
            if (endI > lastPageNum) endI = lastPageNum
            if (startI < 1) startI = 1
        }

        for (let i = startI; i <= endI; i++) buttons.push(i)

        return (
            <span className={styles.pagesContainer}>
                {buttons.map((i) => (
                    <button
                        className={styles.pageBtn}
                        onClick={() => handleChangePage(i)}
                        disabled={page === i}
                        key={i}
                    >
                        {i}
                    </button>
                ))}
            </span>
        )
    }

    return (
        <div>
            {recipes.length > 0 ? (
                <>
                    <Controls />
                    <div className={styles.cardsContainer}>
                        {selectedRecipes.map((r) => (
                            <Card key={r.id} recipe={r} />
                        ))}
                    </div>
                    <Controls />
                </>
            ) : (
                <h1>No se encontraron recetas</h1>
            )}
        </div>
    )
}
