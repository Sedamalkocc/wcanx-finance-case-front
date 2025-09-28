"use client";
import { useEffect, useState } from "react";
import TransactionForm from "@/components/Transactions/TransactionForm";
import TransactionList from "@/components/Transactions/TransactionList";
import TransactionTotals from "@/components/Transactions/TransactionTotals";
import TransactionFilter from "@/components/Transactions/TransactionFilter";
import { Transaction, getTransactions, deleteTransaction } from "@/lib/transaction";
import TransactionSummary from "@/components/Transactions/TransactionSummary";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);

  useEffect(() => {
    getTransactions().then(setTransactions).catch(console.error);
  }, []);

  const handleAdd = (tx: Transaction) => setTransactions((prev) => [...prev, tx]);
  const handleDelete = async (id: string) => {
    await deleteTransaction(id);
    setTransactions(prev => prev.filter(t => t._id !== id));
  };
  const handleUpdate = (updated: Transaction) => {
    setTransactions(prev => prev.map(t => t._id === updated._id ? updated : t));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold mb-6 text-center">💵 Transactions</h1>

        <TransactionForm onAdd={handleAdd} editingTx={editingTx || undefined} onUpdate={handleUpdate} onCancelEdit={() => setEditingTx(null)} />
        
        <TransactionFilter
          onFilter={(filteredTransactions) => setTransactions(filteredTransactions)}
        />
        
        <TransactionList transactions={transactions} onDelete={handleDelete} onEdit={setEditingTx} />
        <TransactionTotals transactions={transactions} />
      </div>
    </div>
  );
}
