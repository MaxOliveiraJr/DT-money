import { useContext } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";

export function useSummary() {
  const { transactions } = useContext(TransactionsContext);

  const summary = transactions.reduce(
    (acc, transtion) => {
      if (transtion.type === "income") {
        acc.income += transtion.price;
        acc.total += transtion.price;
      } else {
        acc.outcome += transtion.price;
        acc.total -= transtion.price;
      }

      return acc;
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    }
  );

  return summary;
}
