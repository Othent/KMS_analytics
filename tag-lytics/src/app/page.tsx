"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Table from "../components/Table/Table";
import InputBoxes from "../components/InputBoxes/InputBoxes";
import ColumnSelector from "../components/Column/ColumnSelector";
import PieCharts from "../components/PieChart/PieCharts";
import styles from "./page.module.css";

export default function Home() {
  const searchParams = useSearchParams();
  const [selectedGateway, setSelectedGateway] = useState(
    "https://arweave.net/graphql",
  );

  const handleGatewayChange = (gateway: string) => {
    setSelectedGateway(gateway);
  };

  return (
    <div className={styles.container}>
      <Header
        searchParams={searchParams}
        onGatewayChange={handleGatewayChange}
      />
      <div className={styles.mainContent}>
        <div className={styles.row1}>
          <InputBoxes />
          <ColumnSelector />
        </div>
        <div className={styles.row2}>
          <Table selectedGateway={selectedGateway} />
          <PieCharts />
        </div>
      </div>
      <Footer />
    </div>
  );
}
