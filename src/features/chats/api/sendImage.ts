const API_URL = import.meta.env.VITE_BASE_URL;


const sendImage = async (file, receiverId) => {
  try {
    const formData  = new FormData();
    formData.append('image', file);
    const response = await fetch(`${API_URL}/sendImage/${receiverId}`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });
    const result = await response.json();
    console.log(result);

    if(!response.ok) {
      throw new Error(result.message);
    }
    
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }

}

export default sendImage