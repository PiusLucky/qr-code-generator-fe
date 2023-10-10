import axios, { AxiosInstance } from "axios";

class ApiClient {
  private baseUrl: string;
  private axiosClient: AxiosInstance;

  constructor() {
    const baseUrl = process.env.NEXT_PUBLIC_API!;
    const axiosClient = axios.create({
      baseURL: baseUrl,
    });

    axiosClient.interceptors.request.use(
      function(req: any) {
        return req;
      },
      function(err) {
        return Promise.reject(err);
      }
    );

    this.axiosClient = axiosClient;
    this.baseUrl = baseUrl;
  }

  async get<T>(resource: string, endpoint: string): Promise<T | undefined> {
    try {
      const response = await this.axiosClient.get(
        `${this.baseUrl}${resource}${endpoint}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default ApiClient;
