import React from "react"
import { NavLink } from "react-router-dom"

import logo from "../../assets/cooking.png"
import styles from "./Navbar.module.scss"

const setClass = ({ isActive }) =>
    `${isActive ? styles.active : undefined} ${styles.NavLink}`

export const Navbar = () => {
    return (
        <div className={styles.Navbar}>
            <NavLink className={setClass} to="/">
                <img src={logo} alt="logo" className={styles.logo} />
            </NavLink>
            <NavLink className={setClass} to="/home">
                Home
            </NavLink>
        </div>
    )
}
