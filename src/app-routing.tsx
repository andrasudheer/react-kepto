import { Navigate, Route, Routes } from "react-router-dom"
import Zepto from "./components/zepto"
import CatgeoryItems from "./components/category-items/categoryItems"
import Header from "./components/header/header"

export const AppRouting = () => {
    return (
    <>
    <Header/>
        <Routes>
            <Route path="/" element={<Zepto />}/>
            <Route path="/home"  element={<Navigate to="/" replace />} />
            <Route path="/category/:categoryId" element={<CatgeoryItems/>}/>
        </Routes>
    </>
    )
}