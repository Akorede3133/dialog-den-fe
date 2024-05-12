import { API_URL } from "../../../utils/constants";

const sendVoice = async (file: File, receiverId: number) => {
  try {
    const formData  = new FormData();
    formData.append('voice', file);
    const response = await fetch(`${API_URL}/sendVoice/${receiverId}`, {
      method: 'POST',
      body: formData,
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

export default sendVoice