import fetchWrapper from "../lib/fetchWrapper";
import { UserData } from "../types";
interface IUserService {
  login(email: string, password: string): Promise<UserData | undefined>;
}

class UserService implements IUserService {
  async login(email: string, password: string): Promise<UserData | undefined> {
    const data = await fetchWrapper.post<UserData>(`/api/users/login`, {
      body: JSON.stringify({ email, password }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return data;
  }
}

const userService = new UserService();

export default userService;
