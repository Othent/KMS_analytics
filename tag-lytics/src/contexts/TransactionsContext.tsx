"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Transaction } from "@/utils/getTransactions";

interface TransactionsContextType {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  tags: { name: string; value: string }[];
  setTags: (tags: { name: string; value: string }[]) => void;
  visibleColumns: { [key: string]: boolean };
  setVisibleColumns: (visibleColumns: { [key: string]: boolean }) => void;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(
  undefined,
);

export const TransactionsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [tags, setTags] = useState<{ name: string; value: string }[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<{
    [key: string]: boolean;
  }>({
    txId: true,
    address: true,
    recipient: true,
    quantity: true,
    data: true,
    tags: true,
    fee: true,
    block: true,
  });

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        setTransactions,
        tags,
        setTags,
        visibleColumns,
        setVisibleColumns,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (context === undefined) {
    throw new Error(
      "useTransactions must be used within a TransactionsProvider",
    );
  }
  return context;
};
