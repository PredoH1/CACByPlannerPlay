import style from "../../components/Header/Header.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logoHeader.svg";

function Header() {
  return (
    <header className={style.header}>
      <Link to="/">
        <img src={logo} alt="" />
      </Link>

      <Link to="/">
        <h1>
          <span>CAC</span> By PlannerPlay
        </h1>
      </Link>
    </header>
  );
}

export default Header;
