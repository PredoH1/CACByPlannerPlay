import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Index";
import Footer from "../../components/Footer";
import styles from "../Dashboard/Dashboard.module.css";
import { Link } from "react-router-dom";
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
      <Link to="/">
        <button>Voltar</button>
      </Link>

      <div className={styles.container}>
        <h1>Dashboard</h1>

        <p>Total Investido no Período: R$ {totalInvestimento.toFixed(2)}</p>
        <p>Total Clientes Adquiridos no Período: {totalClientes}</p>

        {/* Evolução do CAC */}
        <ReactApexChart
          options={{
            chart: { id: "cac-evolucao" },
            xaxis: { categories: categoriasData },
            title: { text: "Evolução do CAC ao Longo do Tempo" },
          }}
          series={[{ name: "CAC", data: cacData }]}
          type="line"
          height={350}
        />

        {/* Donut de Marketing vs Vendas */}
        <ReactApexChart
          options={{
            labels: ["Total Marketing", "Total Vendas"],
            title: { text: "Investimentos Totais" },
          }}
          series={[totalMarketing, totalVendas]}
          type="donut"
          height={350}
        />

        {/* Gráfico de barras: Total Investido no Período */}
        <ReactApexChart
          options={{
            chart: { id: "total-investido" },
            xaxis: { categories: ["Marketing", "Vendas"] },
            title: { text: "Total Investido no Período (R$)" },
            dataLabels: { enabled: true },
          }}
          series={[
            { name: "Investimento", data: [totalMarketing, totalVendas] },
          ]}
          type="bar"
          height={300}
        />

        {/* Gráfico de barras: Total Clientes Adquiridos */}
        <ReactApexChart
          options={{
            chart: { id: "total-clientes" },
            xaxis: { categories: ["Clientes Adquiridos"] },
            title: { text: "Total Clientes Adquiridos no Período" },
            dataLabels: { enabled: true },
          }}
          series={[{ name: "Clientes", data: [totalClientes] }]}
          type="bar"
          height={250}
        />
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;
