import axios from "axios";
import { useSpents } from "../context/SpentContext";
import { useExpenses } from "../context/ExpensesContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SpentControl = () => {
  const BASE_URL = process.env.BASE_URL;
  const { spents } = useSpents();
  const { addOnlyState } = useExpenses();

  const getUserSpent = async (id: string, token: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/todayspents?userId=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        response.data.forEach((item: any) => {
          spents.push(item);
        });
        const expenses = await AsyncStorage.getItem("expenses");
        if (expenses && expenses.length > 0) {
          const object = JSON.parse(expenses);
          object.map((expense: any) => addOnlyState(expense));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { getUserSpent };
};

export default SpentControl;
