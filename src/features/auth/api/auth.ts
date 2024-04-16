import { API_URL } from "../../../utils/constants";
import { UserProp } from "../../contacts/components/ContactCard";


type RegisterProp = {
  username: string;
  email: string;
  password: string;
}
type LoginProp = {
  username: string;
  password: string;
}

export const register = async (data: RegisterProp) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
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

export const login = async (data: LoginProp) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
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

export const currentUser = async (): Promise<UserProp> => {
  try {
    const response = await fetch(`${API_URL}/currentUser`, {
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
    throw error;
  }
 
}