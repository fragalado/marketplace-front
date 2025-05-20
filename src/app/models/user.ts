export interface User {
    uuid: string;
    username: string;
    firstName: string;
    lastName: string;
    bio?: string;
    profilePicture?: string;
    email: string;
    role: string;
    created_at: string;
    updated_at: string;
}

export interface UserLiteDto {
    uuid: string;
    firstName: string;
    lastName: string;
}

export interface UserLoginDto {
    email: string;
    password: string;
}

export interface UserRegisterDto {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

export interface UserUpdateRequestDto {
    username: string;
    firstName: string;
    lastName: string;
    bio?: string;
    profilePicture?: string;
    password?: string;
}