import React from "react"

export const Card = ({ recipe }) => {
    const { id, name, title, diets, image } = recipe

    return (
        <div>
            <img src={image} alt="image" />
            {name || title}
            {diets &&
                diets.map((d) => <div key={d.id || d}>{d.name || d}</div>)}
        </div>
    )
}
