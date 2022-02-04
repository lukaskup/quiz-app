export interface User {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
}

export interface UserAuth {
    email: string;
    password: string;
}
