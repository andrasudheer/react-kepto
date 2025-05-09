import { useEffect, useState } from "react";
import "./header.scss";
import {
  CaretDownOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import UsersRole from "../user-roles/userRoles";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [icons, setIcons] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/icons")
      .then((res:any) => {
        return res.json();
      })
      .then((iconRes:any) => {
        let iconsList = {};
        iconRes.forEach((icon:any) => {
          Object.assign(iconsList, icon);
        });
        setIcons(iconsList);
      });
  }, []);
  
     const handleZepto  = () => {
      navigate("/")
     }

  return (
    <div className="header-wrapper">
      <div className="header-item">
        <img src={icons.LOGO} alt="zepto" onClick={handleZepto}/>
      </div>
      <div className="header-item">
        Select Loction
        <CaretDownOutlined className={"downArrow-icon"} />
      </div>
      <div className="header-item-search">
        <div className={"search-bar"}>
            <SearchOutlined className={"search-icon"}/>
            <input
              type="search"
              placeholder="Serach for"
              className="searchbar"
            />
        </div>
      </div>
      <div><UsersRole/></div>
      <div className="header-item-icon">
        <div>
          <UserOutlined />
        </div>
        <div>Login</div>
      </div>
      <div className="header-item-icon">
        <div>
          <ShoppingCartOutlined />
        </div>
        <div>Cart</div>
      </div>
    </div>
  );
};
export default Header;
