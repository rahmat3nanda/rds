import axios, {AxiosInstance, AxiosResponse, AxiosError} from 'axios';

class ApiService {
  private client: AxiosInstance;
  private token: string | null;

  constructor(baseURL: string) {
    this.token = null;
    this.client = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
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

    // Response interceptor (async)
    this.client.interceptors.response.use(
      response => {
        // Handle response data here (e.g., logging, transformation)
        return response;
      },
      async (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
          // Token expired or unauthorized request, try refreshing the token
          try {
            // Get a new token
            this.token = await this.loginAndGetToken('admin', 'admin');
            if (this.token) {
              // Retry the original request with the new token
              error.config.headers.Authorization = `Bearer ${this.token}`;
              return this.client(error.config); // Retry original request
            }
          } catch (authError) {
            // Handle failed authentication (e.g., redirect to login page)
            return Promise.reject(authError);
          }
        }
        // Handle other response errors
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

  // Private method to handle login and get token
  private async loginAndGetToken(
    username: string,
    password: string,
  ): Promise<string | null> {
    try {
      const response = await this.post<{token: string}>('/login', {
        username,
        password,
      });
      if (response.data.token) {
        this.token = response.data.token;
        return this.token;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Login failed', error);
      return null;
    }
  }
}

export default ApiService;
