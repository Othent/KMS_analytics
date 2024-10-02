import React from "react";
import { useTransactions } from "../../contexts/TransactionsContext";
import styles from "./column.module.css";

const columns = {
  txId: "TX ID",
  address: "Address",
  recipient: "Recipient",
  quantity: "Quantity",
  data: "Data",
  tags: "Tags",
  fee: "Fee",
  block: "Block",
};

const ColumnSelector: React.FC = () => {
  const { visibleColumns, setVisibleColumns } = useTransactions();

  const handleCheckboxChange = (column: string) => {
    setVisibleColumns({
      ...visibleColumns,
      [column]: !visibleColumns[column],
    });
  };

  return (
    <div className={styles.columnSelector}>
      {Object.entries(columns).map(([key, label]) => (
        <label key={key} className={styles.label}>
          <input
            type="checkbox"
            checked={visibleColumns[key]}
            onChange={() => handleCheckboxChange(key)}
            className={styles.checkbox}
            id={`checkbox-${key}`}
          />
          <span className={styles.slider}></span>
          {label}
        </label>
      ))}
    </div>
  );
};

export default ColumnSelector;
