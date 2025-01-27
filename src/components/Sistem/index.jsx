import styles from "../Sistem/Sistem.module.css";
import warningIcon from "../../assets/warning.svg";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

function Sistem() {
  const [marketingData, setMarketingData] = useState({});
  const [salesData, setSalesData] = useState({});
  const [clientsAcquired, setClientsAcquired] = useState(0);
  const [cacResult, setCacResult] = useState(null);
  const [showChart, setShowChart] = useState(false);

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
    const marketingTotal = calculateTotals(marketingData);
    const salesTotal = calculateTotals(salesData);
    const totalInvestment = marketingTotal + salesTotal;
    const cac = totalInvestment / (clientsAcquired || 1);

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

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>
        Descubra como é simples e prático otimizar sua gestão de custos!
      </h1>

      <h2 className={styles.subtitle}>
        Preencha as informações e veja como o CAC pode transformar suas
        estratégias.
      </h2>

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
          <button onClick={downloadChartAsImage}>
            Baixar Gráfico como Imagem
          </button>
        </div>
      )}
    </section>
  );
}

export default Sistem;
