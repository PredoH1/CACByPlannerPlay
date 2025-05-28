import style from "../../components/Header/Header.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logoHeader.svg";
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className={style.header}>
      <div className={style.iconHeader}>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>

        <Link to="/">
          <h1>
            <span>CAC</span> By PlannerPlay
          </h1>
        </Link>
      </div>

      <button className={style.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`${style.linksHeader} ${menuOpen ? style.active : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <p>Home</p>
        </Link>
        <Link to="/sobre">
          <p>Sobre</p>
        </Link>

        <Link to="/dashboard">
          <p>Visao Ampla</p>
        </Link>
      </div>
    </header>
  );
}

export default Header;
