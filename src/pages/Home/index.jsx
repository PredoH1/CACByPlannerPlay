import Header from "../../components/Header/Index";
import React, { useRef } from "react";
import styles from "../Home/Home.module.css";
import { Link } from "react-router-dom";
import imgMain from "../../assets/bannerMainTop.png";
import InfoPage from "../../components/InfoPage";
import Sistem from "../../components/Sistem";

function Home({ onClick }) {
  const seçãoRef = useRef(null);

  function rolarParaSeção() {
    if (seçãoRef.current) {
      seçãoRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

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
            <button onClick={rolarParaSeção} type="button">
              Saiba mais
            </button>
          </div>
        </section>
        <section className={styles.containerRight}>
          <div>
            <img src={imgMain} alt="" />
          </div>
        </section>
      </main>
      <InfoPage ref={seçãoRef} />
      <Sistem />
      <Link to="/sobre">Sobre</Link>
    </>
  );
}

export default Home;
