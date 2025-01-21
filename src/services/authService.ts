const apiUrl = import.meta.env.VITE_API_URL;

interface UserData {
  username: string;
  password: string;
  email: string;
}

export async function registerUser(userData: UserData) {
  const response = await fetch(`${apiUrl}/User/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error(`Failed to register: ${response.statusText}`);
  }

  return response.json();
}
