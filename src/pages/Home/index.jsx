import { useLayoutEffect } from "react";
import Header from "../../components/Header/Index";
import styles from "../Home/Home.module.css";
import { Link } from "react-router-dom";
import imgMain from "../../assets/bannerMainTop.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InfoPage from "../../components/InfoPage";

function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.containerLeft}>
          <div>
            <p className={styles.paragraph}>OTIMIZE O</p>
            <p className={styles.paragraph}>POTENCIAL DE </p>
            <p className={styles.paragraph}>SUAS VENDAS</p>
          </div>
          <div className={styles.btnMoreInfo}>
            <button type="button">Saiba mais</button>
          </div>
        </section>
        <section className={styles.containerRight}>
          <div>
            <img src={imgMain} alt="" />
          </div>
        </section>
      </main>
      <InfoPage />
      <Link to="/sobre">Sobre</Link>
    </>
  );
}

export default Home;
