import { Link } from "react-router-dom";
import { Account } from "../Account/Account";
import HeaderInput from "./HeaderInput/HeaderInput";
import { useSelector } from "react-redux";
import "./style.scss";


const Header = () => {

  const windowWidthState = useSelector((state) => state.ui.windowWidth)
  const pathname = useSelector((state) => state.ui.activeURL);

  return (
    <header className={`header`}>
      <Link to={"/"}>
        <img src="/icon/header-icon/vk-logo-white.png" alt="Логотип" className="header-logo"/>
      </Link>
      <div className="header_center">
        <Link to={"/"} className={`header_main ${windowWidthState > 600 && pathname === "/" ? `active` : ``}`}>
          Главная
        </Link>
        <Link
          to={"/genre"}
          className={`header_genre ${windowWidthState > 600 && pathname === "/genre" ? `active` : ``}`}
        >
          Жанры
        </Link>
        <HeaderInput />
      </div>
      <Account/>
    </header>
  );
}

export default Header;
