import React, { useEffect } from "react";
import styles from "./components.module.css";
import { useTransactions } from "@/contexts/TransactionsContext"; // Adjust the import path as necessary
import { getAllTransactions } from "@/utils/getTransactions"; // Ensure this path matches your project structure

// Utility function to shorten strings, as originally provided
const smallString = (str: string) => {
  if (str.length <= 7) {
    return str;
  }
  const firstThree = str.slice(0, 5);
  const lastThree = str.slice(-5);
  return `${firstThree}...${lastThree}`;
};

interface TableProps {
  selectedGateway: string;
}

const Table: React.FC<TableProps> = ({ selectedGateway }) => {
  const { transactions, setTransactions, tags, visibleColumns } =
    useTransactions();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedTags = tags.map((tag) => ({
          name: tag.name,
          values: tag.value,
        }));
        const fetchedTransactions = await getAllTransactions(
          formattedTags,
          selectedGateway,
        );
        setTransactions(fetchedTransactions);
      } catch (e) {
        console.error("Error fetching transactions:", e);
      }
    };

    if (tags.length > 0) {
      fetchData();
    }
  }, [selectedGateway, tags, setTransactions]);

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {visibleColumns.txId && <th>TX ID</th>}
              {visibleColumns.address && <th>Address</th>}
              {visibleColumns.recipient && <th>Recipient</th>}
              {visibleColumns.quantity && <th>Quantity</th>}
              {visibleColumns.data && <th>Data</th>}
              {visibleColumns.tags && <th>Tags</th>}
              {visibleColumns.fee && <th>Fee</th>}
              {visibleColumns.block && <th>Block</th>}
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                {visibleColumns.txId && (
                  <td>{smallString(transaction.node.id)}</td>
                )}
                {visibleColumns.address && (
                  <td>{smallString(transaction.node.owner.address)}</td>
                )}
                {visibleColumns.recipient && (
                  <td>{transaction.node.recipient || "-"}</td>
                )}
                {visibleColumns.quantity && (
                  <td>
                    {transaction.node.quantity.ar &&
                    parseFloat(transaction.node.quantity.ar) !== 0
                      ? parseFloat(transaction.node.quantity.ar).toFixed(12)
                      : "-"}
                  </td>
                )}
                {visibleColumns.data && (
                  <td>
                    <div>Size: {transaction.node.data.size}</div>
                    <div>Type: {transaction.node.data.type}</div>
                  </td>
                )}
                {visibleColumns.tags && (
                  <td>
                    <div className={styles.tagContainer}>
                      {transaction.node.tags.map((tag, tagIndex) => (
                        <div key={tagIndex} className={styles.tag}>
                          {tag.name}: {tag.value}
                        </div>
                      ))}
                    </div>
                  </td>
                )}
                {visibleColumns.fee && <td>{transaction.node.fee.ar}</td>}
                {visibleColumns.block && (
                  <td>
                    <div className={styles.blockData}>
                      <div>ID: {smallString(transaction.node.block.id)}</div>
                      <div>Timestamp: {transaction.node.block.timestamp}</div>
                      <div>Height: {transaction.node.block.height}</div>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
