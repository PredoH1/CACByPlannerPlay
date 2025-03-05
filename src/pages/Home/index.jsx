import Header from "../../components/Header/Index";
import React, { useRef, useState } from "react";
import ReactApexChart from "react-apexcharts";
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

  const exampleData = {
    labels: ["Simplicidade", "Confiança", "Inovação"],
    series: [33, 33, 33],
  };

  const exampleDataBar = {
    labels: ["Marketing", "Vendas", "Progresso"],
    series: [
      {
        data: [40, 30, 30],
      },
    ],
  };

  const exampleDataLine = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
    series: [
      {
        data: [40, 30, 30, 50, 10, 43],
      },
    ],
  };

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
          <div className={styles.pieBarContainer}>
            {/* Gráfico de Pie */}
            <section>
              <ReactApexChart
                options={{
                  chart: {
                    width: 250, // Largura reduzida
                    type: "pie",
                  },
                  labels: exampleData.labels,
                  colors: ["#007bff", "#28a745", "#fd7e14"],
                  legend: {
                    show: false,
                  },
                  responsive: [
                    {
                      breakpoint: 480,
                      options: {
                        chart: {
                          width: 250, // Largura para telas menores
                        },
                      },
                    },
                  ],
                }}
                series={exampleData.series}
                type="pie"
                width={200}
              />
            </section>

            {/* Gráfico de Bar */}
            <section>
              <ReactApexChart
                options={{
                  chart: {
                    type: "bar",
                    toolbar: {
                      show: false,
                    },
                  },
                  plotOptions: {
                    bar: {
                      horizontal: true,
                      distributed: true,
                    },
                  },
                  xaxis: {
                    categories: exampleDataBar.labels,
                    labels: {
                      style: {
                        colors: "#fff",
                      },
                    },
                  },
                  yaxis: {
                    labels: {
                      style: {
                        colors: "#fff",
                      },
                    },
                  },
                  colors: ["#007bff", "#28a745", "#fd7e14"],
                  legend: {
                    show: false,
                    labels: {
                      colors: "#fff",
                    },
                  },
                  responsive: [
                    {
                      breakpoint: 480,
                      options: {
                        chart: {
                          width: 250, // Largura para telas menores
                        },
                      },
                    },
                  ],
                }}
                series={exampleDataBar.series}
                type="bar"
                width={255} // Largura reduzida
              />
            </section>
          </div>

          <section className={styles.lineContainer}>
            <ReactApexChart
              options={{
                chart: {
                  type: "line",
                  toolbar: {
                    show: false,
                  },
                },
                xaxis: {
                  categories: exampleDataLine.labels,
                  labels: {
                    style: {
                      colors: "#fff",
                    },
                  },
                },
                yaxis: {
                  labels: {
                    style: {
                      colors: "#fff",
                    },
                  },
                },
                colors: ["#007bff", "#28a745", "#fd7e14"],
                legend: {
                  show: false,
                  labels: {
                    colors: "#fff",
                  },
                },
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 250, // Largura para telas menores
                      },
                    },
                  },
                ],
              }}
              series={exampleDataLine.series}
              type="line"
              width={400}
            />
          </section>
        </section>
      </main>
      <InfoPage ref={seçãoRef} />
      <Sistem />
      <Link to="/sobre">Sobre</Link>
    </>
  );
}

export default Home;
