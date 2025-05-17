import Header from "../../components/Header/Index";
import styles from "../Sobre/Sobre.module.css";
import { Link } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { register } from "swiper/element/bundle";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import img1 from "../../assets/apexChartsIcon.png";
import img3 from "../../assets/gsapIcon.png";
import img4 from "../../assets/javascriptIcon.svg";
import img5 from "../../assets/mongodbIcon.svg";
import img6 from "../../assets/prismaIcon.svg";
import img7 from "../../assets/reactIcon.svg";
import Footer from "../../components/Footer";

register();

function Sobre() {
  const data = [
    { id: "1", Image: img1 },
    { id: "3", Image: img3 },
    { id: "4", Image: img4 },
    { id: "5", Image: img5 },
    { id: "6", Image: img6 },
    { id: "7", Image: img7 },
  ];

  return (
    <>
      <Header />
      <section className={styles.mainSobre}>
        <div className={styles.titleAndBack}>
          <Link to="/">
            <button>Voltar</button>
          </Link>

          <h1>Documentação</h1>
        </div>

        <div>
          <h1>Nosso Proposito</h1>
          <p>
            O CACByPlannerPlay foi desenvolvido com o objetivo de oferecer
            praticidade e interatividade na área de gestão e tecnologia,
            especialmente para usuários que não possuem familiaridade com as
            ferramentas digitais modernas. Com uma interface simples e
            intuitiva, o sistema realiza análises de desempenho e avalia os
            custos relacionados a marketing e vendas, proporcionando uma visão
            mais clara e estratégica do seu negócio. Sua navegação é facilitada
            por botões visuais e funcionalidades acessíveis, tornando o uso
            rápido e eficiente para qualquer perfil de usuário.
          </p>
        </div>

        <div>
          <h1>Historia PlannerPlay</h1>

          <p>
            O nome PlannerPlay surgiu no início da trajetória acadêmica de Pedro
            Henrique Cândido, a partir de um projeto voltado à leitura de
            planilhas e automação de processos. Com o tempo, a iniciativa
            evoluiu para um conjunto de ferramentas de gestão, com o objetivo
            principal de tornar a tecnologia mais acessível a pessoas com pouca
            familiaridade digital, permitindo que utilizem soluções modernas de
            forma simples e intuitiva.
          </p>
        </div>

        <div>
          <h1>Tecnologias Utilizadas</h1>
          <div className={styles.carrosselTech}>
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className={styles.swiper}
            >
              {data.map((item) => (
                <SwiperSlide key={item.id} className={styles.swiperSlide}>
                  <img
                    src={item.Image}
                    alt="slider"
                    className={styles.slideItem}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Sobre;
