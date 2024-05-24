import axios from "axios";
import { useSpents } from "../context/SpentContext";

const SpentControl = () => {
  const BASE_URL = process.env.BASE_URL;
  const { spents } = useSpents();

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
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { getUserSpent };
};

export default SpentControl;
