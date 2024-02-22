const API_URL = import.meta.env.VITE_BASE_URL;

export const getUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/getUsers`, {
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