import styles from "../InfoPage/InfoPage.module.css";
import React, { forwardRef } from "react";
import ChartIcon from "../../assets/chartIcon.svg";
import Line from "../../assets/ease-in-out.svg";
import HandShake from "../../assets/handshake.svg";
import LampLight from "../../assets/lamp-light.svg";

function InfoPage(props, ref) {
  return (
    <section ref={ref} className={styles.body}>
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <div className={styles.title}>
            <img src={ChartIcon} alt="" />
            <h2>CAC - Custo de Aquisição de Clientes </h2>
          </div>
          <p>
            O CAC é uma métrica essencial para medir quanto uma empresa está
            gastando para adquirir novos clientes. Ele ajuda a avaliar a
            eficiência dos esforços de marketing e vendas, mostrando se o
            investimento nesses setores está gerando o retorno esperado.
          </p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.subContainer}>
          <div className={styles.title}>
            <img src={LampLight} alt="" />
            <h2>Inovação</h2>
          </div>
          <p>
            CAC by PlannerPlay é uma solução inovadora desenvolvida pelo
            PlannerPlay, projetada para entregar resultados de alto impacto e
            garantir a satisfação dos nossos clientes. Nossa ferramenta foi
            criada para simplificar a análise de dados, oferecendo insights
            valiosos para impulsionar a performance da sua empresa.
          </p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.subContainer}>
          <div className={styles.title}>
            <img src={Line} alt="" />
            <h2>Simplicidade</h2>
          </div>
          <p>
            Com gráficos intuitivos e resultados gerados de forma instantânea,
            você terá uma visão clara e detalhada dos seus indicadores. Além
            disso, o sistema permite o armazenamento seguro de informações em
            nosso banco de dados, possibilitando análises mais abrangentes ao
            longo dos anos e auxiliando no planejamento estratégico de longo
            prazo.
          </p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.subContainer}>
          <div className={styles.title}>
            <img src={HandShake} alt="" />
            <h2>Confiança</h2>
          </div>
          <p>
            Confie no CAC by PlannerPlay para transformar dados em decisões
            inteligentes e levar sua empresa a um novo patamar de eficiência.
          </p>
        </div>
      </div>
    </section>
  );
}

export default React.forwardRef(InfoPage);
