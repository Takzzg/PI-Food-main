import React from "react"

import styles from "./Step.module.scss"

export const Step = ({ s }) => {
    console.log(s)
    const { number, step, equipment = [], length } = s
    console.log(s)
    return (
        <div className={styles.step}>
            <div>
                <div className={styles.header}>
                    {/* <span className={styles.title}>step </span> */}

                    <span className={styles.number}>{number}</span>

                    {length && (
                        <div className={styles.time}>
                            - {length.number} {length.unit}
                        </div>
                    )}
                </div>

                <div className={styles.body}>{step}</div>
            </div>

            {!!equipment.length && (
                <div className={styles.equipment}>
                    <span className={styles.equipment_title}>
                        You'll need...
                    </span>

                    {equipment.map((e) => (
                        <div className={styles.itemsCont}>
                            <div className={styles.item}>
                                <img
                                    className={styles.image}
                                    src={`https://spoonacular.com/cdn/equipment_100x100/${e.image}`}
                                    alt=""
                                />

                                <span className={styles.name}>{e.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
