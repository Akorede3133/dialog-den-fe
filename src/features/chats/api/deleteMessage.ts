import { API_URL } from "../../../utils/constants"

const deleteMessage = async (messageId: number) => {
  try {
    const response = await fetch(`${API_URL}/delete/${messageId}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }    
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export default deleteMessage