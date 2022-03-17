import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    // fetchDiets,
    // fetchRecipes,
    // fetchDetail,
    filterRecipes
} from "../../actions"
import { Pagination } from "../../components/Pagination/Pagination"

import styles from "./Home.module.scss"

const Home = () => {
    const allRecipes = useSelector((state) => state.allRecipes)
    const recipes = useSelector((state) => state.filteredRecipes)
    const allDiets = useSelector((state) => state.allDiets)
    const dispatch = useDispatch()

    const [formState, setFormState] = useState({
        name: "",
        diet: "all",
        orderBy: "name",
        orderDir: "asc"
    })

    const handleFormChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }

    const handleToggleDir = () => {
        setFormState({
            ...formState,
            orderDir: formState.orderDir === "asc" ? "desc" : "asc"
        })
    }

    useEffect(() => {
        dispatch(filterRecipes(...Object.values(formState)))
    }, [dispatch, formState, allRecipes])

    return (
        <div className={styles.home}>
            <div className={styles.filters}>
                <div className={styles.section}>
                    Buscar por nombre:{" "}
                    <input
                        value={formState.name}
                        onChange={handleFormChange}
                        type="text"
                        name="name"
                        id="search"
                    />
                </div>

                <div className={styles.section}>
                    Filtrar por tipo de dieta:{" "}
                    <select
                        onChange={handleFormChange}
                        name="diet"
                        id="diet"
                        value={formState.diet}
                    >
                        <option value={"all"}>Todas</option>
                        {allDiets.map((d) => (
                            <option key={d.id} value={d.id}>
                                {d.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.section}>
                    Ordenar Por:{" "}
                    <select
                        value={formState.orderBy}
                        onChange={handleFormChange}
                        name="orderBy"
                        id="orderBy"
                    >
                        <option value={"name"}>Nombre</option>
                        <option value={"score"}>Puntaje</option>
                        <option value={"pricePerServing"}>Precio</option>
                    </select>
                    <button name={"orderDir"} onClick={handleToggleDir}>
                        {formState.orderDir === "asc"
                            ? "Ascendente"
                            : "Descendente"}
                    </button>
                </div>
            </div>

            <Pagination recipes={recipes} />
        </div>
    )
}

export default Home
