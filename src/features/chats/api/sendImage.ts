import { API_URL } from "../../../utils/constants";

const sendImage = async (file: File, receiverId: number) => {
  try {
    const formData  = new FormData();
    formData.append('image', file);
    const response = await fetch(`${API_URL}/sendImage/${receiverId}`, {
      method: 'POST',
      body: formData,
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

export default sendImage