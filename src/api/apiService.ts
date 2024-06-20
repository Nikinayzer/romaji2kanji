import { Word } from '../type_declarations/types';

class ApiService {
  // Define the base URL for your API
  private static readonly API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  private static readonly USERNAME = process.env.REACT_APP_USERNAME;
  private static readonly PASSWORD = process.env.REACT_APP_PASSWORD;

  /**
   * Fetch words from the server
   * @param wordsNumber - Number of words to fetch
   * @param includeHiragana - Boolean to include Hiragana words
   * @param includeKatakana - Boolean to include Katakana words
   * @returns A promise that resolves to an array of Word objects
   */
  public static async fetchWords(
    wordsNumber: number,
    includeHiragana: boolean,
    includeKatakana: boolean
  ): Promise<Word[]> {
    const queryParams = new URLSearchParams({
      n: wordsNumber.toString(),
      h: includeHiragana.toString(),
      k: includeKatakana.toString(),
    });

    const credentials = `${ApiService.USERNAME}:${ApiService.PASSWORD}`;
    const encodedCredentials = btoa(credentials);

    const response = await fetch(`${ApiService.API_BASE_URL}/words?${queryParams}`, {
      headers: {
        'Authorization': `Basic ${encodedCredentials}`
      }
    });

    if (!response.ok) {
      // Handle specific status codes
      switch (response.status) {
        case 403:
          console.error('Error 403: Forbidden');
          throw new Error('You do not have permission to access this resource.');
        case 404:
          console.error('Error 404: Not Found');
          throw new Error('The requested resource was not found.');
        case 500:
          console.error('Error 500: Internal Server Error');
          throw new Error('There was an internal server error.');
        default:
          console.error(`Error ${response.status}: ${response.statusText}`);
          throw new Error(`An error occurred: ${response.statusText}`);
      }
    }

    //console.log('Response:', response);
    try {
      const data: Word[] = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Failed to parse response as JSON:', error);
      throw new Error('Failed to parse response as JSON');
    }
  }
}

export default ApiService;
