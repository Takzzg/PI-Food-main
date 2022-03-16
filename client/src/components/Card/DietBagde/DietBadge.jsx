import React from "react"

import styles from "./DietBadge.module.scss"

export const DietBadge = ({ diet }) => {
    const { name, color } = diet

    return (
        <span
            className={styles.badge}
            style={{
                backgroundColor: `hsl(${color}, 80%, 50%)`,
                color: color > 180 ? "white" : "black"
            }}
        >
            {name}
        </span>
    )
}
