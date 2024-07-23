import axios from "axios";

export async function fetchFragrances() {
  try {
    const response = await axios.get("https://api.example.com/fragrances");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching fragrances:", error);
    throw error;
  }
}
