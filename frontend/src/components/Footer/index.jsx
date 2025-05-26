import style from "../../components/Footer/Footer.module.css";
import logo from "../../assets/logoHeader.svg";

function Footer() {
  return (
    <footer>
      <section className={style.footerLogo}>
        <img src={logo} alt="" />
        <h1 className={style.logoText}>PLannerPlayy</h1>
      </section>
      <section className={style.footerLinks}>
        <p>© 2025 PlannerPLay. Todos os direitos reservados.</p>
      </section>
    </footer>
  );
}

export default Footer;
