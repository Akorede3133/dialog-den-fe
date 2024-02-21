const API_URL = import.meta.env.VITE_BASE_URL;

type RegisterProp = {
  username: string;
  email: string;
  password: string;
}

export const register = async (data: RegisterProp) => {
  try {
      console.log(data);
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
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