// Response from nodejs server
interface ResponseJson {
  success: boolean;
  data: any;
  message?: string;
  stack?: string;
}

interface IFetchWrapper {
  get<T>(url: string): Promise<T | undefined>;
}

class FetchWrapper implements IFetchWrapper {
  async get<T>(url: string, init?: RequestInit): Promise<T | undefined> {
    const res = await fetch(url, init);

    const { success, data, message, stack } = (await res.json()) as ResponseJson;
    if (!success) throw new Error(stack || message);

    return data;
  }
}

const fetchWrapper = new FetchWrapper();

export default fetchWrapper;
