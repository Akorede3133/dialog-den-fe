import { API_URL } from "../../../utils/constants";

export const getUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      credentials: 'include'
    });
    const result = await response.json();
    
    if(!response.ok) {
      throw new Error(result.message);
    }
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
 
}