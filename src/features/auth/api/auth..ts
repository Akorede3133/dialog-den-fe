const API_URL = import.meta.env.BASE_URL;

type RegisterProp = {
  username: string;
  email: string;
  password: string;
}

export const register = async (data: RegisterProp) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const result = await response.json();
  
    if(!response.ok) {
      throw new Error(result.message);
    }
  } catch (error) {
    throw new Error(error.message)
  }
 
}