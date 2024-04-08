import React, { useState, useEffect } from "react";
import styles from "./components.module.css";
import { getAllTransactions } from "@/utils/getTransactions";

const Table: React.FC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const transactions = await getAllTransactions();
      console.log(transactions);
      // @ts-ignore
      setData(transactions);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.table}>
      <table>
        <thead>
          <tr>
            <th>TX ID</th>
            <th>Address</th>
            <th>Recipient</th>
            <th>Quantity</th>
            <th>View</th>
            <th>Tags</th>
            <th>Fee</th>
            <th>Block</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>{/* Render table cells */}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
