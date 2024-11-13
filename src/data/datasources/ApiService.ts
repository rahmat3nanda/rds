import axios, {AxiosInstance, AxiosResponse} from 'axios';

class ApiService {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    // Create an Axios instance with the base URL and optional auth token
    this.client = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyMTQwZTJiYy05MzBmLTRiY2EtOGMzNC1hYTA4ZTA3NjUxMzUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJzdWIiOiIxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImFkbWluIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbInNlYy5leHQuYyIsInNlYy5leHQuZCIsInNlYy5leHQudSIsInNlYy5leHQudiIsInNlYy5tb2QuYyIsInNlYy5tb2QuZCIsInNlYy5tb2QudSIsInNlYy5tb2QudiIsInNlYy5wZXIuYyIsInNlYy5wZXIuZCIsInNlYy5wZXIudSIsInNlYy5wZXIudiIsInNlYy5yb2wuYyIsInNlYy5yb2wuZCIsInNlYy5yb2wudSIsInNlYy5yb2wudiIsInNlYy51c2UuYyIsInNlYy51c2UuZCIsInNlYy51c2UudSIsInNlYy51c2UudiJdLCJwZXJtaXNzaW9uIjpbInNlYy5leHQuYyIsInNlYy5leHQuZCIsInNlYy5leHQudSIsInNlYy5leHQudiIsInNlYy5tb2QuYyIsInNlYy5tb2QuZCIsInNlYy5tb2QudSIsInNlYy5tb2QudiIsInNlYy5wZXIuYyIsInNlYy5wZXIuZCIsInNlYy5wZXIudSIsInNlYy5wZXIudiIsInNlYy5yb2wuYyIsInNlYy5yb2wuZCIsInNlYy5yb2wudSIsInNlYy5yb2wudiIsInNlYy51c2UuYyIsInNlYy51c2UuZCIsInNlYy51c2UudSIsInNlYy51c2UudiJdLCJyb2xlIjpbIi0iLCJTdXBlciBBZG1pbiJdLCJleHAiOjE3MzE0ODkyMTIsImlzcyI6Imh0dHBzOi8vbW9iaWxlLmRldi5xdWFkcmFudC1zaS5pZC9hZ2VudGRldi8iLCJhdWQiOiJRTUFHRU5UIn0.deVCE7eh6gMgub_Ne5NHcXfWA-OhjIQLtbcb8KGGyyk',
      },
    });

    // Optionally, set up interceptors for requests and responses
    this.client.interceptors.request.use(
      config => {
        // Modify request config here (e.g., add headers, logging)
        return config;
      },
      error => {
        // Handle request error
        return Promise.reject(error);
      },
    );

    this.client.interceptors.response.use(
      response => {
        // Handle response data here (e.g., logging, transformation)
        return response;
      },
      error => {
        // Handle response error (e.g., token expiration, network issues)
        return Promise.reject(error);
      },
    );
  }

  // GET request
  public async get<T>(
    url: string,
    params: object = {},
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.client.get(url, {params});
    } catch (error) {
      throw error;
    }
  }

  // POST request
  public async post<T>(
    url: string,
    body: object,
    params: object = {},
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.client.post(url, body, {params});
    } catch (error) {
      throw error;
    }
  }

  // PUT request
  public async put<T>(
    url: string,
    body: object,
    params: object = {},
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.client.put(url, body, {params});
    } catch (error) {
      throw error;
    }
  }

  // DELETE request
  public async delete<T>(
    url: string,
    params: object = {},
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.client.delete(url, {params});
    } catch (error) {
      throw error;
    }
  }
}

export default ApiService;
