"use client";

import TotalsChart from "@/components/Reports/TotalsChart";
import CategoryPieChart from "@/components/Reports/CategoryPieChart";
import TransactionList from "@/components/Reports/TransactionList";

export default function AnalysisPage() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TotalsChart />
        <CategoryPieChart />
      </div>

      <TransactionList />
    </div>
  );
}
