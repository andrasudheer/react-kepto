import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./categoryItems.module.scss";


const CatgeoryItems = () => {
    const { categoryId } = useParams();
    const [categorymenu, setCategoryMenu] = useState<any>([]);
    const [products, setProducts] = useState<any>([]);
    const [selectedMenu, setSelectedMenu] = useState<any>()

    // PRODUCTS API CALL

    useEffect(() => {
        fetch(`http://localhost:3000/category-menu-list-${categoryId}`).then((menuRes: any) => {
            return menuRes.json();
        }).then((menuData: any) => {
            setCategoryMenu(menuData);
            setSelectedMenu(menuData[0].id);
            fetchProductsData(menuData[0].id);
        })
    }, [])

    const HandleMenu = (menu:any) => {
        setSelectedMenu(menu.id);
        fetchProductsData(menu.id);
    }

    const fetchProductsData = (id: string) => {
        fetch(`http://localhost:3000/product-list-${id}`).then((productsRes: any) => {
            return productsRes.json();
        }).then((productsData: any) => {
            setProducts(productsData);
        })
    }

  
    return (
        <div className={style["category-products-wrapper"]}>
            <div className={style["category-wrapper"]}>
                {
                    categorymenu?.map((menu: any) => (
                        <div className={`${style["menu-wrapper"]} ${ selectedMenu === menu.id ? style["active"] : "" }`} onClick={()=>HandleMenu(menu)}>
                            <div className={style["menu-img-wrapper"]}>
                                <img src={menu.leftMenuIcon} alt="" className={style["menu-img"]} />
                            </div>
                            <div className={style["menu-label-wrapper"]}>
                                <div className={style["menu-label"]}>{menu.category_name}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className={style["products-wrapper"]}>
                {
                    products.map((product: any) => (
                        <div className={style["product-wapper"]}>
                            <div className={style["product-img-wrapper"]}>
                                <img src={product.img_url} alt="" className={style["product-img"]} />
                            </div>
                            <div className={style["product-label-wrapper"]}>
                                <div className={style["product-label"]}>{product.product_name}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CatgeoryItems;