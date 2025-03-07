import { Navigate, Route, Routes } from "react-router-dom"
import Zepto from "./components/zepto"

export const AppRouting = () => {
    return (
        <Routes>
            <Route path="/" element={<Zepto />}/>
            <Route path="/home"  element={<Navigate to="/" replace />} />
        </Routes>
    )
}