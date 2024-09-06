import apiClient from "@/config";
import { AxiosResponse } from "axios";




export async function handleValidation(
  event: React.MouseEvent<HTMLDivElement>,
  user_ids: number[],
  endpoint: string
): Promise<void> {
  event.stopPropagation(); // Prevent the default form submission behavior

  try {
    // Make a POST request to the provided endpoint with the user IDs
    const response: AxiosResponse = await apiClient.post(endpoint, {
      user_ids, // Send the user IDs as part of the request body
    });
    
    window.location.reload()
    // Handle the response data (you can modify this part based on your needs)
    console.log('Validation successful:', response.data);
  } catch (error) {
    // Handle any errors that occur during the request
    console.error('Validation failed:', error);
    throw new Error(`Failed to validate users: ${error}`);
  }
}

export async function disableUser(
    event: React.MouseEvent<HTMLDivElement>,
    user_ids: number[],
    endpoint: string
  ): Promise<void> {
    event.stopPropagation(); // Prevent the default form submission behavior
  
    try {
      // Make a POST request to the provided endpoint with the user IDs
      const response: AxiosResponse = await apiClient.post(endpoint, {
        user_ids, // Send the user IDs as part of the request body
      });

      window.location.reload()
  
      // Handle the response data (you can modify this part based on your needs)
      console.log('Validation successful:', response.data);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Validation failed:', error);
      throw new Error(`Failed to validate users: ${error}`);
    }
  }

