export interface AuthState {
  isAdmin: boolean;
  isBussiness: boolean;
  isUser: boolean;
  token: string;
  username: string;
}

export class AuthUtils {
  static getAuthDetails(): AuthState {
    const STORAGE_ITEM = "userdetails";
    const data = JSON.parse(
      sessionStorage.getItem(STORAGE_ITEM) ??
        JSON.stringify({
          isAdmin: false,
          isBussiness: false,
          isUser: false,
          token: "",
          username: "",
        })
    );
    return data;
  }
}
