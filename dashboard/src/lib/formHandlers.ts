import axios, { AxiosResponse } from "axios";

// Function to validate subscriptions
export async function validateSubscription(userIds: number[], endpoint: string): Promise<any> {
    try {
        const response: AxiosResponse = await axios.post(endpoint, { userIds });
        return response.data;
    } catch (error) {
        console.error('Validation Error:', error);
        throw new Error(`Failed to validate subscription: ${error}`);
    }
}

// Generic handleChange function
export function handleChange(
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setState: React.Dispatch<React.SetStateAction<any>>
): void {
  const { id, value, type } = e.target;

  if (e.target instanceof HTMLInputElement && type === 'file') {
      const files = e.target.files;
      setState((prevData: any) => ({
          ...prevData,
          [id]: files ? files[0] : null,
      }));
  } else {
      setState((prevData: any) => ({
          ...prevData,
          [id]: value,
      }));
  }
}


// Handle form submission
export async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
    formData: Record<string, any>,
    onSubmit: (formData: FormData) => Promise<any>
): Promise<void> {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
    });

    try {
        await onSubmit(formDataToSend);
    } catch (error) {
        console.error('Form Submission Error:', error);
    }
}


