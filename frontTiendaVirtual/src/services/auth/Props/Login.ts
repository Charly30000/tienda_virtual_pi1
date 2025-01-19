export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    isAdmin:     boolean;
    isUser:      boolean;
    isBussiness: boolean;
    token:       string;
    username:    string;
}
