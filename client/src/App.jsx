import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { fetchDiets, fetchRecipes } from "./actions"

import { Navbar } from "./components"
import { Detail } from "./pages/Detail/Detail"
import Home from "./pages/Home/Home"
import Landing from "./pages/Landing"

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchDiets())
        dispatch(fetchRecipes())
    }, [dispatch])

    return (
        <div
            className="App"
            style={{
                maxHeight: "100vh",
                // overflow: "hidden",
                // overflow: "auto",
                display: "flex",
                flexDirection: "column"
            }}
        >
            <BrowserRouter>
                <Navbar />

                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/recipes/:id" element={<Detail />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
