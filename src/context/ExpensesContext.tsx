import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface ExpensesContextType {
  expenses: ExpenseType[];
  addExpense: Function;
  addOnlyState: Function;
}

interface ExpenseType {
  emoji: string;
  name: string;
}

const ExpensesContext = createContext<ExpensesContextType | undefined>(
  undefined
);

export const ExpensesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [expenses, setExpenses] = useState<ExpenseType[]>([
    { emoji: "🏠", name: "Aluguel" },
    { emoji: "💊", name: "Saúde" },
    { emoji: "🍕", name: "Comida" },
    { emoji: "👕", name: "Roupas" },
    { emoji: "🎁", name: "Presente" },
    { emoji: "📚", name: "Educação" },
    { emoji: "✈️", name: "Férias" },
  ]);

  const addExpense = async ({ emoji, name }: ExpenseType) => {
    const newExpense = { emoji, name };
    setExpenses((prevExpenses) => {
      const updatedExpenses = [...prevExpenses, newExpense];
      saveExpensesToStorage(updatedExpenses);
      return updatedExpenses;
    });
  };

  const addOnlyState = async ({ emoji, name }: ExpenseType) => {
    const newExpense = { emoji, name };
    setExpenses((prevExpenses) => {
      const updatedExpenses = [...prevExpenses, newExpense];
      return updatedExpenses;
    });
  };

  const saveExpensesToStorage = async (expenses: ExpenseType[]) => {
    try {
      await AsyncStorage.setItem("expenses", JSON.stringify(expenses));
      console.log("Expenses saved to storage", expenses);
    } catch (error) {
      console.error("Error saving expenses to AsyncStorage", error);
    }
  };

  return (
    <ExpensesContext.Provider value={{ expenses, addExpense, addOnlyState }}>
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error("useExpenses deve ser usado dentro de um ExpensesProvider");
  }
  return context;
};
