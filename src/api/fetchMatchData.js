import { API_URL } from "../constants/urls";

export const fetchMatchData = async (matchId) => {
  try {
    const response = await fetch(`${API_URL}${matchId}/rounds`);
    // const response = await fetch(`http://localhost:8000/${matchId}.json`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
