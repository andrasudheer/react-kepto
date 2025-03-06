import { useContext, useEffect, useState } from "react";
import "./category.scss";
import AddCategoryModal from "../modals/addcategorymodal";
import { message } from 'antd';
import Spinner from "../spinner/spinner";
import { KeptoContext } from "../keptoContext/keptoContex";

const Category = () => {
  const [categoryList, setCategoryList] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState([])
  const [messageApi, contextHolder] = message.useMessage();
  const [showLoader, setShowLoader] = useState(true);
  const { rolesType } = useContext(KeptoContext);
  const ROLE_ACCESS = ["ADMIN", "CEO"];

  useEffect(() => {
    getCategoryList();
    getCategoryListDropdownItems();
    //console.log("role...", role);
  }, []);

  const getCategoryList = () => {
    fetch("http://localhost:3000/category")
      .then((res) => {
        return res.json();
      })
      .then((categoryItems: any) => {

        // Logic_1
        const categoryList = categoryItems.reduce((acc: any, curr: any) => {
          acc[curr.category_name] ? acc[curr.category_name].push(curr) : acc[curr.category_name] = [curr];
          // if(acc[curr.category_name]){
          //   acc[curr.category_name].push(curr);
          // }else{
          //   acc[curr.category_name] = [curr];
          // }
          return acc;
        }, {});

        //Logic_2
        // const categoryList = {};
        // const category = categoryItems.map(
        //   (categoryItem:any) => categoryItem.category_name
        // );
        // const uniqueCategory:any = [...new Set(category)];
        // uniqueCategory.forEach((eachCate:any) => {
        //   console.log("data", eachCate, categoryItems);
        //   Object.assign(categoryList, {
        //     [eachCate]: categoryItems.filter(
        //       (obj:any) => obj["category_name"] === eachCate
        //     ),
        //   });
        // });
        setShowLoader(false);
        setCategoryList(categoryList);

      });
  }

  const getCategoryListDropdownItems = () => {
    fetch("http://localhost:3000/categoriesList").then((res) => {
      return res.json();
    }).then((data: any) => {
      const categoryDropdown = data.map((categoryItem: any) => {
        return {
          "label": categoryItem.category_name,
          "value": categoryItem.id
        }
      })
      setCategories(categoryDropdown);
    })
  }


  const handleCategoryItems = () => {
    setModalOpen(true)
  }

  const handleCancel = () => {
    setModalOpen(false);
  }

  const formSubmitData = (formData: any) => {
    setShowLoader(true);
    const payload = {
      "name": formData.productname,
      "img_url": formData.imageurl,
      "category_name": formData.category.label
    }

    //POST API CALL

    fetch("http://localhost:3000/category", {
      method: "POST",
      body: JSON.stringify(payload)
    }).then((res) => {
      return res.json();
    }).then((data: any) => {
      // GET API CALL
      messageApi.open({
        type: 'success',
        content: 'Category added successfully!',
      });
      getCategoryList();
      setModalOpen(false);
    })

  }

  return (
    <div className={"category-wrapper"}>
      <div className={"alert-data"}>{contextHolder}</div>
      {showLoader && (<Spinner />)}
      {
        ROLE_ACCESS.includes(rolesType.role_code) && (
          <div className={"additems"}>
            <button className={"items"} onClick={handleCategoryItems}>Add Category Items</button>
          </div>
        )
      }
      {Object.keys(categoryList).map((item) => {
        return (
          <div className={"each-category"}>
            <h1 className={"category-title"}>{item}</h1>
            <div className={"img-wrapper"}>
              {categoryList[item].map((obj: any) => {
                return (
                  <div className={"each-img"}>
                    <img src={obj["img_url"]} alt="" className={"img"} style={{ 'width': '100%', 'height': 'auto', 'objectFit': 'cover' }} />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <AddCategoryModal
        modalOpen={modalOpen}
        categories={categories}
        formSubmitData={formSubmitData}
        handleCancel={handleCancel}
      />
    </div>
  );
};
export default Category;
