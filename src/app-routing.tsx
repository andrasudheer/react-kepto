import { Navigate, Route, Routes } from "react-router-dom"
import Zepto from "./components/zepto"
import CatgeoryItems from "./components/category-items/categoryItems"

export const AppRouting = () => {
    return (
        <Routes>
            <Route path="/" element={<Zepto />}/>
            <Route path="/home"  element={<Navigate to="/" replace />} />
            <Route path="/category/:categoryId" element={<CatgeoryItems/>}/>
        </Routes>
    )
}