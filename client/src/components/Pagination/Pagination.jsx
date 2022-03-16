import React, { useEffect, useRef, useState } from "react"
import { Card } from "../Card/Card"

import styles from "./Pagination.module.scss"

export const Pagination = ({ recipes }) => {
    const [page, setPage] = useState(1)
    const pageBtnContainer = useRef(null)

    const lastPageNum = Math.ceil(recipes.length / 9)

    const selectRecipes = () => {
        return recipes.slice((page - 1) * 9, (page - 1) * 9 + 9)
    }
    let selectedRecipes = selectRecipes()

    useEffect(() => {
        selectedRecipes = selectRecipes()
    }, [page, pageBtnContainer])

    const handleChangePage = (val) => {
        setPage(val)
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
        let btnCount = 10
        let buttons = []

        if (page <= btnCount - Math.floor(btnCount / 2))
            for (let i = 1; i <= btnCount; i++) buttons.push(i)
        else if (page >= lastPageNum - Math.floor(btnCount / 2))
            for (let i = btnCount; i > 0; i--) buttons.push(lastPageNum - i + 1)
        else
            for (
                let i = page - Math.floor(btnCount / 2);
                i <= page + Math.floor(btnCount / 2);
                i++
            )
                buttons.push(i)

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
