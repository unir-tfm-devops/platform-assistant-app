export const callChatAPI = async (userMessage: string, conversationId: string): Promise<string> => {
  try {
    const response = await fetch('http://localhost:8080/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        conversationId: conversationId
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return data.message || 'Sorry, I couldn\'t process your request.';
  } catch (error) {
    console.error('Error calling chat API:', error);
    return 'Sorry, I\'m having trouble connecting to the server. Please check your API configuration.';
  }
}; 