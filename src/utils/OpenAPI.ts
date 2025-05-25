import Constants from 'expo-constants';



export const checkForHateSpeech = async (text: string): Promise<boolean> => {
  const openAIKey = Constants.expoConfig?.extra?.openaiApiKey

    try {
    const response = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: text }),
    });
    console.log(response)
    const data = await response.json();
    
    //const flagged = data.results[0]
    console.log(data)
    //console.log(flagged)
    return true
    // return flagged; // true = hate/unsafe content
  } catch (err) {
    console.error('Moderation error:', err);
    return false; // fallback to allow if moderation fails
  }
};
