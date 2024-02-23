const API_URL = import.meta.env.VITE_BASE_URL;

type DataProp = {
  content: string;
  type: string;
};


const sendMessage = async (data: DataProp, receiverId: string) => {
  try {
    const response = await fetch(`${API_URL}/send/${receiverId}`, {
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

export default sendMessage