import { NEXT_PUBLIC_API_SECRET, HOST } from "@/utils/constants";

const API_BASE_URL = `${HOST}/api`;

export const shortenURL = async (original_link: string): Promise<string> => {
  const api_secret = NEXT_PUBLIC_API_SECRET;
    console.log(api_secret)
  try {
    const response = await fetch(`${API_BASE_URL}/short`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-secret': api_secret,
      },
      body: JSON.stringify({ original_link }),
    });

    console.log(response)
    if (!response.ok) {
      throw new Error(`Error shortening URL: ${response.statusText}`);
    }

    const data = await response.json();
    return data.rows[0].short_link;
  } catch (error:any) {
    console.error(error.message);
    throw new Error('Error shortening URL');
  }
};
