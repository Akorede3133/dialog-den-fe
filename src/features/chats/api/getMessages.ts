const API_URL = import.meta.env.VITE_BASE_URL;

const getMessages = async (receiverId: number) => {
  try {
    const response = await fetch(`${API_URL}/messages/${receiverId}`, {
      credentials: 'include'
    });
    const result = await response.json();

    if(!response.ok) {
      throw new Error(result.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }

}

export default getMessages;