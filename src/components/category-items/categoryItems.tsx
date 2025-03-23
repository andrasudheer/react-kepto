import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./categoryItems.module.scss";
import { Button, Popover } from 'antd';
import { PercentageOutlined } from "@ant-design/icons";


const CatgeoryItems = () => {
    const { categoryId } = useParams();
    const [categorymenu, setCategoryMenu] = useState<any>([]);
    const [products, setProducts] = useState<any>([]);
    const [selectedMenu, setSelectedMenu] = useState<any>()
    const [isTruncated, setIsTruncated] = useState<boolean>(false);
    const labelRef = useRef<any>(null);

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

    const HandleMenu = (menu: any) => {
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

    const handleMouseEnter = () => {
        if (labelRef.current) {
            const element = labelRef.current;
            const computedStyle = window.getComputedStyle(element);
            console.log("ELEMENT1...", parseFloat(computedStyle.width));
            console.log("ELEMENT2...", element.getBoundingClientRect().width);

            // Checking if content is truncated using width comparison
            const isTextTruncated =
                element.getBoundingClientRect().width < parseFloat(computedStyle.width);
            console.log("RESULT...", isTextTruncated);
            setIsTruncated(isTextTruncated);
        }

    }

    return (
        <div className={style["category-products-wrapper"]}>
            <div className={style["category-wrapper"]}>
                {
                    categorymenu?.map((menu: any) => (
                        <div className={`${style["menu-wrapper"]} ${selectedMenu === menu.id ? style["active"] : ""}`} onClick={() => HandleMenu(menu)}>
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
                            <div className={style["offers-wrapper"]}>
                                <div className={style["offer-svg"]}>
                                    <img src="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.62.1/images/offer-tag.svg" alt="" className={style["offer-img"]} />
                                    <div className={style["offers"]}>
                                        <div>{product.offer}%</div>
                                        <div>Off</div>
                                    </div>
                                </div>
                            </div>
                            <div className={style["product-img-wrapper"]}>
                                <img src={product.img_url} alt="" className={style["product-img"]} />
                            </div>
                            <div className={style["quantity"]}>{product.quantity} {product.units}</div>
                            <div className={style["price"]}>{'\u20B9'} {product.price}</div>
                            <div className={style["product-label-wrapper"]}>
                                <Popover content={product.product_name} open={isTruncated}>
                                    <div className={style["product-label"]} onMouseEnter={handleMouseEnter} ref={labelRef}>{product.product_name}</div>
                                </Popover>
                            </div>
                            <div className={style["addtocart-wrapper"]}>
                                <Button className={style["addtocartbtn"]}>
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CatgeoryItems;