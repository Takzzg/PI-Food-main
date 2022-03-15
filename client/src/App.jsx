import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navbar } from "./components"
import Home from "./pages/Home/Home"
import Landing from "./pages/Landing"

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
