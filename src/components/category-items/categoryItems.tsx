import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./categoryItems.module.scss";


const CatgeoryItems = () => {
    const { categoryId } = useParams();
    const [categorymenus, setCategoryMenus] = useState<any>([]);

    // PRODUCTS API CALL

    useEffect(() => {
        fetch(`http://localhost:3000/category-menu-list-${categoryId}`).then((menuRes: any) => {
            return menuRes.json();
        }).then((menuData: any) => {
            setCategoryMenus(menuData);
        })
    }, [])

    return (
        <div className={style["category-products-wrapper"]}>
            <div className={style["category-wrapper"]}>
                {
                    categorymenus.map((menu: any) => (
                        <div className={style["menu-wrapper"]}>
                            <div className={style["menu-img-wrapper"]}>
                                <img src={menu.leftMenuIcon} alt="" className={style["menu-img"]}/>
                            </div>
                            <div className={style["menu-label-wrapper"]}>
                                <div className={style["menu-label"]}>{menu.category_name}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className={style["products-wrapper"]}>
                <h1>Body contentl...</h1>
            </div>
        </div>
    )
}

export default CatgeoryItems;