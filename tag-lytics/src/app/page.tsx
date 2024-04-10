"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Table from "../components/Table";
import InputBoxes from "../components/InputBoxes";
import ColumnSelector from "../components/ColumnSelector";
import PieCharts from "../components/PieCharts";
import styles from "./page.module.css";

export default function Home() {
  const searchParams = useSearchParams();
  const [selectedGateway, setSelectedGateway] = useState(
    "https://arweave-search.goldsky.com/graphql",
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
        <div className={styles.row}>
          <InputBoxes />
          <ColumnSelector />
        </div>
        <div className={styles.row}>
          <Table selectedGateway={selectedGateway} />
          <PieCharts />
        </div>
      </div>
      <Footer />
    </div>
  );
}
