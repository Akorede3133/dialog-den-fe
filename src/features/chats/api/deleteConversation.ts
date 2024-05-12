import { API_URL } from "../../../utils/constants"

const deleteConversation = async (receiverId: number) => {
  try {
    const response = await fetch(`${API_URL}/deleteConversation/${receiverId}`, {
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

export default deleteConversation