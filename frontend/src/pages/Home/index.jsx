import Header from "../../components/Header/Index";
import React, { useRef, useState } from "react";
import styles from "../Home/Home.module.css";
import { Link } from "react-router-dom";
import InfoPage from "../../components/InfoPage";
import Sistem from "../../components/Sistem";
import Footer from "../../components/Footer";
import gif from "../../assets/gifHEader.gif";

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
          <img src={gif} alt="" />
        </section>
      </main>
      <InfoPage ref={seçãoRef} />
      <Sistem />
      <Footer />
    </>
  );
}

export default Home;
