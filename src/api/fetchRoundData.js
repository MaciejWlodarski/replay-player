import { COLLECTOR_URL } from "../constants/urls";

export const fetchReplayData = async (matchData, roundId) => {
  if (!matchData) return;

  const fetchLocal = (roundId) => {
    const formattedRoundId = String(roundId).padStart(2, "0");
    return fetch(`http://localhost:8000/${formattedRoundId}.json`);
  };

  const fetchCollector = (matchData, roundId) => {
    return fetch(`${COLLECTOR_URL}/demos/${matchData.demo}/replay/${roundId}`);
  };

  try {
    // const response = await fetchLocal(roundId);
    const response = await fetchCollector(matchData, roundId);
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
