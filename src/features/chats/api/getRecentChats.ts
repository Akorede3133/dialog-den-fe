const API_URL = import.meta.env.VITE_BASE_URL;

const getRecentChats = async () => {
  try {
    const response = await fetch(`${API_URL}/recentChats`, {
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

export default getRecentChats