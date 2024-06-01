import axios from "axios";
import { useSpents } from "../context/SpentContext";
import { useExpenses } from "../context/ExpensesContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SpentControl = () => {
  const BASE_URL = process.env.BASE_URL;
  const { monthSpents } = useSpents();
  const { addOnlyState } = useExpenses();

  const getUserSpent = async (id: string, token: string) => {
    const expenses = await AsyncStorage.getItem("expenses");
    if (expenses && expenses.length > 0) {
      if (
        !expenses.includes(
          JSON.stringify([
            { emoji: "🏠", name: "Aluguel" },
            { emoji: "💊", name: "Saúde" },
            { emoji: "🍕", name: "Comida" },
            { emoji: "👕", name: "Roupas" },
            { emoji: "🎁", name: "Presente" },
            { emoji: "📚", name: "Educação" },
            { emoji: "✈️", name: "Férias" },
          ])
        )
      ) {
        await AsyncStorage.setItem(
          "expenses",
          JSON.stringify([
            { emoji: "🏠", name: "Aluguel" },
            { emoji: "💊", name: "Saúde" },
            { emoji: "🍕", name: "Comida" },
            { emoji: "👕", name: "Roupas" },
            { emoji: "🎁", name: "Presente" },
            { emoji: "📚", name: "Educação" },
            { emoji: "✈️", name: "Férias" },
          ])
        );
      }
      const object = JSON.parse(expenses);
      object.map((expense: any) => addOnlyState(expense));
    }
    //GET MONTH SPENTS
    try {
      const response = await axios.get(`${BASE_URL}/monthspents?userId=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        response.data.forEach((item: any) => {
          monthSpents.push(item);
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addSpent = async (value: number, type: string, icon: string) => {
    const token = await AsyncStorage.getItem("token");
    const id = await AsyncStorage.getItem("userId");
    try {
      const response = await axios.post(
        `${BASE_URL}/spent?userId=${id}`,
        {
          value: value,
          type: type,
          icon: icon,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        monthSpents.push(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { getUserSpent, addSpent };
};

export default SpentControl;
