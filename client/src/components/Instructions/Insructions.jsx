import React from "react"
import { Step } from "../Step/Step"
import styles from "./Instructions.module.scss"

export const Insructions = ({ instructions }) => {
    if (instructions[0].steps) instructions = instructions[0].steps
    else instructions = instructions.map((s, i) => ({ number: i, step: s }))

    console.log(instructions)

    return (
        <div className={styles.instructions}>
            <div className={styles.title}>Instructions</div>

            <div className={styles.steps}>
                {instructions.map((s) => (
                    <Step key={s.number} s={s} />
                ))}
            </div>
        </div>
    )
}
