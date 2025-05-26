import styles from "../Sistem/Sistem.module.css";
import warningIcon from "../../assets/warning.svg";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";

function Sistem() {
  //AREA DO CALCULO
  const [marketingData, setMarketingData] = useState({});
  const [salesData, setSalesData] = useState({});
  const [clientsAcquired, setClientsAcquired] = useState(0);
  const [cacResult, setCacResult] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const [dataRegistro, setDataRegistro] = useState("");
  const [backup, setBackup] = useState([]);

  function handleInputChange(event, type, key) {
    const value = parseFloat(event.target.value) || 0;
    if (type === "marketing") {
      setMarketingData((prev) => ({ ...prev, [key]: value }));
    } else if (type === "sales") {
      setSalesData((prev) => ({ ...prev, [key]: value }));
    }
  }

  function calculateTotals(data) {
    return Object.values(data).reduce((sum, value) => sum + value, 0);
  }

  function calculateCAC() {
    if (clientsAcquired <= 0) {
      alert("Por favor, insira um número de clientes adquiridos maior que 0.");
      return;
    }

    const marketingTotal = calculateTotals(marketingData);
    const salesTotal = calculateTotals(salesData);
    const totalInvestment = marketingTotal + salesTotal;
    const cac = totalInvestment / clientsAcquired;

    setCacResult(cac);
  }

  function generateChartData() {
    const marketingEntries = Object.entries(marketingData).filter(
      ([_, value]) => value > 0
    );
    const salesEntries = Object.entries(salesData).filter(
      ([_, value]) => value > 0
    );

    const labels = [
      ...marketingEntries.map(([key]) => key),
      ...salesEntries.map(([key]) => key),
    ];
    const series = [
      ...marketingEntries.map(([_, value]) => value),
      ...salesEntries.map(([_, value]) => value),
    ];

    return { labels, series };
  }

  const chartData = generateChartData();

  const marketingOptions = [
    "Campanhas Publicitárias",
    "Anúncios Online",
    "Materiais Promocionais",
    "Produção de Conteúdo",
    "Ferramentas de Marketing",
    "Outros",
  ];

  const salesOptions = [
    "Salários dos Vendedores",
    "Comissões",
    "Treinamentos",
    "Outros",
  ];

  // AREA DE DOWNLOAD - DESATIVADA

  function downloadChartAsImage() {
    const chartElement = document.querySelector("#chart");
    if (chartElement) {
      const svg = chartElement.querySelector("svg");
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");

        const downloadLink = document.createElement("a");
        downloadLink.href = pngFile;
        downloadLink.download = "chart.png";
        downloadLink.click();
      };

      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    }
  }

  // AREA DO BANCO DE DADOS

  async function salvarDados() {
    if (cacResult === null) {
      alert("Calcule o CAC antes de salvar.");
      return;
    }

    const dados = {
      data_registro: dataRegistro,
      total_marketing: calculateTotals(marketingData).toFixed(2),
      total_vendas: calculateTotals(salesData).toFixed(2),
      n_clientes: clientsAcquired,
      resultado_cac: cacResult.toFixed(2),
    };

    try {
      await axios.post("http://localhost:8800", dados);
      alert("Dados salvos com sucesso!");
      fetchBackup(); // <- ATUALIZA A LISTA APÓS SALVAR
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      alert("Erro ao salvar os dados.");
    }
  }

  async function fetchBackup() {
    try {
      const response = await axios.get("http://localhost:8800");
      setBackup(response.data);
    } catch (error) {
      console.error("Erro ao buscar backup:", error);
    }
  }

  useEffect(() => {
    fetchBackup();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/${id}`);
      fetchBackup(); // Atualiza lista após deletar
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.boxTitleSistem}>
        <h1 className={styles.title}>
          Descubra como é simples e prático otimizar sua gestão de custos!
        </h1>

        <h2 className={styles.subtitle}>
          Preencha as informações e veja como o CAC pode transformar suas
          estratégias.
        </h2>
      </div>

      <section className={styles.sistem}>
        <div className={styles.card}>
          <div className={styles.card2}>
            <h2>Investimentos em Marketing</h2>
            {marketingOptions.map((option) => (
              <div className={styles.calcule} key={option}>
                <label>
                  {option}:
                  <input
                    type="number"
                    onChange={(e) => handleInputChange(e, "marketing", option)}
                  />
                </label>
              </div>
            ))}
            <p>
              Total Investido em Marketing: R${" "}
              {calculateTotals(marketingData).toFixed(2)}
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.card2}>
            <h2>Investimentos em Vendas</h2>
            {salesOptions.map((option) => (
              <div className={styles.calcule} key={option}>
                <label>
                  {option}:
                  <input
                    type="number"
                    onChange={(e) => handleInputChange(e, "sales", option)}
                  />
                </label>
              </div>
            ))}
            <p>
              Total Investido em Vendas: R${" "}
              {calculateTotals(salesData).toFixed(2)}
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.card2}>
            <h2>Cálculo Final do CAC</h2>
            <p>
              Total Investido em Marketing: R${" "}
              {calculateTotals(marketingData).toFixed(2)}
            </p>
            <p>
              Total Investido em Vendas: R${" "}
              {calculateTotals(salesData).toFixed(2)}
            </p>

            <label>
              Data do Registro:
              <input
                type="date"
                value={dataRegistro}
                onChange={(e) => setDataRegistro(e.target.value)}
              />
            </label>

            <label>
              Total de Clientes Adquiridos:
              <input
                type="number"
                value={clientsAcquired}
                onChange={(e) =>
                  setClientsAcquired(parseInt(e.target.value) || 0)
                }
              />
            </label>

            <button onClick={calculateCAC}>Calcular CAC</button>
          </div>
        </div>
      </section>

      {cacResult !== null && (
        <div className={styles.results}>
          <p>
            Resultado do CAC: R$ {cacResult.toFixed(2)} (
            {cacResult < 100 ? "BAIXO" : "ALTO"})
          </p>
          <div className={styles.obsResults}>
            <span>
              <img src={warningIcon} alt="" />
              <p>OBSERVAÇÃO:</p>
            </span>
            <p>
              Um CAC baixo significa que você está adquirindo clientes de forma
              eficiente, com custos reduzidos.
            </p>
            <p>
              Já um CAC alto pode indicar que é necessário otimizar seus
              investimentos em marketing e vendas para melhorar a relação
              custo-benefício.
            </p>
          </div>
          <button onClick={() => setShowChart(true)}>Gerar Gráfico</button>

          <div className={styles.boxSave}>
            <label>
              Total Investido em Marketing:
              <input
                type="text"
                value={`R$ ${calculateTotals(marketingData).toFixed(2)}`}
                readOnly
              />
            </label>

            <label>
              Total Investido em Vendas:
              <input
                type="text"
                value={`R$ ${calculateTotals(salesData).toFixed(2)}`}
                readOnly
              />
            </label>

            <label>
              Data do Registro:
              <input
                type="date"
                value={dataRegistro}
                onChange={(e) => setDataRegistro(e.target.value)}
              />
            </label>

            <label>
              Total de Clientes Adquiridos:
              <input type="number" value={clientsAcquired} readOnly />
            </label>

            <label>
              Resultado do CAC:
              <input
                type="text"
                value={`R$ ${cacResult.toFixed(2)}`}
                readOnly
              />
            </label>

            <button type="submit" onClick={salvarDados}>
              Salvar
            </button>
          </div>
        </div>
      )}

      {showChart && (
        <div>
          <div className={styles.chartDiv} id="chart">
            <ReactApexChart
              options={{
                chart: {
                  width: 300,
                  type: "pie",
                },
                labels: chartData.labels,
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 300,
                      },
                      legend: {
                        position: "bottom",
                      },
                    },
                  },
                ],
              }}
              series={chartData.series}
              type="pie"
              width={600}
            />
          </div>
        </div>
      )}

      <section className={styles.dataHistory}>
        <h1 className={styles.title}>Seu historico</h1>
        <table className={styles.tableBackup}>
          <thead>
            <tr>
              <th className={styles.trBackup}>Data do Registro</th>
              <th className={styles.trBackup}>Total Marketing</th>
              <th className={styles.trBackup}>Total Vendas</th>
              <th className={styles.trBackup}>N° Clientes</th>
              <th className={styles.trBackup}>Resultado CAC</th>
            </tr>
          </thead>
          <tbody>
            {backup.map((item, i) => (
              <tr key={i}>
                <td style={{ textAlign: "center" }}>
                  {new Date(item.data_registro).toLocaleDateString("pt-BR")}
                </td>
                <td style={{ textAlign: "center" }}>
                  R$ {parseFloat(item.total_marketing).toFixed(2)}
                </td>
                <td style={{ textAlign: "center" }}>
                  R$ {parseFloat(item.total_vendas).toFixed(2)}
                </td>
                <td style={{ textAlign: "center" }}>{item.n_clientes}</td>
                <td style={{ textAlign: "center" }}>
                  R$ {parseFloat(item.resultado_cac).toFixed(2)}
                </td>
                <td style={{ textAlign: "center" }}>
                  <FaTrash onClick={() => handleDelete(item.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
}

export default Sistem;
