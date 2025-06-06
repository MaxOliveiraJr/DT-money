import { useEffect, useState, useCallback } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

interface Transaction {
    id: number;
    description: string;
    type: "income" | "outcome";
    price: number;
    category: string;
    createdAt: string;
}

interface TransactionsContextType {
    transactions: Transaction[];
    fetchTransactions: (query?: string) => Promise<void>;
    createTransaction: (data: NewTransactionModalInputs) => Promise<void>;
}


interface TransactionsProviderProps {
    children: React.ReactNode;
}

interface NewTransactionModalInputs {
    description: string;
    price: number;
    category: string;
    type: "income" | "outcome";
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {

    const [transactions, setTransactions] = useState<Transaction[]>([])


    const fetchTransactions = useCallback(async (query?: string) => {

        const response = await api.get("/transactions", {
            params: {
                _sort: "createdAt",
                _order: "desc",
                q: query,
            }
        });
        setTransactions(response.data);
    }, [])


    const createTransaction = useCallback(async (data: NewTransactionModalInputs) => {

        const { description, price, category, type } = data;
        const response = await api.post("/transactions", {
            description,
            price,
            category,
            type,
            createdAt: new Date(),
        });

        setTransactions((state) => [response.data, ...state]);
    }, [])

    useEffect(() => {
        fetchTransactions();
    }, [])
    return (
        <TransactionsContext.Provider value={{
            transactions,
            fetchTransactions,
            createTransaction
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}