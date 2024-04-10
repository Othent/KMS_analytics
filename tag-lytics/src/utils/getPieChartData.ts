// getPieChartData.tsx
import { Transaction } from "./getTransactions";

interface ExtendedPieChartData {
  name: string;
  value: number;
  color: string;
}

export const getPieChartData = (transactions: Transaction[]) => {
  const dataMap: { [key: string]: { [name: string]: number } } = {
    feesByWallet: {},
    quantityByWallet: {},
    tagCounts: {},
    recipientCounts: {},
    dataSizes: {},
    transactionCountByWallet: {},
  };

  transactions.forEach((transaction) => {
    const { owner, fee, quantity, tags, recipient, data } = transaction.node;
    const { address } = owner;

    dataMap.feesByWallet[address] =
      (dataMap.feesByWallet[address] || 0) + parseFloat(fee.ar);
    dataMap.quantityByWallet[address] =
      (dataMap.quantityByWallet[address] || 0) + parseFloat(quantity.ar);

    tags.forEach((tag) => {
      dataMap.tagCounts[tag.name] = (dataMap.tagCounts[tag.name] || 0) + 1;
    });

    dataMap.recipientCounts[recipient] =
      (dataMap.recipientCounts[recipient] || 0) + 1;
    dataMap.dataSizes[data.size] = (dataMap.dataSizes[data.size] || 0) + 1;
    dataMap.transactionCountByWallet[address] =
      (dataMap.transactionCountByWallet[address] || 0) + 1;
  });

  const createPieChartData = (data: {
    [name: string]: number;
  }): ExtendedPieChartData[] => {
    return Object.entries(data).map(([name, value]) => ({
      name,
      value,
      color: "",
    }));
  };

  return {
    feesByWallet: createPieChartData(dataMap.feesByWallet),
    quantityByWallet: createPieChartData(dataMap.quantityByWallet),
    tagCounts: createPieChartData(dataMap.tagCounts),
    recipientCounts: createPieChartData(dataMap.recipientCounts),
    dataSizes: createPieChartData(dataMap.dataSizes),
    transactionCountByWallet: createPieChartData(
      dataMap.transactionCountByWallet,
    ),
  };
};
