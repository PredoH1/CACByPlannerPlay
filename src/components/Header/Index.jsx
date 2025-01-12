import style from "../../components/Header/Header.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logoHeader.svg";

function Header() {
  return (
    <header>
      <img src={logo} alt="" />
      <Link to="/">
        <h1>CAC By PlannerPlay</h1>
      </Link>
    </header>
  );
}

export default Header;
