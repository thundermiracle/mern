// Response from nodejs server
interface ResponseJson {
  success: boolean;
  data: any;
  message?: string;
  stack?: string;
}

interface IFetchWrapper {
  get<T>(url: string, init?: RequestInit): Promise<T | undefined>;
  post<T>(url: string, init?: RequestInit): Promise<T | undefined>;
  post(url: string, init?: RequestInit): Promise<boolean>;
  put<T>(url: string, init?: RequestInit): Promise<T | undefined>;
}

class FetchWrapper implements IFetchWrapper {
  private DEFAULT_POST_INIT = {
    method: "POST",
  };

  private DEFAULT_PUT_INIT = {
    method: "PUT",
  };

  async get<T>(url: string, init?: RequestInit): Promise<T | undefined> {
    const res = await fetch(url, init);

    const { success, data, message, stack } = (await res.json()) as ResponseJson;
    if (!success) throw new Error(stack || message);

    return data;
  }

  async post<T>(url: string, init: RequestInit = {}): Promise<T | undefined> {
    const res = await fetch(url, { ...this.DEFAULT_POST_INIT, ...init });

    const { success, data, message, stack } = (await res.json()) as ResponseJson;
    if (!success) throw new Error(message || stack);

    return data;
  }

  async put<T>(url: string, init?: RequestInit): Promise<T | undefined> {
    const res = await fetch(url, { ...this.DEFAULT_PUT_INIT, ...init });

    const { success, data, message, stack } = (await res.json()) as ResponseJson;
    if (!success) throw new Error(message || stack);

    return data;
  }
}

const fetchWrapper = new FetchWrapper();

export default fetchWrapper;
