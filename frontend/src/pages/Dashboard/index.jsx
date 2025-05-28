import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Index";
import Footer from "../../components/Footer";
import styles from "../Dashboard/Dashboard.module.css";
import { Link } from "react-router-dom";
import backIcon from "../../assets/backIcon.svg";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

function Dashboard() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [backup, setBackup] = useState([]);

  const fetchBackup = async () => {
    try {
      const response = await axios.get(`${apiUrl}/backup`);
      setBackup(response.data);
    } catch (error) {
      console.error("Erro ao buscar backup:", error);
    }
  };

  useEffect(() => {
    fetchBackup();
  }, []);

  // Calcular totais
  const totalMarketing = backup.reduce(
    (sum, item) => sum + parseFloat(item.total_marketing),
    0
  );
  const totalVendas = backup.reduce(
    (sum, item) => sum + parseFloat(item.total_vendas),
    0
  );
  const totalInvestimento = totalMarketing + totalVendas;
  const totalClientes = backup.reduce(
    (sum, item) => sum + parseInt(item.n_clientes),
    0
  );

  const categoriasData = backup.map((item) =>
    new Date(item.data_registro).toLocaleDateString("pt-BR")
  );
  const cacData = backup.map((item) => parseFloat(item.resultado_cac));

  return (
    <>
      <Header />

      <div className={styles.container}>
        <section className={styles.infoText}>
          <Link to="/">
            <button>
              <img src={backIcon} alt="Voltar" />
            </button>
          </Link>
          <h1>Dashboard</h1>
          {/*      
           <div>
           
                  
            <p>Total Investido no Período: R$ {totalInvestimento.toFixed(2)}</p>
            <p>Total Clientes Adquiridos no Período: {totalClientes}</p>
          </div> */}
        </section>

        <div className={styles.infoTop}>
          {/* Evolução do CAC */}
          <ReactApexChart
            options={{
              chart: {
                id: "cac-evolucao",
                background: "#222",
                toolbar: { show: false },
                foreColor: "#fff",
              },
              xaxis: {
                categories: categoriasData,
                labels: { style: { colors: "#ddd", fontSize: "14px" } },
                axisBorder: { show: true, color: "#444" },
                axisTicks: { show: true, color: "#444" },
              },
              yaxis: {
                labels: { style: { colors: "#ddd", fontSize: "14px" } },
                axisBorder: { show: false },
                axisTicks: { show: false },
              },
              title: {
                text: "Evolução do CAC ao Longo do Tempo",
                style: {
                  color: "#00d8ff",
                  fontSize: "22px",
                  fontWeight: "bold",
                },
              },
              stroke: {
                curve: "smooth",
                width: 3,
              },
              markers: {
                size: 5,
                colors: ["#00d8ff"],
                strokeColors: "#fff",
                strokeWidth: 2,
              },
              grid: {
                borderColor: "#333",
              },
              tooltip: {
                theme: "dark",
              },
              dataLabels: {
                enabled: true,
                style: { colors: ["#00d8ff"], fontWeight: "bold" },
              },
            }}
            series={[{ name: "CAC", data: cacData }]}
            type="line"
            height={420}
            width={700}
          />

          {/* Donut de Marketing vs Vendas */}
          <ReactApexChart
            options={{
              chart: {
                background: "#222",
                foreColor: "#fff",
                toolbar: { show: false },
              },
              labels: ["Total Marketing", "Total Vendas"],
              title: {
                text: "Investimentos Totais",
                style: {
                  color: "#00d8ff",
                  fontSize: "22px",
                  fontWeight: "bold",
                },
              },
              legend: {
                labels: { colors: "#ddd", useSeriesColors: false },
                position: "bottom",
              },
              dataLabels: {
                style: { colors: ["#fff"] },
                dropShadow: { enabled: true },
              },
              plotOptions: {
                pie: {
                  donut: {
                    labels: {
                      show: true,
                      name: { color: "#00d8ff", fontSize: "18px" },
                      value: { color: "#fff", fontSize: "16px" },
                      total: {
                        show: true,
                        label: "Total",
                        color: "#00d8ff",
                        fontSize: "18px",
                        formatter: () =>
                          (totalMarketing + totalVendas).toFixed(2),
                      },
                    },
                  },
                },
              },
              colors: ["#00d8ff", "#ff6f61"],
              tooltip: { theme: "dark" },
            }}
            series={[totalMarketing, totalVendas]}
            type="donut"
            height={420}
            width={500}
          />
        </div>

        <div className={styles.infoButtom}>
          {/* Gráfico de barras: Total Investido no Período */}
          <ReactApexChart
            options={{
              chart: {
                id: "total-investido",
                background: "#222",
                foreColor: "#fff",
                toolbar: { show: false },
              },
              xaxis: {
                categories: ["Marketing", "Vendas"],
                labels: { style: { colors: "#ddd", fontSize: "14px" } },
                axisBorder: { color: "#444" },
                axisTicks: { color: "#444" },
              },
              yaxis: {
                labels: { style: { colors: "#ddd", fontSize: "14px" } },
              },
              title: {
                text: "Total Investido no Período (R$)",
                style: {
                  color: "#00d8ff",
                  fontSize: "22px",
                  fontWeight: "bold",
                },
              },
              dataLabels: {
                enabled: true,
                style: { colors: ["#00d8ff"], fontWeight: "bold" },
              },
              plotOptions: {
                bar: {
                  borderRadius: 6,
                  columnWidth: "50%",
                  colors: {
                    ranges: [
                      { from: 0, to: totalInvestimento, color: "#00d8ff" },
                    ],
                  },
                },
              },
              fill: {
                colors: ["#00d8ff"],
              },
              tooltip: { theme: "dark" },
            }}
            series={[
              { name: "Investimento", data: [totalMarketing, totalVendas] },
            ]}
            type="bar"
            height={380}
            width={500}
          />

          {/* Gráfico de barras: Total Clientes Adquiridos */}
          <ReactApexChart
            options={{
              chart: {
                id: "total-clientes",
                background: "#222",
                foreColor: "#fff",
                toolbar: { show: false },
              },
              xaxis: {
                categories: ["Clientes Adquiridos"],
                labels: { style: { colors: "#ddd", fontSize: "14px" } },
                axisBorder: { color: "#444" },
                axisTicks: { color: "#444" },
              },
              yaxis: {
                labels: { style: { colors: "#ddd", fontSize: "14px" } },
              },
              title: {
                text: "Total Clientes Adquiridos no Período",
                style: {
                  color: "#00d8ff",
                  fontSize: "22px",
                  fontWeight: "bold",
                },
              },
              dataLabels: {
                enabled: true,
                style: { colors: ["#00d8ff"], fontWeight: "bold" },
              },
              plotOptions: {
                bar: {
                  borderRadius: 6,
                  columnWidth: "40%",
                  colors: {
                    ranges: [{ from: 0, to: totalClientes, color: "#ff6f61" }],
                  },
                },
              },
              fill: {
                colors: ["#ff6f61"],
              },
              tooltip: { theme: "dark" },
            }}
            series={[{ name: "Clientes", data: [totalClientes] }]}
            type="bar"
            height={320}
            width={500}
          />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;
