// PieCharts.tsx
"use client";
import React, { useState } from "react";
import { useTransactions } from "../contexts/TransactionsContext";
import { PieChart } from "react-minimal-pie-chart";
import { getPieChartData } from "../utils/getPieChartData";
import styles from "./pieCharts.module.css";

interface ExtendedPieChartData {
  name: string;
  value: number;
  color: string;
}

const PieCharts: React.FC = () => {
  const { transactions } = useTransactions();
  const [activeIndex, setActiveIndex] = useState<{
    [key: string]: number | undefined;
  }>({});
  const pieChartData = getPieChartData(transactions);
  const COLORS = ["#2e2836", "#6c757d"];

  const assignColors = (data: ExtendedPieChartData[]) => {
    return data.map((entry, index) => ({
      ...entry,
      color: COLORS[index % COLORS.length],
    }));
  };

  const onMouseEnter = (index: number, title: string) => {
    setActiveIndex((prevState) => ({ ...prevState, [title]: index }));
  };

  const onMouseLeave = (title: string) => {
    setActiveIndex((prevState) => ({ ...prevState, [title]: undefined }));
  };

  return (
    <div className={styles.container}>
      {Object.entries(pieChartData).map(([title, data]) => (
        <div key={title} className={styles.chartContainer}>
          <PieChart
            data={assignColors(data)}
            radius={40}
            lineWidth={70}
            segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
            segmentsShift={(index) =>
              title in activeIndex && index === activeIndex[title] ? 6 : 1
            }
            animate
            labelStyle={{ fill: "#fff", opacity: 0.75, pointerEvents: "none" }}
            labelPosition={100}
            onMouseOver={(_, index) => onMouseEnter(index, title)}
            onMouseOut={() => onMouseLeave(title)}
          />
          <div className={styles.chartTitle}>
            {title === "feesByWallet"
              ? "Fees Per Wallet"
              : title === "quantityByWallet"
                ? "Quantity Per Wallet"
                : title === "tagCounts"
                  ? "Tag Count"
                  : title === "recipientCounts"
                    ? "Recipient Count"
                    : title === "dataSizes"
                      ? "Data Size Count"
                      : "Tx Per Wallet"}
          </div>
          {title in activeIndex && activeIndex[title] !== undefined && (
            <div className={styles.tooltip}>
              {data[activeIndex[title]!].name}:{" "}
              {data[activeIndex[title]!].value}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PieCharts;
