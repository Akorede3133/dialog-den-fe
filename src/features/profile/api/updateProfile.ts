import { API_URL } from "../../../utils/constants"

export const updateProfile = async (userId: number, data: { username: string, photo: File, password: string, passwordConfirmation: string }) => {
  try {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('photo', data.photo);
    formData.append('password', data.password);
    formData.append('passwordConfirmation', data.passwordConfirmation);
    const response = await fetch(`${API_URL}/updateUser/${userId}`, {
      method: 'PUT',
      credentials: 'include',
      body: formData
    });
    
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}