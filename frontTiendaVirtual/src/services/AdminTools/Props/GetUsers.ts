export interface GetUsers {
    pages: Pages;
    users: User[];
}

export interface Pages {
    actualPage: number;
    totalPages: number;
}

export interface User {
    username:    string;
    isBussiness: boolean;
    isAdmin:     boolean;
    isBlocked:   boolean;
}
