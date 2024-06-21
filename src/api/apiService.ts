import { Word, User } from "../type_declarations/types";

class ApiService {
  private static readonly API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  private static readonly USERNAME = process.env.REACT_APP_USERNAME;
  private static readonly PASSWORD = process.env.REACT_APP_PASSWORD;

  private static readonly HEADERS = {
    Authorization: `Basic ${btoa(`${ApiService.USERNAME}:${ApiService.PASSWORD}`)}`,
    "Content-Type": "application/json",
  };

  /**
   * Generic method to make API requests
   * @param endpoint - The endpoint to call
   * @param options - Fetch options
   * @param useSessionToken - Boolean flag to determine which token to use
   * @returns A promise that resolves to the response data
   */
  private static async apiRequest(
    endpoint: string,
    options: RequestInit,
    isCustomHeader?: boolean,
    header?: any
  ): Promise<any> {
    
    const headers = {
      ...ApiService.HEADERS,
      ...options.headers,
    };

    const response = await fetch(`${ApiService.API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
     // credentials: 'include'
    });

    if (!response.ok) {
      return ApiService.handleError(response);
    }

    try {
      return await response.json();
    } catch (error) {
      console.error("Failed to parse response as JSON:", error);
      throw new Error("Failed to parse response as JSON");
    }
  }

  /**
   * Handle errors from API responses
   * @param response - The fetch response object
   */
  private static async handleError(response: Response): Promise<void> {
    let errorMessage = "An error occurred";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      console.error("Failed to parse error response as JSON:", e);
    }
    switch (response.status) {
      case 403:
        console.error("Error 403: Forbidden", errorMessage);
        throw new Error("You do not have permission to access this resource.");
      case 404:
        console.error("Error 404: Not Found", errorMessage);
        throw new Error("The requested resource was not found.");
      case 500:
        console.error("Error 500: Internal Server Error", errorMessage);
        throw new Error("There was an internal server error.");
      default:
        console.error(
          `Error ${response.status}: ${response.statusText}`,
          errorMessage
        );
        throw new Error(`An error occurred: ${response.statusText}`);
    }
  }

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
    return ApiService.apiRequest(`/words?${queryParams}`, { method: "GET",  });
  }

  /**
   * Fetch a single word by ID
   * @param id - The ID of the word to fetch
   * @returns A promise that resolves to a Word object
   */
  public static async fetchWordById(id: string): Promise<Word> {
    return ApiService.apiRequest(`/words/${id}`, { method: "GET" });
  }

  /**
   * User login method
   * @param username - The username
   * @param password - The password
   * @returns A promise that resolves to a User object
   */
  public static async login(username: string, password: string): Promise<any> {
    const header = {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        "Content-Type": "application/json",
      };

    return ApiService.apiRequest(`/login`, { method: "GET", }, true, header);
  }

  /**
   * User logout method
   */
  public static logout(): void {
  }

  /**
   * Fetch user details
   * @param username - The username
   * @returns A promise that resolves to a User object
   */
  public static async fetchUser(username: string): Promise<User> {
    return ApiService.apiRequest(`/users/${username}`, { method: "GET" });
  }

  /**
   * Example POST request to create a word
   * @param data - The data to send in the body of the POST request
   * @returns A promise that resolves to the response data
   */
  public static async createWord(data: Partial<Word>): Promise<Word> {
    return ApiService.apiRequest(
      `/words`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  }

  // More methods for PUT, DELETE, etc. can be added similarly
}

export default ApiService;
